<?php

namespace App\Http\Controllers\Setting;

use App\Settings\ITeamSettings;
use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Storage;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules\File;

class ITeamSettingController extends Controller
{
    public function index(ITeamSettings $settings)
    {
        return Inertia::render('Settings/ITeam', [
            'iteamSettings' => $settings
        ]);
    }

    public function update(ITeamSettings $settings, Request $request)
    {
        $request->validate([
            "dates" => ['required', 'string'],
            "embedLink" => ['required', 'string'],
            "isActive" => ['required'],
            'eventImage' => [
                File::image()
                    ->types(['png', 'jpg'])
                    ->max(15 * 1024)
            ],
        ]);
        // Replacing stored image
        if ($request->hasFile('eventImage')) {
            if (Storage::disk('images')->exists($settings->eventImageLink)) {
                Storage::disk('images')->delete($settings->eventImageLink);
            }
            $storagePath = Storage::disk('images')->put('/event_images', $request->file('eventImage'));
            $settings->eventImageLink = $storagePath;
        }

        $settings->dates = $request->input('dates');
        $settings->embedLink = $request->input('embedLink');
        $settings->isActive = $request->boolean('isActive');

        $settings->save();

        return redirect()->route('settings.iteam.index')->with('success', 'iTeam settings updated successfully');
    }
}
