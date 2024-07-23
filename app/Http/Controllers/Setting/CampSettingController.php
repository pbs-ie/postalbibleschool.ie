<?php

namespace App\Http\Controllers\Setting;

use App\Settings\CampSettings;
use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules\File;

class CampSettingController extends Controller
{
    public function index(CampSettings $settings)
    {
        return Inertia::render('Settings/Camp', [
            'campSettings' => $settings
        ]);
    }

    public function update(CampSettings $settings, Request $request)
    {
        $request->validate([
            "dates" => ['required', 'string'],
            "year" => ['required', 'string'],
            "embedLink" => ['required', 'string'],
            "isActive" => ['required'],

        ]);

        $settings->dates = $request->input('dates');
        $settings->year = $request->input('year');
        $settings->embedLink = $request->input('embedLink');
        $settings->isActive = $request->boolean('isActive');

        $settings->save();

        return redirect()->route('settings.camp.index')->with('success', 'Camp settings updated successfully');
    }
}
