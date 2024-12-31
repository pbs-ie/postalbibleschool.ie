<?php

namespace App\Exports;

use App\Services\SunscoolApiService;
use Illuminate\Contracts\Support\Responsable;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithStrictNullComparison;

class SunscoolClassroomExport implements FromCollection, Responsable, WithHeadings, WithMapping, WithStrictNullComparison
{
    use Exportable;

    /**
     * It's required to define the fileName within
     * the export class when making use of Responsable.
     */
    private $fileName;

    private $schoolId;

    private $classroomId;

    public function __construct($schoolId, $classroomId)
    {
        $this->schoolId = $schoolId;
        $this->classroomId = $classroomId;
        $this->fileName = 'classroom-'.$schoolId.'-'.$classroomId.'.xlsx';
    }

    public function headings(): array
    {
        return [
            'pbsId',
            'name',
            'language',
            'bibletime',
            'progress',
            'level',
            'isProcessed',
        ];
    }

    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        $classroom = (new SunscoolApiService)->getClassroomDetails($this->schoolId, $this->classroomId);
        $sunscoolClassroom = SunscoolApiService::flattenClassroom($classroom);

        return $sunscoolClassroom->students;
    }

    public function map($students): array
    {
        return [
            $students->pbsId,
            $students->name,
            $students->language,
            $students->bibletime,
            $students->progress,
            $students->level,
            $students->isProcessed,
        ];
    }
}
