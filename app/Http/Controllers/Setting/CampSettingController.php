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
            'campSettings' => fn() => $settings
        ]);
    }

    public function update(CampSettings $settings, Request $request)
    {
        $request->validate([
            "dates" => ['required', 'string'],
            "year" => ['required', 'string'],
            "embedLink" => ['required', 'string'],
            "isActive" => ['required', 'boolean'],
        ]);

        $settings->dates = $request->input('dates');
        $settings->year = $request->input('year');
        $settings->embedLink = $request->input('embedLink');
        $settings->isActive = $request->boolean('isActive');

        $settings->save();

        return redirect()->route('settings.camp.index')->with('success', 'Camp settings updated successfully');
    }

    public function updateReunion(CampSettings $settings, Request $request)
    {
        $request->validate([
            "reunionDates" => ['required', 'string'],
            "reunionIsActive" => ['required', 'boolean'],
            "reunionFormEmbedLink" => ['required', 'string'],
        ]);

        $settings->reunionDates = $request->input('reunionDates');
        $settings->reunionFormEmbedLink = $request->input('reunionFormEmbedLink');
        $settings->reunionIsActive = $request->boolean('reunionIsActive');

        $settings->save();

        return redirect()->route('settings.camp.index')->with('success', 'Camp Reunion settings updated successfully');
    }

    public function updatePayment(CampSettings $settings, Request $request)
    {
        $request->validate([
            "paymentPrices" => ['required', 'array', 'max:3']
        ]);
        $filteredPrices = array_values(array_filter($request->input('paymentPrices')));
        $settings->paymentPrices = $filteredPrices;

        $settings->save();

        return redirect()->route('settings.camp.index')->with('success', 'Payment values updated successfully');
    }
}
