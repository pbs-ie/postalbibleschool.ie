<?php

namespace App\Http\Controllers\Setting;

use App\Http\Controllers\Controller;
use App\Settings\LessonSettings;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LessonSettingController extends Controller
{
    public function index(LessonSettings $settings)
    {
        return Inertia::render('Settings/Lesson', [
            'lessonSettings' => fn () => $settings,
        ]);
    }

    public function update(LessonSettings $settings, Request $request)
    {
        $settings->lock('lesson_map');
        $request->validate([
            'selectedMap' => ['required', 'numeric'],
        ]);

        $settings->active_index = $request->integer('selectedMap');

        $settings->save();

        return redirect()->route('settings.lesson.index')->with('success', 'Lesson settings updated successfully');
    }
}
