<?php

namespace App\Http\Controllers\Setting;

use App\Settings\EventsSettings;
use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Storage;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules\File;
use Illuminate\Support\Facades\Log;

class EventsSettingController extends Controller
{
    public function index(EventsSettings $eventsSettings)
    {
        return Inertia::render('Settings/Events', [
            'eventsSettings' => $eventsSettings
        ]);
    }

    public function update(EventsSettings $settings, Request $request)
    {
        try {
            // Replacing stored file
            if ($request->hasFile('prizegivings_scheduleFile')) {
                if (Storage::disk('public')->exists($settings->prizegivings_scheduleFileLink)) {
                    Storage::disk('public')->delete($settings->prizegivings_scheduleFileLink);
                }
                $storagePath = Storage::disk('public')->put('/files', $request->file('prizegivings_scheduleFile'));
                $settings->prizegivings_scheduleFileLink = $storagePath;
            }
            if ($request->hasFile('shed_consentForm')) {
                if (Storage::disk('public')->exists($settings->shed_consentFormLink)) {
                    Storage::disk('public')->delete($settings->shed_consentFormLink);
                }
                $storagePath = Storage::disk('public')->put('/files', $request->file('shed_consentForm'));
                $settings->shed_consentFormLink = $storagePath;
            }
            if ($request->hasAny(['shed_dates', 'shed_location', 'shed_year', 'shed_embedLink', 'shed_isActive'])) {

                $settings->shed_dates = $request->input('shed_dates');
                $settings->shed_location = $request->input('shed_location');
                $settings->shed_year = $request->input('shed_year');
                $settings->shed_embedLink = $request->input('shed_embedLink');
                $settings->shed_isActive = $request->input('shed_isActive');
            }
            if ($request->hasAny(['prizegivings_year', 'prizegivings_isActive'])) {

                $settings->prizegivings_year = $request->input('prizegivings_year');
                $settings->prizegivings_isActive = $request->boolean('prizegivings_isActive');
            }

            $settings->save();
        } catch (\Exception $exception) {
            Log::error($exception);
            return redirect()->route('settings.events.index')->with('failure', 'Events settings could not update');
        }
        return redirect()->route('settings.events.index')->with('success', 'Events settings updated successfully');
    }

    public function destroyFile(Request $request, EventsSettings $settings)
    {
        // Validate the request to ensure exactly one file link is present
        $validatedData = $request->validate([
            'prizegivings_scheduleFileLink' => 'required_without:shed_consentFormLink|string',
            'shed_consentFormLink' => 'required_without:prizegivings_scheduleFileLink|string',
        ]);

        // Determine which file link is being processed
        $fileKey = $request->has('prizegivings_scheduleFileLink') ? 'prizegivings_scheduleFileLink' : 'shed_consentFormLink';
        $fileLink = $validatedData[$fileKey];

        // Process the file link and update settings
        return $this->removeFileAndUpdateSettings($fileLink, $settings, $fileKey);
    }
    private function removeFileAndUpdateSettings($fileLink, EventsSettings $settings, $attribute)
    {
        $disk = Storage::disk('public');

        if (!$disk->exists($fileLink)) {
            $settings->{$attribute} = null;
            $settings->save();

            return redirect()->route('settings.events.index')->with('warning', 'File not found. Link removed.');
        }

        $disk->delete($fileLink);
        $settings->{$attribute} = null;
            $settings->save();

        return redirect()->route('settings.events.index')->with('success', ucfirst(str_replace('_', ' ', $attribute)) . ' removed successfully');
    }

}