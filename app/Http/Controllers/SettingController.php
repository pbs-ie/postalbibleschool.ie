<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Setting;
use \Cache;

class SettingController extends Controller
{
    /**
     * Show Edit Event settings page
     * 
     * @return \Inertia\Response
     */
    public function editEvents()
    {
        $eventData = Cache::get("eventSettings", function () {
            return Setting::all();
        });
        return Inertia::render('Events/Settings', [
            'eventSettings' => $eventData
        ]);
    }

    /**
     * Call to change event settings
     * 
     * @param \Illuminate\Http\Request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function storeEvents(Request $request)
    {
        $inputData = $request->all();
        foreach ($inputData as $key => $value) {
            Setting::where('key', $key)->update(['value' => $value]);
        }
        Cache::flush();
        return redirect()->route('events.settings.edit')->with('success', 'Settings updated');
    }

}
