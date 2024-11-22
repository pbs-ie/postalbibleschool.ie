<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSunscoolStudentMarksRequest;
use App\Services\SunscoolApiService;
use Illuminate\Support\Arr;
use Inertia\Inertia;

class SunscoolApiController extends Controller
{
    public function index()
    {
        $schoolsList = (new SunscoolApiService())->getSchoolsList();
        usort($schoolsList, fn($a, $b) => (
            strcasecmp($a->name, $b->name)
        ));
        return Inertia::render('Settings/Sunscool/Index', [
            'schools' => $schoolsList
        ]);
    }

    public function classes($schoolId)
    {
        $school = (new SunscoolApiService())->getSchoolDetail($schoolId);

        // Convert the main data to a collection
        $classes = collect($school->classes)
            ->sortBy(fn($class) => strtolower($class->name))
            ->map(function ($class) {
                // Map students for each class
                $students = collect($class->students)
                    ->filter(fn($student) => (!empty ($student->lessons)))
                    ->flatMap(function ($student) {
                    // Get student details
                    $pbsId = $student->pbs_id ?? null;
                    $sunscoolId = $student->id;
                    $studentName = $student->name;

                    // Iterate through all language keys in lessons
                    return collect($student->lessons)->flatMap(function ($lessons, $language) use ($pbsId, $sunscoolId, $studentName) {
                        // Map each lesson with the language parameter
                        return collect($lessons)->map(function ($lesson) use ($pbsId, $sunscoolId, $studentName, $language) {
                            return (object) [
                                'pbsId' => $pbsId,
                                'sunscoolId' => $sunscoolId,
                                'name' => $studentName,
                                'language' => $language,
                                'bibletime' => $lesson->bibletime,
                                'progress' => $lesson->progress,
                                'level' => $lesson->level,
                            ];
                        });
                    });
                });

                // Return the class with its students
                return (object) [
                    'id' => $class->id,
                    'name' => $class->name,
                    'students' => $students->values(),
                ];
            });

        return Inertia::render('Settings/Sunscool/Classes', [
            'schoolId' => $school->id,
            'schoolName' => $school->name,
            'classes' => $classes->values()
        ]);
    }

    public function students($schoolId, $classId)
    {
        $class = (new SunscoolApiService())->getClassDetails($schoolId, $classId);
        dd($class);
        return Inertia::render('Settings/Sunscool/Students', [
            'classroom' => $class
        ]);
    }

    /**
     * Store student marks to Filemaker Database
     * @param \App\Http\Requests\StoreSunscoolStudentMarksRequest $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(StoreSunscoolStudentMarksRequest $request)
    {
        dd($request->all());
        return redirect()->route('settings.sunscool.index')->with('success', 'Values stored in Database');
    }
}
