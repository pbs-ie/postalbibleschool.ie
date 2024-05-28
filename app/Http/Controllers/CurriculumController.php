<?php

namespace App\Http\Controllers;

use App\Http\Requests\CurriculumPostRequest;
use App\Http\Requests\CurriculumPutRequest;
use App\Models\Curriculum;
use Illuminate\Http\Request;
use App\Models\Student;
use Inertia\Inertia;
use stdClass;

class CurriculumController extends Controller
{
    private function getFMRecordsMap()
    {
        return [
            "jan_lesson" => "January",
            "feb_lesson" => "February",
            "mar_lesson" => "March",
            "apr_lesson" => "April",
            "may_lesson" => "May",
            "jun_lesson" => "June",
            "sep_lesson" => "September",
            "oct_lesson" => "October",
            "nov_lesson" => "November",
            "dec_lesson" => "December",
        ];
    }

    /**
     * Change all month values to paper if type is paper
     * @param mixed $validated
     * @return mixed
     */
    private function resetMonthTypes($validated)
    {
        if ($validated["curriculum_type"] === Curriculum::PAPER) {
            $validated["jan_lesson"] = Curriculum::PAPER;
            $validated["feb_lesson"] = Curriculum::PAPER;
            $validated["mar_lesson"] = Curriculum::PAPER;
            $validated["apr_lesson"] = Curriculum::PAPER;
            $validated["may_lesson"] = Curriculum::PAPER;
            $validated["jun_lesson"] = Curriculum::PAPER;
            $validated["sep_lesson"] = Curriculum::PAPER;
            $validated["oct_lesson"] = Curriculum::PAPER;
            $validated["nov_lesson"] = Curriculum::PAPER;
            $validated["dec_lesson"] = Curriculum::PAPER;
        }
        return $validated;
    }
    /**
     * Update Curriculum table in Filemaker
     * 
     * @param \Illuminate\Http\Request $request
     * @return void
     */
    public function updateCurriculumTable(Request $request)
    {
        $allCurricula = Curriculum::all();
        // Get all students for each curriculum
        foreach ($allCurricula as $curriculum) {
            $curriculumStudents = Student::whereHas('classroom.curriculum', function ($query) use ($curriculum) {
                return $query->where('id', $curriculum->id);
            })->get();
            foreach ($curriculumStudents as $student) {
                // Save to FM the curriculum to student map
                $this->updateFMCurriculum($student->fm_student_id, $curriculum);
            }
        }
        return $request->session()->flash('success', "Filemaker records updated");
    }

    /**
     * Calls Filemaker API to store new curriculum or update existing one
     * 
     * @return string
     */
    public function updateFMCurriculum($studentId, $validated)
    {
        $fmDataObject = new stdClass();
        $fmDataObject->{"FKStudentID"} = $studentId;
        $mapValues = $this->getFMRecordsMap();
        $keys = array_keys((array) $mapValues);
        for ($i = 0; $i < count($keys); $i++) {
            $currentKey = $keys[$i];
            $fmDataObject->{$mapValues[$currentKey]} = $validated->$currentKey;
        }

        $recordId = (new FilemakerController)->createCurriculum((object) $fmDataObject);

        return $recordId;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Inertia\Response
     */
    public function index()
    {
        $curricula = Curriculum::allWithDigitalCount();

        return Inertia::render("TeacherHub/Curriculum/Index", [
            "curriculumList" => $curricula
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Inertia\Response
     */
    public function create()
    {
        return Inertia::render("TeacherHub/Curriculum/Create");
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\CurriculumPostRequest  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(CurriculumPostRequest $request)
    {
        $validated = $this->resetMonthTypes($request->validated());

        Curriculum::create($validated);
        return redirect()->route('curriculum.index')->with('success', 'Curriculum created successfully');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Curriculum  $curriculum
     * @return \Inertia\Response
     */
    public function show(Curriculum $curriculum)
    {
        return Inertia::render('TeacherHub/Curriculum/Edit', [
            "curriculum" => $curriculum
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Curriculum  $curriculum
     * @return \Inertia\Response
     */
    public function edit(Curriculum $curriculum)
    {
        return Inertia::render('TeacherHub/Curriculum/Edit', [
            "curriculum" => $curriculum
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\CurriculumPutRequest  $request
     * @param  \App\Models\Curriculum  $curriculum
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(CurriculumPutRequest $request, Curriculum $curriculum)
    {
        $validated = $this->resetMonthTypes($request->validated());

        Curriculum::findOrFail($curriculum->id)->update($validated);

        return redirect()->route('curriculum.index')->with('success', 'Curriculum updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Curriculum  $curriculum
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy(Curriculum $curriculum)
    {
        Curriculum::findOrFail($curriculum->id)->delete();

        return redirect()->route('curriculum.index')->with('success', 'Curriculum deleted successfully');
    }
}
