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
            "dates" => ['required_if:isActive,true', 'string', 'nullable'],
            "year" => ['required_if:isActive,true', 'string', 'nullable'],
            "embedLink" => ['required_if:isActive,true', 'string', 'nullable'],
            "isActive" => ['required', 'boolean'],
            "reunionIsActive" => [
                function ($attribute, $value, $fail) use ($request) {
                    if ($request->boolean('isActive') && $request->boolean('reunionIsActive')) {
                        $fail("The `isActive` and `reunionIsActive` settings cannot both be true.");
                    }
                }
            ],
        ]);

        $settings->dates = $request->input('dates') ?? "";
        $settings->year = $request->input('year') ?? "";
        $settings->embedLink = $request->input('embedLink') ?? "";
        $settings->isActive = $request->boolean('isActive');

        $settings->save();

        return redirect()->route('settings.camp.index')->with('success', 'Camp settings updated successfully');
    }

    public function updateReunion(CampSettings $settings, Request $request)
    {
        $request->validate([
            "reunionDates" => ['required_if:reunionIsActive,true', 'string', 'nullable'],
            "reunionFormEmbedLink" => ['required_if:reunionIsActive,true', 'string', 'nullable'],
            "reunionIsActive" => ['required', 'boolean'],
            "isActive" => [
                function ($attribute, $value, $fail) use ($request) {
                    if ($request->boolean('isActive') && $request->boolean('reunionIsActive')) {
                        $fail("The `isActive` and `reunionIsActive` settings cannot both be true.");
                    }
                }
            ],
        ]);

        $settings->reunionDates = $request->input('reunionDates') ?? "";
        $settings->reunionFormEmbedLink = $request->input('reunionFormEmbedLink') ?? "";
        $settings->reunionIsActive = $request->boolean('reunionIsActive');

        $settings->save();

        return redirect()->route('settings.camp.index')->with('success', 'Camp Reunion settings updated successfully');
    }

    public function updatePayment(CampSettings $settings, Request $request)
    {
        $request->validate([
            "paymentDescription" => ['required', 'string'],
            "paymentPrices" => ['required', 'array', 'max:3']
        ]);
        $filteredPrices = array_values(array_filter($request->input('paymentPrices')));
        $settings->paymentPrices = $filteredPrices;
        $settings->paymentDescription = $request->input("paymentDescription");

        $settings->save();

        return redirect()->route('settings.camp.index')->with('success', 'Payment values updated successfully');
    }
}
