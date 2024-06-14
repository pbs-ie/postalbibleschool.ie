<?php

namespace App\Http\Controllers;

use App\Settings\StepSettings;
use Inertia\Inertia;

class StepEventController extends Controller
{
    public function index(StepSettings $stepSettings)
    {
        return Inertia::render('Events/Step/Index', [
            'stepSettings' => $stepSettings
        ]);
    }

    public function signup(StepSettings $stepSettings)
    {
        if (!$stepSettings->isActive) {
            return abort(404);
        }
        return Inertia::render('Events/Step/Signup', [
            'stepSettings' => $stepSettings
        ]);
    }

    public function schedule(StepSettings $stepSettings)
    {
        return Inertia::render('Events/Step/Schedule', [
            'stepSettings' => $stepSettings
        ]);
    }

}
