<?php

namespace App\Http\Controllers;

use App\Http\Requests\ClassroomRequest;
use App\Models\Classroom;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Controllers\FilemakerController;
use App\Http\Controllers\StudentController;
use Illuminate\Support\Facades\Auth;
use App\Models\MapEmailAreacode;
use App\Models\Student;


class ClassroomController extends Controller
{
    /**
     * Get area code for current user email
     * 
     * @param string $email
     * @return Collection Student
     */
    private function getStudentsForUser($email) {
        $areaCode = MapEmailAreacode::firstWhere('email', $email)->area_code;
        return Student::where('area_code', $areaCode)
        ->orderBy('grade')
        ->orderBy('last_name')
        ->get();
    }

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
        $allStudents = $this->getStudentsForUser('woodns2001@gmail.com'); //TODO:change to //auth()->user()->email
        $filteredStudents = $allStudents->filter(function($student) use ($classroom) {
            return $student['classroom_id'] === $classroom->id;
        });
        $classroomStudents = array_values($filteredStudents->toArray());
        return Inertia::render('TeacherHub/Classroom/Show', [
            "classroom" => $classroom,
            "students" => $classroomStudents,
            "allStudents" => $allStudents
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

        (new StudentController)->getAllStudents();

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
