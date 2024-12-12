<?php

namespace App\Exports;

use App\Services\SunscoolApiService;
use Illuminate\Contracts\Support\Responsable;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithStrictNullComparison;

class SunscoolNamesExport implements FromCollection, WithHeadings, WithStrictNullComparison, WithMapping, ShouldAutoSize, Responsable
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
        $this->fileName = 'Students_List-' . $schoolId . '-' . $classroomId . '.xlsx';
    }

    public function headings(): array
    {
        return [
            "pbsId",
            "Filemaker name",
            "Sunscool name",
        ];
    }

    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        $classroom = (new SunscoolApiService())->getClassroomDetails($this->schoolId, $this->classroomId);
        $sunscoolClassroom = SunscoolApiService::flattenClassroom($classroom);

        $studentsWithFmData = SunscoolApiService::appendFmData($sunscoolClassroom->students->filter(fn($student) => isset ($student->pbsId))->toArray());

        return $studentsWithFmData
            ->filter(fn($student) => isset ($student->pbsId))
            ->unique(function ($student) {
                return $student->pbsId . ' ' . $student->sunscoolId;
            })
            ->values();
    }

    /**
     * @param $students
     */
    public function map($students): array
    {
        if (!isset($students->pbsId))
            return [];

        return [
            $students->pbsId,
            $students->fmData->fieldData->firstName . ' ' . $students->fmData->fieldData->lastName,
            $students->name,
        ];
    }
}
