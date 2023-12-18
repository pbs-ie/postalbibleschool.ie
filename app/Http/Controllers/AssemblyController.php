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
use Illuminate\Validation\Rule;
use App\Models\AssemblyVideo;
use Illuminate\Support\Facades\Gate;


class AssemblyController extends Controller
{
    private function getCurrentYearChar()
    {
        $year = date('Y');

        return chr(97 + (($year - 2022) % 3));
    }

    public function parseExternalUrl($externalUrl)
    {
        preg_match('/\/(\d{5,})\??/', $externalUrl, $numCode, PREG_UNMATCHED_AS_NULL);
        if (count($numCode) < 1 || is_null($numCode[1])) {
            return "";
        } else {

            $assemblyConfig = json_decode(Storage::get('assemblyconfig.json'), false);
            return $assemblyConfig->externalPlayer->path . $numCode[1] . $assemblyConfig->externalPlayer->params;
        }
    }

    private function getRules()
    {
        return [
            'monthTitle' => ['required'],
            'month' => ['required', Rule::in(['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'])],
            'series' => ['required', 'regex:/^\D\d{1,2}$/'],
            'routename' => ['required', 'regex:/^\D\d{2}$/'],
            'imageFile' => ['required', 'image', 'mimetypes:image/png'],
            'content' => ['array:videoTitle,externalUrl,duration', 'max:20', 'min:1'],
        ];
    }

    // Returns the assembly config content as an array with imageLinks
    public function getAssemblyList()
    {
        $config = json_decode(Storage::get('assemblyconfig.json'), false);

        return $config->content;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $canViewAll = Gate::check('view:assembly');
        $canEdit = Gate::check('create:assembly');
        $videoList = json_decode(json_encode($this->getAssemblyList()), true);
        $sortedList = [];
        if (!$canViewAll) {
            $sortedList = array_values(Arr::sort($videoList, function (array $value) {
                return $value['id'];
            }));
            // Showing only the latest 2 months of videos to unauthenticated user
            $sortedList = array_slice($sortedList, -2, 2);
        } else {
            $sortedList = $videoList;
        }

        return Inertia::render('Assembly/Index', [
            'videoList' => $sortedList,
            'canViewGallery' => $canViewAll,
            'canEdit' => $canEdit
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
        $rules = $this->getRules();
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
        $assemblyInfo['imageLink'] = $assemblyConfig->imagesPath . $assemblyInfo['routename'];
        array_push($assemblyConfig->content, (object)$assemblyInfo);

        // Storing updated video config file for the month
        $videoConfig = new stdClass();
        $videoConfig->title = $assemblyInfo['series'] . ' - ' . $assemblyInfo['monthTitle'];
        $videoConfig->imageId = $assemblyInfo['routename'];
        $videoConfig->content = $videoInfo['content'];

        for ($i = 0; $i < count($videoConfig->content); $i++) {
            $videoConfig->content[$i]['id'] = $i;
            $videoConfig->content[$i]['title'] = $videoInfo['content'][$i]['videoTitle'];
            unset($videoConfig->content[$i]['videoTitle']);
            $videoConfig->content[$i]['externalUrl'] = $this->parseExternalUrl($videoConfig->content[$i]['externalUrl']);
        }

        $storeConfigSuccess = Storage::put(
            'assemblyconfig.json',
            json_encode($assemblyConfig, JSON_PRETTY_PRINT)
        );
        $videoConfigSuccess = Storage::put(
            $assemblyConfig->jsonPath . strtolower($assemblyInfo['routename']) . '.json',
            json_encode($videoConfig, JSON_PRETTY_PRINT)
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
        // Hiding additional assembly videos from unauthenticated users
        $canViewAll = Gate::check('view:assembly');
        if (!$canViewAll) {
            $assemblyList = json_decode(json_encode($this->getAssemblyList()), true);
            $lastTwoMonths = array_slice($assemblyList, -2, 2);
            $seriesExists = array_filter($lastTwoMonths, function ($value) use ($series) {
                return $value['routename'] == $series;
            });
            if (count($seriesExists) == 0) {
                return Inertia::render('NotFound');
            }
        }
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
            'videoData' => $jsonContent
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function edit(int $id)
    {
        $assemblyConfig = json_decode(Storage::get('assemblyconfig.json'), false);
        $videoData = $assemblyConfig->content[$id];
        $fileName = strtolower($videoData->routename);

        $filePath = $assemblyConfig->jsonPath . $fileName . '.json';

        $videoData->content = (json_decode(Storage::get($filePath), false))->content;

        return Inertia::render('Assembly/Edit', [
            "videoData" => $videoData
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, int $id)
    {
        $rules = $this->getRules();
        $rules['imageFile'] = ['image', 'mimetypes:image/png'];
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


        // Storing updated assembly config file
        $assemblyConfig = json_decode(Storage::get('assemblyconfig.json'), false);
        $assemblyInfo['id'] = $id;
        $assemblyInfo['series'] = strtoupper($assemblyConfig->content[$id]->series);
        $assemblyInfo['routename'] = strtolower($assemblyConfig->content[$id]->routename);

        // Storing image for the month
        if ($imageInfo) {
            $imageFile = $imageInfo["imageFile"];

            if (isset($imageFile)) {
                $path = $imageFile->storeAs('public/video_images', $assemblyInfo['routename'] . '.' . $imageFile->getClientOriginalExtension());
                $assemblyInfo['imageLink'] = $assemblyConfig->imagesPath . $assemblyInfo['routename'];
            }
        }

        $assemblyConfig->content[$id] = (object)$assemblyInfo;

        // Storing updated video config file for the month
        $videoConfig = new stdClass();
        $videoConfig->title = $assemblyInfo['series'] . ' - ' . $assemblyInfo['monthTitle'];
        $videoConfig->imageId = $assemblyInfo['routename'];
        $videoConfig->content = $videoInfo['content'];

        usort($videoConfig->content, function ($a, $b) {
            if ((int)$a['id'] === (int)$b['id']) {
                return 0;
            }
            return (int)$a['id'] < (int)$b['id'] ? -1 : 1;
        });
        for ($i = 0; $i < count($videoConfig->content); $i++) {
            $videoConfig->content[$i]['id'] = $i;
            $videoConfig->content[$i]['externalUrl'] = $this->parseExternalUrl($videoConfig->content[$i]['externalUrl']);
        }

        $storeConfigSuccess = Storage::put(
            'assemblyconfig.json',
            json_encode($assemblyConfig, JSON_PRETTY_PRINT)
        );
        $videoConfigSuccess = Storage::put(
            $assemblyConfig->jsonPath . strtolower($assemblyInfo['routename']) . '.json',
            json_encode($videoConfig, JSON_PRETTY_PRINT)
        );


        if (!$storeConfigSuccess || !$videoConfigSuccess) {
            return redirect()->back()->with('failure', 'Something went wrong');
        } else {
            return redirect()->route('assembly.admin')->with('success', 'Video updated successfully');
        }
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

        $filePath = $assemblyConfig->jsonPath . $fileName . '.json';
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
        $assemblyConfig->content = array_values(array_filter($assemblyConfig->content, function ($item) use ($id) {
            return $item->id !== $id;
        }));
        Storage::put('assemblyconfig.json', json_encode($assemblyConfig, JSON_PRETTY_PRINT));

        return redirect()->route('assembly.admin')->with('success', 'Video removed successfully');
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
