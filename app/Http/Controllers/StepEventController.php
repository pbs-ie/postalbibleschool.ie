<?php

namespace App\Http\Controllers;

use App\Models\StepEvent;
use App\Settings\StepSettings;
use Inertia\Inertia;

class StepEventController extends Controller
{
    public function index(StepSettings $stepSettings)
    {
        $activeEvent = StepEvent::find($stepSettings->activeId);

        $upcomingEvents = StepEvent::whereIn('id', [$stepSettings->upcomingId1, $stepSettings->upcomingId2, $stepSettings->upcomingId3])->get()->sortBy('startDate');
        $showSettings = collect($stepSettings)->only('standardCost', 'concessionCost', 'embedLink', 'scheduleFileLink', 'isRegistrationActive');

        return Inertia::render('Events/Step/Index', [
            'activeEvent' => $activeEvent,
            'stepSettings' => $showSettings,
            'upcomingEvents' => $upcomingEvents,
        ]);
    }

    public function signup(StepSettings $stepSettings)
    {
        if (!$stepSettings->isRegistrationActive) {
            return abort(404);
        }
        $activeEvent = StepEvent::find($stepSettings->activeId);
        $showSettings = collect($stepSettings)->only('standardCost', 'concessionCost', 'embedLink', 'scheduleFileLink', 'isRegistrationActive', 'description');

        return Inertia::render('Events/Step/Signup', [
            'activeEvent' => $activeEvent,
            'stepSettings' => $showSettings,
        ]);
    }

    public function schedule(StepSettings $stepSettings)
    {
        $showSettings = collect($stepSettings)->only('scheduleFileLink', 'isRegistrationActive');

        return Inertia::render('Events/Step/Schedule', [
            'stepSettings' => $showSettings,
            'activeEvent' => StepEvent::find($stepSettings->activeId),
        ]);
    }

    public function podcast(StepSettings $stepSettings)
    {
        return Inertia::render('Events/Step/Podcast', [
            'stepSettings' => $stepSettings,
        ]);
    }
}
