<?php

namespace App\Http\Controllers;

use App\Models\MapEmailAreacode;
use App\Models\Student;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;

class StudentController extends Controller
{
    private function getFmStudentMap()
    {
        return [
            'fm_record_id' => 'recordId',
            'fm_student_id' => 'StudentID',
            'first_name' => 'C Name',
            'last_name' => 'S Name',
            'area_code' => 'Area',
            'grade' => 'Grade',
        ];
    }

    /**
     * Create a map between user email and area code
     * 
     * @param string $email
     * @param string $areaCode
     */
    private function mapEmailAreaCode(string $email, string $areaCode)
    {
        $areaEntry = MapEmailAreacode::where('area_code', $areaCode)->first();
        if ($areaEntry) {
            MapEmailAreacode::where('area_code', $areaCode)->update(['email' => $email]);
        } else {
            MapEmailAreacode::firstOrCreate(
                ['email' => $email],
                ['area_code' => $areaCode]
            );
        }
    }


    /**
     * Convert Filemaker object to Laravel database friendly array
     * 
     * @param array $studentList
     * @return array
     */
    private function sanitizeStudentList(array $studentList)
    {
        $studentCollection = collect($studentList);
        $mapValues = $this->getFmStudentMap();

        $mappedStudents = $studentCollection->map(function ($student) use ($mapValues) {
            $fieldData = $student->fieldData;
            return array (
                'fm_record_id' => trim($student->{$mapValues['fm_record_id']}),
                'fm_student_id' => trim($fieldData->{$mapValues['fm_student_id']}),
                'first_name' => trim($fieldData->{$mapValues['first_name']}),
                'last_name' => trim($fieldData->{$mapValues['last_name']}),
                'area_code' => trim($fieldData->{$mapValues['area_code']}),
                'grade' => trim($fieldData->{$mapValues['grade']})
            );
        })->toArray();
        return $mappedStudents;
    }

    /**
     * Update students in local database
     * 
     * @param array $studentList
     * @return void 
     */
    private function updateStudents(array $studentList)
    {
        $studentCollection = collect($studentList);
        $studentCollection->each(function ($student) {
            $studentModel = Student::firstWhere('fm_student_id', $student['fm_student_id']);
            if (!$studentModel) {
                $studentModel = new Student();
            }
            $studentModel->fm_record_id = $student['fm_record_id'];
            $studentModel->fm_student_id = $student['fm_student_id'];
            $studentModel->first_name = $student['first_name'];
            $studentModel->last_name = $student['last_name'];
            $studentModel->area_code = $student['area_code'];
            $studentModel->grade = $student['grade'];
            $studentModel->save();
        });
    }

    public function index()
    {
        return Inertia::render("TeacherHub/Student/Index", [
            'students' => Student::with('classroom:id,name')->getStudentsForUser(),
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
        $studentList = Student::getStudentsForUser();
        if ($studentList->isEmpty()) {
            return redirect()->back()->with('failure', 'No students found');
        }
        return redirect()->back()->with('success', 'Student list updated');
    }

    /**
     * Store Student list in Database from FileMaker for user
     * 
     * @param string $userEmail
     * @return void
     */
    public function storeStudentsListForUser($userEmail)
    {
        $studentListFm = (new FilemakerController())->getStudentsByUser($userEmail);
        if (sizeof($studentListFm) === 0) {
            throw new \Exception("No students found for user : " . $userEmail);
        }
        $studentList = $this->sanitizeStudentList($studentListFm);

        $this->mapEmailAreaCode($userEmail, $studentList[0]['area_code']);

        $this->updateStudents($studentList);
    }


    /**
     * Add students to the classroom
     * 
     * @param  \Illuminate\Http\Request  $request
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
     * @param  \Illuminate\Http\Request  $request
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
