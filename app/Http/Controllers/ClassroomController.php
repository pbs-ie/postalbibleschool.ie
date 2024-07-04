<?php

namespace App\Http\Controllers;

use App\Http\Requests\ClassroomRequest;
use App\Models\Classroom;
use App\Models\Curriculum;
use App\Models\FmLessonOrder;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;
use App\Models\Student;
use Illuminate\Http\Request;
use App\Mail\ClassroomOrderChanged;
use Illuminate\Support\Facades\Mail;


class ClassroomController extends Controller
{

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
        $allStudents = Student::getStudentsForUser();
        $classroomStudents = $classroom
            ->students()
            ->orderBy('grade')
            ->orderBy('last_name')
            ->orderBy('first_name')
            ->get();


        $curricula = Curriculum::current();
        $classroomCurriculum = $classroom->curriculum()->firstOrFail()
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
            return redirect()->route('dashboard')->with('warning', "Classroom already exists");
        }

        // if (Student::getStudentsForUser()->isEmpty()) {
        //     return redirect()->route('dashboard')->with("failure", "No students for current user");
        // }
        $classroom = new Classroom();
        $classroom->fill([
            'name' => strtolower($request->name),
            'email' => auth()->user()->email,
            'level_0_order' => 0,
            'level_1_order' => 0,
            'level_2_order' => 0,
            'level_3_order' => 0,
            'level_4_order' => 0,
            'tlp_order' => 0,
            'curriculum_id' => Curriculum::getDefaultId(),
        ]);

        try {
            $classroom->save();
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return redirect()->route('dashboard')->with('failure', 'Something went wrong');
        }

        return redirect()->route('dashboard')->with('success', "New classroom created");
    }

    /**
     * Updates individual classroom entry
     * 
     * @param \App\Http\Requests\ClassroomRequest $classroomRequest
     * @param \App\Models\Classroom $classroom
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(ClassroomRequest $classroomRequest, Classroom $classroom)
    {
        $validated = $classroomRequest->validated();

        // $oldClassroom = $classroom->replicate();
        $classroom->fill($validated);

        if ($classroom->isDirty()) {
            $classroom->save();
            $classroom->refresh();
            $schoolOrder = FmLessonOrder::where('email', $classroom->email)->first(['schoolName', 'id']);
            try {
                Mail::to(config('mail.admin.address'))->queue(new ClassroomOrderChanged($schoolOrder->schoolName, $schoolOrder->id));
            } catch (\Exception $e) {
                Log::error("Could not send email for classroom order update", [$e]);
            }
        }

        return redirect()->route('dashboard')->with('success', "Changes have been updated");
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
     * @param \App\Models\Classroom $classroom
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy(Classroom $classroom)
    {
        $schoolOrder = FmLessonOrder::where('email', $classroom->email)->first(['schoolName', 'id']);
        $classroom->delete();
        try {
            Mail::to(config('mail.admin.address'))->queue(new ClassroomOrderChanged($schoolOrder->schoolName, $schoolOrder->id));
        } catch (\Exception $e) {
            Log::error("Could not send email for classroom deletion", [$e]);
        }

        return redirect()->back()->with('success', "Classroom deleted successfully");
    }
}
