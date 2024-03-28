<?php

namespace App\Http\Controllers;

use App\Http\Requests\ClassroomRequest;
use App\Models\Classroom;
use App\Models\Curriculum;
use Inertia\Inertia;
use App\Http\Controllers\StudentController;
use App\Models\MapEmailAreacode;
use App\Models\Student;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;


class ClassroomController extends Controller
{
    /**
     * Get area code for current user email
     * 
     * @param string $email
     * @return Collection Student
     */
    private function getStudentsForUser($email)
    {
        $mapResult = MapEmailAreacode::select('area_code')->where('email', $email)->first();
        return Student::where('area_code', $mapResult['area_code'])
            ->orderBy('grade')
            ->orderBy('last_name')
            ->get();
    }

    /**
     * Display listing of the classrooms.
     *
     * @return \Illuminate\Http\RedirectResponse
     */
    public function index()
    {
        return redirect('/');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Classroom  $classroom
     * @return \Illuminate\Http\Response | \Inertia\Response
     */
    public function show(Classroom $classroom)
    {
        if ($classroom->email !== auth()->user()->email) {
            return Inertia::render('NotFound');
        }
        $allStudents = $this->getStudentsForUser(auth()->user()->email);
        $filteredStudents = $allStudents->filter(function ($student) use ($classroom) {
            return $student['classroom_id'] === $classroom->id;
        });
        $classroomStudents = array_values($filteredStudents->toArray());

        $curricula = Curriculum::current();
        $classroomCurriculum = [];
        if (isset($classroom->curriculum_id)) {
            $classroomCurriculum = Curriculum::findOrFail($classroom->curriculum_id)
                ->only([
                    "name",
                    "jan_lesson",
                    "feb_lesson",
                    "mar_lesson",
                    "apr_lesson",
                    "may_lesson",
                    "jun_lesson",
                    "sep_lesson",
                    "oct_lesson",
                    "nov_lesson",
                    "dec_lesson",

                ]);
        }

        return Inertia::render('TeacherHub/Classroom/Show', [
            "classroom" => $classroom,
            "students" => $classroomStudents,
            "allStudents" => $allStudents,
            "curricula" => $curricula,
            "classCurriculum" => $classroomCurriculum
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\ClassroomRequest  $request
     * @return \Illuminate\Http\RedirectResponse | void
     */
    public function store(ClassroomRequest $request)
    {
        $classroom = Classroom::where([
            ['email', auth()->user()->email]
        ])
            ->whereRaw("LOWER(name) = ?", [strtolower($request->name)])
            ->first();
        if ($classroom) {
            return $request->session()->flash('warning', "Classroom already exists");
        }

        $returnValue = (new StudentController)->getAllStudentsList();
        if (sizeof($returnValue) === 0) {
            return redirect()->back()->with("failure", "No students for current user");
        }

        $classroom = new Classroom();
        $classroom->name = strtolower($request->name);
        $classroom->email = auth()->user()->email;
        $classroom->save();

        return redirect()->route('classroom.show', $classroom->id)->with('success', "New classroom created");

    }

    /**
     * Add Curriculum Id to Classroom
     * 
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function curriculumStore(Request $request)
    {
        $classroomId = $request->classroomId;
        $curriculumId = $request->curriculumId;

        $classroom = Classroom::findOrFail($classroomId);
        $classroom->curriculum_id = $curriculumId;
        $classroom->save();

        return redirect()->back()->with("success", "Curriculum added to classroom");
    }

    /**
     * Remove the classroom from storage.
     *
     * @param  int $id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy(int $id)
    {
        $classroom = Classroom::findOrFail($id);
        $classroom->delete();

        return redirect()->back()->with('success', "Classroom deleted successfully");
    }
}
