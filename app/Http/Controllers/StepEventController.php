<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;


class StepEventController extends Controller
{
    public function index() {
        return Inertia::render('Events/Step/Index');
    }

    public function signup() {
        return Inertia::render('Events/Step/Signup');
    }

    public function past() {
        return Inertia::render('Events/Step/PastGallery');
    }

    public function details(string $event) {
        return Inertia::render('Events/Step/PastDetails', [
            'event' => $event
        ]);
    }
}
