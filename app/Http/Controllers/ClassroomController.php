<?php

namespace App\Http\Controllers;

use App\Http\Requests\ClassroomRequest;
use App\Models\Classroom;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ClassroomController extends Controller
{
    /**
     * Display listing of the classrooms.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

        return Inertia::render('TeacherHub/Classroom/Index', [
            "classrooms" => Classroom::all()
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Classroom  $classroom
     * @return \Illuminate\Http\Response
     */
    public function show(Classroom $classroom)
    {
        return Inertia::render('TeacherHub/Classroom/Show', [
            "classroom" => $classroom
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\ClassroomRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(ClassroomRequest $request)
    {
        $classroom = Classroom::firstWhere('name', $request->name);
        
        if ($classroom) {
            return $request->session()->flash('warning', "Classroom already exists");
        } else {
            $classroom = new Classroom();
            $classroom->name = $request->name;
            $classroom->save();
        }

        return redirect()->route('classroom.show', $classroom->id)->with('success', "New classroom created");

    }
}
