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
        $school = (new SunscoolApiService())->getSchoolDetail($schoolId);
        usort($school->classes, fn($a, $b) => (
            strcasecmp($a->name, $b->name)
        ));
        return Inertia::render('Settings/Sunscool/Classes', [
            'school' => $school
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
        dd($request->validated());
        return redirect()->route('settings.sunscool.index')->with('success', 'Values stored in Database');
    }
}
