<?php

namespace App\Services;

use App\Http\Controllers\FilemakerController;
use App\Models\Student;

class StudentService
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
            'active' => 'Active',
        ];
    }

    /**
     * Convert Filemaker object to Laravel database friendly array
     *
     * @return array
     */
    private function sanitizeStudentsFromList(array $studentList)
    {
        $studentCollection = collect($studentList);
        $mapValues = $this->getFmStudentMap();

        $mappedStudents = $studentCollection->map(function ($student) use ($mapValues) {
            $fieldData = $student->fieldData;

            return [
                'fm_record_id' => trim($student->{$mapValues['fm_record_id']}),
                'fm_student_id' => trim($fieldData->{$mapValues['fm_student_id']}),
                'first_name' => trim($fieldData->{$mapValues['first_name']}),
                'last_name' => trim($fieldData->{$mapValues['last_name']}),
                'area_code' => trim($fieldData->{$mapValues['area_code']}),
                'grade' => trim($fieldData->{$mapValues['grade']}),
                'active' => trim($fieldData->{$mapValues['active']}),
            ];
        })->toArray();

        return $mappedStudents;
    }

    /**
     * Update students in local database
     *
     * @return void
     */
    private function updateStudentsFromList(array $studentList)
    {
        $studentCollection = collect($studentList);
        $studentCollection->each(function ($student) {
            $studentModel = Student::firstWhere('fm_student_id', $student['fm_student_id']);
            if (! $studentModel) {
                $studentModel = new Student;
            }
            $studentModel->fm_record_id = $student['fm_record_id'];
            $studentModel->fm_student_id = $student['fm_student_id'];
            $studentModel->first_name = $student['first_name'];
            $studentModel->last_name = $student['last_name'];
            $studentModel->area_code = $student['area_code'];
            $studentModel->grade = $student['grade'];
            $studentModel->active = $student['active'];
            $studentModel->save();
        });
    }

    /**
     * Store Student list in Database from FileMaker for user
     *
     * @param  string  $userEmail
     * @return void
     */
    public function storeStudentsForUser($userEmail)
    {
        $studentListFm = (new FilemakerController)->getStudentsByUser($userEmail);
        if (count($studentListFm) === 0) {
            throw new \Exception('No students found for user : '.$userEmail);
        }
        $studentList = $this->sanitizeStudentsFromList($studentListFm);

        $this->updateStudentsFromList($studentList);
    }
}
