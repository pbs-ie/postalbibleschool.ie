<?php

namespace App\Http\Controllers\Setting;

use App\Http\Requests\UpdateStepSettingRequest;
use App\Settings\StepSettings;
use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Storage;

class StepSettingController extends Controller
{
    public function index(StepSettings $settings)
    {
        return Inertia::render('Settings/Step', [
            'stepSettings' => $settings
        ]);
    }

    public function update(StepSettings $settings, UpdateStepSettingRequest $request)
    {
        // Replacing stored image
        if ($request->hasFile('eventImage')) {
            if (Storage::disk('images')->exists($settings->eventImageLink)) {
                Storage::disk('images')->delete($settings->eventImageLink);
            }
            $storagePath = Storage::disk('images')->put('/event_images', $request->file('eventImage'));
            $settings->eventImageLink = $storagePath;
        }
        // Replacing stored file
        if ($request->hasFile('scheduleFile')) {
            if (Storage::disk('public')->exists($settings->scheduleFileLink)) {
                Storage::disk('public')->delete($settings->scheduleFileLink);
            }
            $storagePath = Storage::disk('public')->put('/files', $request->file('scheduleFile'));
            $settings->scheduleFileLink = $storagePath;
        }

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
