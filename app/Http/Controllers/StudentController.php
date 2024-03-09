<?php

namespace App\Http\Controllers;

use App\Http\Requests\ClassroomRequest;
use App\Models\MapEmailAreacode;
use App\Models\Student;
use Illuminate\Http\Request;

class StudentController extends Controller
{
    private function getFmStudentMap()
    {
        return [
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
        $mapEntry = MapEmailAreacode::firstOrCreate(
            ['email' => $email],
            ['area_code' => $areaCode]
        );
    }


    /**
     * Convert Filemaker object to Laravel database friendly array
     * 
     * @param array $studentList
     * @return array
     */
    public function sanitizeStudentList(array $studentList)
    {
        $studentCollection = collect($studentList);
        $mapValues = $this->getFmStudentMap();

        $mappedStudents = $studentCollection->map(function ($student) use ($mapValues) {
            $fieldData = $student->fieldData;
            return array (
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
    public function updateStudents(array $studentList)
    {
        $studentCollection = collect($studentList);
        $studentCollection->each(function ($student) {
            $studentModel = Student::firstWhere('fm_student_id', $student['fm_student_id']);
            if (!$studentModel) {
                $studentModel = new Student();
            }
            $studentModel->fm_student_id = $student['fm_student_id'];
            $studentModel->first_name = $student['first_name'];
            $studentModel->last_name = $student['last_name'];
            $studentModel->area_code = $student['area_code'];
            $studentModel->grade = $student['grade'];
            $studentModel->save();
        });
    }

    /**
     * Get list of students for the current user
     * 
     * @return \Illuminate\Http\RedirectResponse
     */
    public function getAllStudents()
    {
        $studentList = $this->getAllStudentsList();
        if (sizeof($studentList) > 0) {
            return redirect()->back()->with('success', 'Student list updated');
        }
        return redirect()->back()->with('failure', 'Error in retrieving student list');

    }

    /**
     * Get list of students for the current user
     * 
     * @return array
     */
    public function getAllStudentsList()
    {
        $studentList = [];
        if (auth()->check()) {
            $currentUserEmail = auth()->user()->email;
            $studentListFm = (new FilemakerController())->getStudents($currentUserEmail);
            if (sizeof($studentListFm) > 0) {
                $studentList = $this->sanitizeStudentList($studentListFm);

                $this->mapEmailAreaCode($currentUserEmail, $studentList[0]['area_code']);

                $this->updateStudents($studentList);
                return $studentList;
            }
        }
        return [];
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
