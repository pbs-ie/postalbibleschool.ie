<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateStepSettingRequest;
use App\Settings\StepSettings;
use Illuminate\Http\Request;
use Inertia\Inertia;
use \Cache;

class SettingController extends Controller
{
    public function index()
    {
        return redirect()->route('settings.step');
    }
    public function step(StepSettings $settings)
    {
        return Inertia::render('Settings/Step', [
            'stepSettings' => [
                'dates' => $settings->dates,
                'topic' => $settings->topic,
                'standardCost' => $settings->standardCost,
                'concessionCost' => $settings->concessionCost,
                'speaker' => $settings->speaker,
                'embedLink' => $settings->embedLink,
                'isActive' => $settings->isActive,
            ]
        ]);
    }

    public function stepUpdate(StepSettings $settings, UpdateStepSettingRequest $request)
    {
        $settings->dates = $request->input('dates');
        $settings->topic = $request->input('topic');
        $settings->standardCost = $request->input('standardCost');
        $settings->concessionCost = $request->input('concessionCost');
        $settings->speaker = $request->input('speaker');
        $settings->embedLink = $request->input('embedLink');
        $settings->isActive = $request->boolean('isActive');

        $settings->save();

        return redirect()->route('settings.step')->with('success', 'STEP settings updated successfully');
    }
}
