<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
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
        dd($request->all());
        $rules = [
            'monthTitle' => ['required'],
            'month' => ['required'],
            'series' => ['required'],
            'routename' => ['required'],
            'content.*.videoTitle' => ['required'],
            'content.*.externalUrl' => ['required'],
            'content.*.duration' => ['required'],
        ];
        $validator = Validator::make($request->all(), $rules, []);

        $assemblyInfo = $validator->safe()->except(['content']);
        $videoInfo = $validator->safe()->only(['content']);

        $assemblyInfo['imageLink'] = $this->getVideoImageUrl($assemblyInfo['routename']);

        $videoList = $this->getAssemblyList();

        dd($videoList);

        Storage::putFileAs(
            '/',
            json_encode($videoList),
            'assemblyconfig.json'
        );
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
     * @param  string $series
     * @return \Illuminate\Http\Response
     */
    public function destroy(string $series)
    {
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
