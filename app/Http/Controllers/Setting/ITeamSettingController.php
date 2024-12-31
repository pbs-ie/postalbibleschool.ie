<?php

namespace App\Http\Controllers\Setting;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateITeamSettingRequest;
use App\Services\SettingsService;
use App\Settings\ITeamSettings;
use Inertia\Inertia;

class ITeamSettingController extends Controller
{
    public function index(ITeamSettings $settings)
    {
        return Inertia::render('Settings/ITeam', [
            'iteamSettings' => $settings,
        ]);
    }

    public function update(ITeamSettings $settings, UpdateITeamSettingRequest $request)
    {
        // Replacing stored image
        if ($request->hasFile('eventImage')) {
            SettingsService::saveNewImage($request->file('eventImage'), 'eventImageLink', $settings);
        }

        $settings->dates = $request->input('dates') ?? '';
        $settings->embedLink = $request->input('embedLink') ?? '';
        $settings->isActive = $request->boolean('isActive');

        $settings->save();

        return redirect()->route('settings.iteam.index')->with('success', 'iTeam settings updated successfully');
    }
}
