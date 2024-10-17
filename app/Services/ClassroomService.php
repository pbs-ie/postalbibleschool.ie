<?php

namespace App\Services;

use App\Models\Classroom;
use App\Models\Curriculum;

class ClassroomService
{
    /**
     * Returns the projected order values of a school for a specified month 
     * 
     * @param \App\Models\FmLessonOrder $orderDetails
     * @param string $month
     * @return mixed
     */
    public function getProjectedOrdersByMonth($orderDetails, $month)
    {
        $allClassrooms = Classroom::where('email', $orderDetails->email)->get();
        $levelSums = (object) [
            "id" => $orderDetails->id,
            "schoolName" => $orderDetails->schoolName,
            "schoolType" => $orderDetails->schoolType,
            "hasDigitalClass" => !$allClassrooms->every('curriculum_id', Curriculum::getDefaultId()),
            "level_0" => 0,
            "level_1" => 0,
            "level_2" => 0,
            "level_3" => 0,
            "level_4" => 0,
            "tlp" => 0,
        ];
        $property = "{$month}_lesson";
        foreach ($allClassrooms as $classroom) {
            $classroomCurriculum = Curriculum::find($classroom->curriculum_id);
            foreach (["level_0", "level_1", "level_2", "level_3", "level_4", "tlp"] as $levelString) {
                if ($classroomCurriculum->$property === Curriculum::PAPER) {
                    $levelSums->$levelString += $classroom->{"{$levelString}_order"};
                }
            }
        }
        return $levelSums;
    }
    /**
     * *Get all projected orders for the year for specified school
     * @param string $schoolEmail
     * @return object[]
     */
    public function getProjectedMonthlyOrders($schoolEmail)
    {
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
            $classroomCurriculum = Curriculum::find($classroom->curriculum_id);
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