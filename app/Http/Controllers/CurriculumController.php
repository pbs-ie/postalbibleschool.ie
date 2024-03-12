<?php

namespace App\Http\Controllers;

use App\Http\Requests\CurriculumPostRequest;
use App\Http\Requests\CurriculumPutRequest;
use App\Models\Curriculum;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CurriculumController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Inertia\Response
     */
    public function index()
    {
        $curricula = Curriculum::all([
            "id",
            "name",
            "email",
            "curriculum_type",
            "jan_lesson",
            "feb_lesson",
            "mar_lesson",
            "apr_lesson",
            "may_lesson",
            "jun_lesson",
            "jul_lesson",
            "aug_lesson",
            "sep_lesson",
            "oct_lesson",
            "nov_lesson",
            "dec_lesson",
        ]);
        $curricula->map(function (Curriculum $curriculum) {
            $curriculum["digital_count"] = $curriculum->getDigitalMonthsCount();
        });

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

        Curriculum::create($request->validated());
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
        Curriculum::findOrFail($curriculum->id)->update($request->validated());

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
