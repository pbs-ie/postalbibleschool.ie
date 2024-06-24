<?php

namespace App\Http\Controllers;

use App\Http\Services\SunscoolApiService;
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
        dd($school);
        return Inertia::render('Settings/Sunscool/Classes', [
            'schools' => $school
        ]);
    }
}
