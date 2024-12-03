<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSunscoolStudentMarksRequest;
use App\Services\SunscoolApiService;
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
        $sunscoolService = new SunscoolApiService();
        $school = $sunscoolService->getSchoolDetail($schoolId);

        $sunscoolClasses = $sunscoolService->flattenClasses($school->classes);

        return Inertia::render('Settings/Sunscool/Classes', [
            'schoolId' => $school->id,
            'schoolName' => $school->name,
            'classes' => $sunscoolClasses
        ]);
    }

    // public function students($schoolId, $classId)
    // {
    //     $class = (new SunscoolApiService())->getClassDetails($schoolId, $classId);
    //     dd($class);
    //     return Inertia::render('Settings/Sunscool/Students', [
    //         'classroom' => $class
    //     ]);
    // }

    // public function studentDetails($studentId)
    // {
    //     // $student = Student::where('fm_student_id', $studentId)->first();
    //     $student = (new FilemakerService())->getFmStudentMarks($studentId);

    //     return Inertia::render('Settings/Sunscool/Student', [
    //         'student' => $student
    //     ]);
    // }

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
