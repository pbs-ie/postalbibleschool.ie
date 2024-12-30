<?php

namespace App\Http\Controllers\Setting;

use App\Http\Requests\UpdateStepSettingRequest;
use App\Services\SettingsService;
use App\Settings\StepSettings;
use App\Http\Controllers\Controller;
use Inertia\Inertia;
use App\Models\StepEvent;
use Illuminate\Support\Facades\Log;
use Storage;

class StepSettingController extends Controller
{
    public function index(StepSettings $settings)
    {
        $allEvents = StepEvent::orderByDesc('startDate')->get();
        $eventOptions = SettingsService::getEventOptions(StepEvent::all(), $settings);
        return Inertia::render('Settings/Step', [
            'stepSettings' => $settings,
            'eventOptions' => $eventOptions,
            'allEvents' => $allEvents
        ]);
    }

    public function update(StepSettings $settings, UpdateStepSettingRequest $request)
    {
        try {
            // Replacing stored file
            if ($request->hasFile('scheduleFile')) {
                SettingsService::saveNewFile($request->file('scheduleFile'), 'scheduleFileLink', $settings);
            }

            $settings->isRegistrationActive = $request->boolean('isRegistrationActive');
            $settings->description = $request->input('description') ?? "";
            $settings->standardCost = $request->input('standardCost');
            $settings->concessionCost = $request->input('concessionCost');
            $settings->embedLink = $request->input('embedLink') ?? "";
            $settings->activeId = $request->input('activeId');
            $settings->upcomingId1 = $request->input('upcomingId1');
            $settings->upcomingId2 = $request->input('upcomingId2');
            $settings->upcomingId3 = $request->input('upcomingId3');

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
