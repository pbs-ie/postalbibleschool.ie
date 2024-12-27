<?php

namespace App\Http\Controllers;

use App\Settings\StepSettings;
use App\Models\StepEvent;
use Inertia\Inertia;

class StepEventController extends Controller
{
    public function index(StepSettings $stepSettings)
    {
        $activeEvent = StepEvent::find($stepSettings->activeId);
        $showSettings = collect($stepSettings)->only('standardCost', 'concessionCost', 'embedLink', 'scheduleFileLink', 'isRegistrationActive');
        return Inertia::render('Events/Step/Index', [
            'activeEvent' => $activeEvent,
            'stepSettings' => $showSettings
        ]);
    }

    public function signup(StepSettings $stepSettings)
    {
        if (!$stepSettings->isRegistrationActive) {
            return abort(404);
        }
        $activeEvent = StepEvent::find($stepSettings->activeId);
        $showSettings = collect($stepSettings)->only('standardCost', 'concessionCost', 'embedLink', 'scheduleFileLink', 'isRegistrationActive');

        return Inertia::render('Events/Step/Signup', [
            'activeEvent' => $activeEvent,
            'stepSettings' => $showSettings
        ]);
    }

    public function schedule(StepSettings $stepSettings)
    {
        $showSettings = collect($stepSettings)->only('scheduleFileLink', 'isRegistrationActive');

        return Inertia::render('Events/Step/Schedule', [
            'stepSettings' => $showSettings
        ]);
    }

}
