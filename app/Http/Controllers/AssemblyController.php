<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use stdClass;

class AssemblyController extends Controller
{

    private function getCurrentMonthFileName()
    {
        $year = date('Y');
        $month = date('m');

        return chr(97 + $year - 2022) . $month;
    }

    public function index()
    {
        $jsonContent = new stdClass();
        $fileName = $this->getCurrentMonthFileName();
        $filePath = 'video_json/' . $fileName . '.json';
        if (Storage::disk('local')->exists($filePath)) {

            $content = Storage::disk('local')->get($filePath);
            $jsonContent = json_decode($content, false);
        }
        return Inertia::render('Assembly', [
            'videoData' => $jsonContent
        ]);
    }
}
