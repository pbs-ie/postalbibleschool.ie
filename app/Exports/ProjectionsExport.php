<?php

namespace App\Exports;

use App\Models\FmSchool;
use App\Services\ClassroomService;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Illuminate\Contracts\Support\Responsable;

class ProjectionsExport implements FromQuery, WithMapping, WithHeadings, Responsable
{
    use Exportable;

    /**
     * It's required to define the fileName within
     * the export class when making use of Responsable.
     */
    private $fileName;

    private string $month;
    public function __construct(string $month)
    {
        $this->month = $month;
        $this->fileName = 'projections_' . $month . '_' . date('Ymd') . '.xlsx';
    }
    public function headings(): array
    {
        return [
            'School Name',
            'School Code',
            'Digital this month',
            'Level 0',
            'Level 1',
            'Level 2',
            'Level 3',
            'Level 4',
            'TLP',
        ];
    }
    /**
     * 
     */
    public function query()
    {
        return FmSchool::queryActiveOrders();
    }
    /**
     * @param \Illuminate\Support\Collection $school
     * @return array
     */
    public function map($school): array
    {
        return [
            $school->schoolName,
            $school->schoolType,
            $school->hasDigitalClass ? 'Yes' : 'No',
            $school->level_0,
            $school->level_1,
            $school->level_2,
            $school->level_3,
            $school->level_4,
            $school->tlp,
        ];
    }
    /**
     * @param FmSchool[] $schools
     * @return array
     */
    public function prepareRows($schools): array
    {
        return (new ClassroomService)->getProjectedOrdersByMonth($schools, $this->month)->toArray();
    }

}
