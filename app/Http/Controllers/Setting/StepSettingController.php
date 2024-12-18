<?php

namespace App\Http\Controllers\Setting;

use App\Http\Requests\UpdateStepSettingRequest;
use App\Services\SettingsService;
use App\Settings\StepSettings;
use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;
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
        try {
            // Replacing stored image
            if ($request->hasFile('eventImage')) {
                SettingsService::saveNewImage($request->file('eventImage'), 'eventImageLink', $settings);
            }
            // Replacing stored file
            if ($request->hasFile('scheduleFile')) {
                SettingsService::saveNewFile($request->file('scheduleFile'), 'scheduleFileLink', $settings);
            }

            $settings->dates = $request->input('dates') ?? "";
            $settings->topic = $request->input('topic') ?? "";
            $settings->description = $request->input('description') ?? "";
            $settings->standardCost = $request->input('standardCost') ?? "";
            $settings->concessionCost = $request->input('concessionCost') ?? "";
            $settings->speaker = $request->input('speaker') ?? "";
            $settings->embedLink = $request->input('embedLink') ?? "";
            $settings->isActive = $request->boolean('isActive');

            $settings->save();
        } catch (\Exception $exception) {
            Log::error($exception);
            return redirect()->route('settings.step.index')->with('failure', 'STEP settings could not update');
        }
        return redirect()->route('settings.step.index')->with('success', 'STEP settings updated successfully');
    }

    public function destroyFile(StepSettings $settings)
    {
        if (Storage::disk('public')->exists($settings->scheduleFileLink)) {
            Storage::disk('public')->delete($settings->scheduleFileLink);

            $settings->scheduleFileLink = "";
            $settings->save();

            return redirect()->route('settings.step.index')->with('success', 'Schedule file removed');
        }
        return redirect()->route('settings.step.index')->with('warning', 'File not found');

    }
}
