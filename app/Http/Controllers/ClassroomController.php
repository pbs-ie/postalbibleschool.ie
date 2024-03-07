<?php

namespace App\Http\Controllers;

use App\Http\Requests\ClassroomRequest;
use App\Models\Classroom;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Controllers\FilemakerController;
use App\Http\Controllers\StudentController;
use Illuminate\Support\Facades\Auth;
use App\Models\Student;


class ClassroomController extends Controller
{
    /**
     * Display listing of the classrooms.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return redirect('/');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Classroom  $classroom
     * @return \Illuminate\Http\Response
     */
    public function show(Classroom $classroom)
    {
        $allStudents = Student::where('grade', "Level 2")->get();
        return Inertia::render('TeacherHub/Classroom/Show', [
            "classroom" => $classroom,
            "students" => $allStudents
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

    

    /**
     * Add new students to the classroom
     * 
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function addStudents(Request $request) {

    }
}
