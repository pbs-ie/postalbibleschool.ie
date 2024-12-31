<?php

namespace App\Http\Controllers;

use App\Http\Requests\ClassroomRequest;
use App\Mail\ClassroomOrderChanged;
use App\Models\Classroom;
use App\Models\Curriculum;
use App\Models\FmSchool;
use App\Models\Student;
use Gate;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

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
     * @return \Illuminate\Http\Response | \Inertia\Response
     */
    public function show(Classroom $classroom)
    {
        if ($classroom->email !== auth()->user()->email) {
            return Inertia::render('NotFound');
        }
        $allStudents = Student::getActiveStudents()->getStudentsForUser();
        $classroomStudents = $classroom
            ->students()
            ->orderBy('grade')
            ->orderBy('last_name')
            ->orderBy('first_name')
            ->get();

        $curricula = Curriculum::current();
        $classroomCurriculum = $classroom->curriculum()->firstOrFail()
            ->only([
                'name',
                'jan_lesson',
                'feb_lesson',
                'mar_lesson',
                'apr_lesson',
                'may_lesson',
                'jun_lesson',
                'sep_lesson',
                'oct_lesson',
                'nov_lesson',
                'dec_lesson',
            ]);

        return Inertia::render('TeacherHub/Classroom/Show', [
            'classroom' => $classroom,
            'students' => $classroomStudents,
            'allStudents' => $allStudents,
            'curricula' => $curricula,
            'classCurriculum' => $classroomCurriculum,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @return \Illuminate\Http\RedirectResponse | void
     */
    public function store(ClassroomRequest $request)
    {
        if (Gate::allows('create:curriculum')) {
            $schoolEmail = $request->email;
        } else {
            $schoolEmail = auth()->user()->email;
        }

        $classroom = Classroom::where([
            ['email', $schoolEmail],
        ])
            ->whereRaw('LOWER(name) = ?', [strtolower($request->name)])
            ->first();
        if ($classroom) {
            return redirect()->back()->with('warning', 'Classroom already exists');
        }
        $schoolOrder = FmSchool::where('email', $schoolEmail)->first();
        // if (Student::getStudentsForUser()->isEmpty()) {
        if (! isset($schoolOrder)) {
            return redirect()->back()->with('failure', 'No students found for current user');
        }
        $classroom = new Classroom;
        $classroom->fill([
            'name' => strtolower($request->name),
            'email' => $schoolEmail,
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

            return redirect()->back()->with('failure', 'Something went wrong');
        }

        return redirect()->back()->with('success', 'New classroom created');
    }

    /**
     * Updates individual classroom entry
     *
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

            if (Gate::denies('create:curriculum')) {
                $schoolOrder = FmSchool::where('email', $classroom->email)->first(['schoolName', 'id']);
                try {
                    Mail::to(config('mail.admin.address'))->queue(new ClassroomOrderChanged($schoolOrder->schoolName, $schoolOrder->id));
                } catch (\Exception $e) {
                    Log::error('Could not send email for classroom order update', [$e]);
                }
            }
        }

        return redirect()->back()->with('success', 'Changes have been updated');
    }

    /**
     * Add Curriculum Id to Classroom
     *
     * @return \Illuminate\Http\RedirectResponse
     */
    public function curriculumStore(Request $request)
    {
        $classroomId = $request->classroomId;
        $curriculumId = $request->curriculumId;

        $classroom = Classroom::findOrFail($classroomId);
        $classroom->curriculum_id = $curriculumId;
        $classroom->save();

        return redirect()->back()->with('success', 'Curriculum added to classroom');
    }

    /**
     * Remove the classroom from storage.
     *
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy(Classroom $classroom)
    {
        $schoolOrder = FmSchool::where('email', $classroom->email)->first(['schoolName', 'id']);
        $classroom->delete();
        try {
            Mail::to(config('mail.admin.address'))->queue(new ClassroomOrderChanged($schoolOrder->schoolName, $schoolOrder->id));
        } catch (\Exception $e) {
            Log::error('Could not send email for classroom deletion', [$e]);
        }

        return redirect()->back()->with('success', 'Classroom deleted successfully');
    }
}
