<?php

namespace App\Http\Controllers\Setting;

use App\Http\Requests\UpdateStepSettingRequest;
use App\Settings\StepSettings;
use App\Http\Controllers\Controller;
use Inertia\Inertia;

class StepSettingController extends Controller
{
    public function index(StepSettings $settings)
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

    public function update(StepSettings $settings, UpdateStepSettingRequest $request)
    {
        $settings->dates = $request->input('dates');
        $settings->topic = $request->input('topic');
        $settings->standardCost = $request->input('standardCost');
        $settings->concessionCost = $request->input('concessionCost');
        $settings->speaker = $request->input('speaker');
        $settings->embedLink = $request->input('embedLink');
        $settings->isActive = $request->boolean('isActive');

        $settings->save();

        return redirect()->route('settings.step.index')->with('success', 'STEP settings updated successfully');
    }
}
