<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Setting;
use \Cache;
use App\Models\Curriculum;
use App\Models\Student;

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

    /**
     * Update Curriculum table in Filemaker
     * 
     * @param \Illuminate\Http\Request $request
     * @return void
     */
    public function updateFMCurriculum(Request $request)
    {
        $allCurricula = Curriculum::all();
        // Get all students for each curriculum
        foreach ($allCurricula as $curriculum) {
            $curriculumStudents = Student::whereHas('classroom.curriculum', function ($query) use ($curriculum) {
                return $query->where('id', $curriculum->id);
            })->get();
            foreach ($curriculumStudents as $student) {
                // Save to FM the curriculum to student map
                (new CurriculumController)->updateFMCurriculum($student->fm_student_id, $curriculum);
            }
        }
        return $request->session()->flash('success', "Filemaker records updated");
    }

}
