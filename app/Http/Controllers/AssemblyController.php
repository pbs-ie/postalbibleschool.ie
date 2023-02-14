<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use stdClass;

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

    public function index()
    {
        $videoList = $this->getAssemblyList();

        return Inertia::render('Assembly/Index', [
            'videoList' => $videoList
        ]);
    }

    public function show($series)
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

    public function image($imageId)
    {
        $fileName = strtolower($imageId);
        $filePath = 'video_images/' . $fileName . '.png';


        if (Storage::disk('public')->exists($filePath)) {
            return response()->file(Storage::disk('public')->path($filePath), ['Content-type' => 'image/png']);
        }
    }
}
