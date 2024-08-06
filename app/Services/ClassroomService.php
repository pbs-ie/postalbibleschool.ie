<?php

namespace App\Services;

use App\Models\Classroom;
use App\Models\Curriculum;
use Illuminate\Contracts\Database\Eloquent\Builder;

class ClassroomService
{
    public function getProjectedMonthlyOrders($schoolEmail)
    {
        $allCurriculum = Curriculum::get();
        $allClassrooms = Classroom::where('email', $schoolEmail)->get();
        $allSums = [
            "level_0",
            "level_1",
            "level_2",
            "level_3",
            "level_4",
            "tlp",
        ];
        $orderObject = [];

        foreach ($allClassrooms as $classroom) {
            $classroomCurriculum = $allCurriculum->find($classroom->curriculum_id);
            foreach ($allSums as $index => $levelString) {
                if (!isset($orderObject[$index])) {
                    $orderObject[] = (object) [
                        "jan_lesson" => 0,
                        "feb_lesson" => 0,
                        "mar_lesson" => 0,
                        "apr_lesson" => 0,
                        "may_lesson" => 0,
                        "jun_lesson" => 0,
                        "sep_lesson" => 0,
                        "oct_lesson" => 0,
                        "nov_lesson" => 0,
                        "dec_lesson" => 0,
                        "level" => $levelString
                    ];
                }

                foreach (['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'sep', 'oct', 'nov', 'dec'] as $month) {
                    $property = "{$month}_lesson";
                    if ($classroomCurriculum->$property === Curriculum::PAPER) {
                        $orderObject[$index]->$property += $classroom->{"{$levelString}_order"};
                    }
                }
            }
        }

        return $orderObject;
    }
}