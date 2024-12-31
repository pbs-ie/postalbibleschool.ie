<?php

namespace App\Exports;

use App\Models\Student;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;

class StudentsExport implements FromCollection, WithHeadings, WithMapping
{
    use Exportable;

    private string $areaCode;

    public function __construct(string $areaCode)
    {
        $this->areaCode = $areaCode;
    }

    private function getStudentLevel($grade)
    {
        $level = filter_var($grade, FILTER_SANITIZE_NUMBER_INT);
        if ($level < 1) {
            return 1;
        }

        return $level;
    }

    public function headings(): array
    {
        return [
            'PBS ID',
            'Student Name',
            'Class',
            'Level',
            'Lessons',
        ];
    }

    /**
     * @param  Student  $student
     */
    public function map($student): array
    {
        $studentLevel = $this->getStudentLevel($student->grade);

        return [
            $student->fm_student_id,
            $student->first_name.' '.substr($student->last_name, 0, 1),
            '',
            $studentLevel,
            '',
        ];
    }

    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        return Student::with('classroom:id,name')->getActiveStudents()->where('area_code', $this->areaCode)->get()->sortBy([
            ['grade', 'asc'],
            ['last_name', 'asc'],
            ['first_name', 'asc'],
        ]);

    }
}
