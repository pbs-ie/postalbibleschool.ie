<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSunscoolStudentMarksRequest;
use App\Models\SunscoolMap;
use App\Services\SunscoolApiService;
use Inertia\Inertia;
use Illuminate\Http\Request;

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
            'schoolId' => fn() => $school->id,
            'schoolName' => fn() => $school->name,
            'classes' => fn() => $sunscoolClasses
        ]);
    }


    /**
     * Get all information for selected students and show page
     * @return \Inertia\Response
     */
    public function process(Request $request)
    {
        $students = $request->selectedStudents;

        $updatedStudents = SunscoolApiService::populateStudentsFmData($students);

        return Inertia::render('Settings/Sunscool/Processing', [
            "schoolId" => fn() => $request->schoolId,
            "students" => fn() => $updatedStudents
        ]);
    }

    /**
     * Summary of store
     * @param \App\Http\Requests\StoreSunscoolStudentMarksRequest $request
     */
    public function store(StoreSunscoolStudentMarksRequest $request)
    {
        SunscoolApiService::uploadStudentGrades($request->validated());
        return redirect()->back()->with('success', 'Values stored in Database');

    }

    public function markUnprocessed(Request $request)
    {
        $students = collect($request->selectedStudents);

        $studentIds = $students->pluck('pbsId')->unique();
        $levels = $students->pluck('level')->unique();
        $bibletimes = $students->pluck('bibletime')->unique();

        SunscoolMap::whereIn('fm_student_id', $studentIds)
            ->whereIn('level', $levels)
            ->whereIn('bibletime', $bibletimes)
            ->update(['is_processed' => false, 'progress' => null]);

        return redirect()->back()->with('success', 'Marked students as unprocessed');

    }
}
