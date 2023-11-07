<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;


class StepEventController extends Controller
{
    public function index() {
        return Inertia::render('Events/Step/Index');
    }

    public function signup() {
        return Inertia::render('Events/Step/Signup');
    }

    public function past() {
        $content = json_decode(Storage::get('stepconfig.json'), false);
        return Inertia::render('Events/Step/PastGallery', [
            'content' => $content->content
        ]);
    }

    public function details(string $event) {
        return Inertia::render('Events/Step/PastDetails', [
            'event' => $event
        ]);
    }

    public function schedule( ) {
            return Inertia::render('Events/Step/Index');
    }

    public function getImage($imageId) {
        $fileName = strtolower($imageId);
        $filePathJpg = 'video_images/' . $fileName . '.jpg';
        $filePathPng = 'video_images/' . $fileName . '.png';


        if (Storage::disk('public')->exists($filePathPng)) {
            return response()->file(Storage::disk('public')->path($filePathPng), ['Content-type' => 'image/png']);
        } else if(Storage::disk('public')->exists($filePathJpg)) {
            return response()->file(Storage::disk('public')->path($filePathJpg), ['Content-type' => 'image/jpg']);
        }
    }
}
