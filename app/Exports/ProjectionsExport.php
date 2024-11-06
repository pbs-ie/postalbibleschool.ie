<?php

namespace App\Exports;

use App\Models\FmSchoolDetails;
use App\Services\ClassroomService;
use App\Services\SchoolService;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithHeadings;

class ProjectionsExport implements FromQuery, WithMapping, WithHeadings
{
    use Exportable;

    private string $month;
    public function __construct(string $month)
    {
        $this->month = $month;
    }
    public function headings(): array
    {
        return [
            'School Name',
            'School Type',
        ];
    }
    /**
     * 
     */
    public function query()
    {
        return FmSchoolDetails::queryActiveOrders();
    }
    /**
     * @param FmSchoolDetails $school
     * @return array
     */
    public function map($school): array
    {
        return [
            $school->schoolName,
            $school->schoolType
        ];
    }
    /**
     * @param FmSchoolDetails[] $schools
     * @return array
     */
    public function prepareRows($schools): array
    {
        return (new ClassroomService)->getProjectedOrdersByMonth($schools, $this->month)->toArray();
    }

}
