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
