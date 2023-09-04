<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\File;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use stdClass;
use Illuminate\Support\Arr;
use Auth0\Laravel\Facade\Auth0;
use Illuminate\Support\Facades\Validator;
use App\Models\AssemblyVideo;


class AssemblyController extends Controller
{
    private function getCurrentYearChar()
    {
        $year = date('Y');

        return chr(97 + (($year - 2022) % 3));
    }


    private function getVideoImageUrl($filename)
    {
        return Storage::url('video_images/' . $filename . '.png');
    }

    public function getAssemblyList()
    {
        $config = json_decode(Storage::get('assemblyconfig.json'), false);

        $updatedContent = array();

        foreach ($config->content as $videoData) {
            $videoData->imageLink = $this->getVideoImageUrl($videoData->routename);
            array_push($updatedContent, $videoData);
        }
        return $updatedContent;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $videoList = json_decode(json_encode($this->getAssemblyList()), true);
        $sortedList = $videoList;
        if (!auth()->check()) {
            $sortedList = array_values(Arr::sort($videoList, function (array $value) {
                return $value;
            }));
            // Showing only the latest 2 months of videos to unauthenticated user
            $sortedList = array_slice($sortedList, -2, 2);
        }

        // TODO: Admin check for creation functionality 
        return Inertia::render('Assembly/Index', [
            'videoList' => $sortedList,
            'isAdmin' => true
        ]);
    }

    /**
     * Display admin panel for the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function admin()
    {
        $videoList = json_decode(json_encode($this->getAssemblyList()), true);
        return Inertia::render('Assembly/Admin', [
            'videoList' => $videoList
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return Inertia::render('Assembly/Create');
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $rules = [
            'monthTitle' => ['required'],
            'month' => ['required', Rule::in(['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'])],
            'series' => ['required', 'regex:/^\D\d{1,2}$/'],
            'routename' => ['required', 'regex:/^\D\d{2}$/'],
            'imageFile' => ['required', 'image', 'mimetypes:image/png'],
            'content' => ['array:videoTitle,externalUrl,duration', 'max:20', 'min:1'],
            'content.*.videoTitle' => ['required', 'min:3'],
            'content.*.externalUrl' => ['required', 'url'],
            'content.*.duration' => ['required'],
        ];
        $validator = Validator::make($request->all(), $rules, [], [
            'monthTitle' => 'Main Title',
            'content' => 'Video information',
            'content.*.videoTitle' => 'Video Title',
            'content.*.externalUrl' => 'External Url',
            'content.*.duration' => 'Duration',
        ]);

        $videoInfo = $validator->safe()->only(['content']);
        $imageInfo = $validator->safe()->only(['imageFile']);
        $assemblyInfo = $validator->safe()->except(['content', 'imageFile']);
        $assemblyInfo['series'] = strtoupper($assemblyInfo['series']);
        $assemblyInfo['routename'] = strtolower($assemblyInfo['routename']);

        // Storing image for the month
        $imageFile = $imageInfo["imageFile"];

        $path = $imageFile->storeAs('public/video_images', $assemblyInfo['routename'] . '.' . $imageFile->getClientOriginalExtension());

        // Storing updated assembly config file
        $assemblyConfig = json_decode(Storage::get('assemblyconfig.json'), false);
        $assemblyInfo['id'] = count($assemblyConfig->content);
        $assemblyInfo['imagePath'] = $path;
        array_push($assemblyConfig->content, (object)$assemblyInfo);

        // Storing updated video config file for the month
        $videoConfig = new stdClass();
        $videoConfig->title = $assemblyInfo['series'] . ' - ' . $assemblyInfo['monthTitle'];
        $videoConfig->imageId = $assemblyInfo['routename'];
        $videoConfig->content = $videoInfo['content'];

        for ($i = 0; $i < count($videoConfig->content); $i++) {
            $videoConfig->content[$i]['id'] = $i;
        }

        $storeConfigSuccess = Storage::put(
            'assemblyconfig.json',
            json_encode($assemblyConfig)
        );
        $videoConfigSuccess = Storage::put(
            'video_json/' . strtolower($assemblyInfo['routename']) . '.json',
            json_encode($videoConfig)
        );


        if (!$storeConfigSuccess || !$videoConfigSuccess) {
            return redirect()->back()->with('failure', 'Something went wrong');
        } else {
            return redirect()->route('assembly.admin')->with('success', 'Video added successfully');
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  string  $series
     * @return \Illuminate\Http\Response
     */
    public function show(string $series)
    {
        $jsonContent = new stdClass();

        $fileName = strtolower($series);
        $filePath = 'video_json/' . $fileName . '.json';
        if (Storage::disk('local')->exists($filePath)) {

            $content = Storage::disk('local')->get($filePath);
            $jsonContent = json_decode($content, false);
        }
        if ($jsonContent == new stdClass()) {
            return Inertia::render('NotFound');
        }

        return Inertia::render('Assembly/Show', [
            'videoId' => $this->getCurrentYearChar(),
            'videoData' => $jsonContent
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  string $series
     * @return \Illuminate\Http\Response
     */
    public function edit(string $series)
    {
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  string $series
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, string $series)
    {
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(int $id)
    {
        $assemblyConfig = json_decode(Storage::get('assemblyconfig.json'), false);
        $fileName = strtolower($assemblyConfig->content[$id]->routename);

        $filePath = 'video_json/' . $fileName . '.json';
        $pngPath = 'video_images/' . $fileName . '.png';


        // TODO: This check does not need to prevent the deletion
        if (!Storage::disk('local')->exists($filePath) || !Storage::disk('public')->exists($pngPath)) {
            return redirect()->back()->with('failure', 'Missing file in system');
        }

        // Destroy the .json file for the month
        Storage::disk('local')->delete($filePath);

        // Destroy the image for the month
        Storage::disk('public')->delete($pngPath);

        // Remove the entry in assembly config for the month
        $assemblyConfig->content = array_filter($assemblyConfig->content, function ($item) use ($id) {
            return $item->id !== $id;
        });
        Storage::put('assemblyconfig.json', json_encode($assemblyConfig));

        return redirect()->route('assembly.admin')->with('success', 'Video removed successfully');
    }



    public function list()
    {
        return Inertia::render('Assembly/List', [
            'videoList' => $this->getAssemblyList()
        ]);
    }

    public function image($imageId)
    {
        $fileName = strtolower($imageId);
        $filePath = 'video_images/' . $fileName . '.png';


        if (Storage::disk('public')->exists($filePath)) {
            return response()->file(Storage::disk('public')->path($filePath), ['Content-type' => 'image/png']);
        }
    }
}
