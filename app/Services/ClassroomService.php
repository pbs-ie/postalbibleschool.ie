<?php

namespace App\Services;

use App\Models\Classroom;
use App\Models\Curriculum;

class ClassroomService
{
    /**
     * Returns the projected order values of a school for a specified month
     *
     * @param  \App\Models\FmSchool[]|\Illuminate\Database\Eloquent\Collection  $schoolDetails
     * @param  string  $month
     * @return \Illuminate\Support\Collection
     */
    public function getProjectedOrdersByMonth($schoolDetails, $month)
    {
        $emails = $schoolDetails->pluck('email');
        $defaultCurriculumId = Curriculum::getDefaultId();

        // Fetch all classrooms with curricula for the emails in one go
        $classrooms = Classroom::with('curriculum')
            ->whereIn('email', $emails)
            ->get()
            ->groupBy('email'); // Group classrooms by email

        return $schoolDetails->map(function ($orderDetails, $key) use ($month, $classrooms) {
            $emailClassrooms = $classrooms->get($orderDetails->email, collect()); // Get classrooms for the current email
            $property = "{$month}_lesson";

            $levelSums = (object) [
                'id' => $orderDetails->id,
                'schoolName' => $orderDetails->schoolName,
                'schoolType' => $orderDetails->schoolType,
                'hasDigitalClass' => $emailClassrooms->contains(function ($classroom) use ($property) {
                    return $classroom->curriculum->$property !== Curriculum::PAPER;
                }),
                'level_0' => 0,
                'level_1' => 0,
                'level_2' => 0,
                'level_3' => 0,
                'level_4' => 0,
                'tlp' => 0,
                'month' => $month,
            ];
            foreach ($emailClassrooms as $classroom) {
                // $classroomCurriculum = Curriculum::find($classroom->curriculum_id);
                if ($classroom->curriculum->$property === Curriculum::PAPER) {
                    foreach (['level_0', 'level_1', 'level_2', 'level_3', 'level_4', 'tlp'] as $levelString) {
                        $levelSums->$levelString += $classroom->{"{$levelString}_order"};
                    }
                }
            }

            return $levelSums;
        });
    }

    /**
     * *Get all projected orders for the year for specified school
     *
     * @param  string  $schoolEmail
     * @return object[]
     */
    public function getProjectedMonthlyOrders($schoolEmail)
    {
        $allClassrooms = Classroom::with('curriculum')->where('email', $schoolEmail)->get();
        $allSums = [
            'level_0',
            'level_1',
            'level_2',
            'level_3',
            'level_4',
            'tlp',
        ];
        $months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'sep', 'oct', 'nov', 'dec'];

        // Initialize orderObject for all levels
        $orderObject = array_map(function ($levelString) use ($months) {
            $initialData = array_fill_keys(array_map(function ($month) {
                return "{$month}_lesson";
            }, $months), 0); // Set all lessons to 0

            return (object) array_merge($initialData, ['level' => $levelString]);
        }, $allSums);

        foreach ($allClassrooms as $classroom) {
            foreach ($months as $month) {
                $property = "{$month}_lesson";
                if ($classroom->curriculum->$property === Curriculum::PAPER) {
                    foreach ($allSums as $index => $levelString) {
                        $orderObject[$index]->$property += $classroom->{"{$levelString}_order"};
                    }
                }
            }
        }

        return $orderObject;
    }
}
