<?php

namespace App\Http\Controllers;

use App\Services\SunscoolApiService;
use Inertia\Inertia;

class SunscoolApiController extends Controller
{
    public function index()
    {
        $schoolsList = (new SunscoolApiService())->getSchoolsList();
        return Inertia::render('Settings/Sunscool/Index', [
            'schools' => $schoolsList
        ]);
    }

    public function classes($schoolId)
    {
        $school = (new SunscoolApiService())->getSchoolDetail($schoolId);
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
}
