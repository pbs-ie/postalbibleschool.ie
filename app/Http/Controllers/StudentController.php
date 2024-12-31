<?php

namespace App\Http\Controllers;

use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class StudentController extends Controller
{
    public function index()
    {
        return Inertia::render('TeacherHub/Student/Index', [
            'students' => Student::with('classroom:id,name')->getActiveStudents()->getStudentsForUser(),
        ]);
    }

    /**
     * Get list of students for the current user
     *
     * @return \Illuminate\Http\RedirectResponse
     */
    public function getAllStudents()
    {
        try {
            $this->storeStudentsListForUser(auth()->user()->email);
        } catch (\Exception $e) {
            Log::warning($e);

            return redirect()->back()->with('failure', 'No students found');
        }
        $studentList = Student::getActiveStudents()->getStudentsForUser();
        if ($studentList->isEmpty()) {
            return redirect()->back()->with('failure', 'No students found');
        }

        return redirect()->back()->with('success', 'Student list updated');
    }

    /**
     * Add students to the classroom
     *
     * @return \Illuminate\Http\RedirectResponse
     */
    public function addStudentsToClassroom(Request $request)
    {
        $classroomId = $request->classroomId;
        $studentCollection = collect($request->selectedStudentsId);
        $studentCollection->each(function ($studentId) use ($classroomId) {
            $studentModel = Student::findOrFail($studentId);
            $studentModel->classroom_id = $classroomId;
            $studentModel->save();
        });

        return redirect()->back()->with('success', 'New students added to classroom');
    }

    /**
     * Remove students to the classroom
     *
     * @return \Illuminate\Http\RedirectResponse
     */
    public function removeStudentsFromClassroom(Request $request)
    {

        $studentCollection = collect($request->selectedStudentsId);
        $studentCollection->each(function ($studentId) {
            $studentModel = Student::findOrFail($studentId);
            $studentModel->classroom_id = null;
            $studentModel->save();
        });

        return redirect()->back()->with('success', 'Students removed from the classroom');
    }
}
