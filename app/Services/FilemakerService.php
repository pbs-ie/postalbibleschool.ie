<?php

namespace App\Services;

use App\Http\Controllers\FilemakerController;
use Illuminate\Support\Str;


class FilemakerService
{

    private $fieldMap = [
        'StudentID' => 'studentId',
        'C Name' => 'firstName',
        'S Name' => 'lastName',
        'Area' => 'areaCode',
        'Grade' => 'grade',
        'Active' => 'active',
    ];

    private $portalMap = [
        "Years::Year Description" => "yearDescription",
        "Years::Month 1" => "month1",
        "Years::Month 2" => "month2",
        "Years::Month 3" => "month3",
        "Years::Month 4" => "month4",
        "Years::Month 5" => "month5",
        "Years::Month 6" => "month6",
        "Years::Month 7" => "month7",
        "Years::Month 8" => "month8",
        "Years::Month 9" => "month9",
        "Years::Month 10" => "month10",
        "Years::Month 11" => "month11",
        "Years::Month 12" => "month12",
        "Years::Year Percentage" => "yearPercentage",
        "Years::Year Prize" => "yearPrize",
        "Years::Month Name 1" => "monthName1",
        "Years::Month Name 2" => "monthName2",
        "Years::Month Name 3" => "monthName3",
        "Years::Month Name 4" => "monthName4",
        "Years::Month Name 5" => "monthName5",
        "Years::Month Name 6" => "monthName6",
        "Years::Month Name 7" => "monthName7",
        "Years::Month Name 8" => "monthName8",
        "Years::Month Name 9" => "monthName9",
        "Years::Month Name 10" => "monthName10",
        "Years::Month Name 11" => "monthName11",
        "Years::Month Name 12" => "monthName12",
        "Years::Grade" => "grade",
        "Years::Year Format" => "yearFormat",
        "Years::Source 1" => "source1",
        "Years::Source 2" => "source2",
        "Years::Source 3" => "source3",
        "Years::Source 4" => "source4",
        "Years::Source 5" => "source5",
        "Years::Source 6" => "source6",
        "Years::Source 7" => "source7",
        "Years::Source 8" => "source8",
        "Years::Source 9" => "source9",
        "Years::Source 10" => "source10",
        "Years::Source 11" => "source11",
        "Years::Source 12" => "source12",
    ];

    public static function mapKeys(object|array $input, array $mapArray): object
    {
        $result = new \stdClass();

        // Convert input to an object if it is an array
        $input = is_array($input) ? (object) $input : $input;

        foreach ($input as $key => $value) {
            // Map only if the key exists in the portal map
            if (array_key_exists($key, $mapArray)) {
                $friendlyKey = $mapArray[$key];

                // Recursively map keys for nested objects or arrays
                if (is_array($value) || is_object($value)) {
                    $result->{$friendlyKey} = self::mapKeys($value, $mapArray);
                } else {
                    $result->{$friendlyKey} = $value;
                }
            }
        }

        return $result;
    }

    public static function reverseMapKeys(object $input, array $portalMap): object
    {
        $reverseMap = array_flip($portalMap); // Reverse the mapping array
        return self::mapKeys($input, $reverseMap);
    }

    private static function getMonthNames(object $object)
    {
        $monthNames = [];

        foreach ($object as $key => $value) {
            if (Str::startsWith($key, 'monthName')) {
                $monthNames[$key] = $value;
            }
        }
        return $monthNames;
    }

    public function sanitizeFmStudentMarks($studentRecord)
    {

        $camelCaseFieldData = self::mapKeys($studentRecord->fieldData, $this->fieldMap);

        $portalRecords = collect($studentRecord->portalData->Years);
        $portalRecords->transform(function ($record) {
            return self::mapKeys($record, $this->portalMap);
        });

        $monthNames = self::getMonthNames($portalRecords->first() ?? (object) []);

        return (object) [
            "recordId" => $studentRecord->recordId,
            "fieldData" => $camelCaseFieldData,
            "portalData" => $portalRecords->toArray(),
            "monthNames" => $monthNames
        ];
    }


    public function getFmStudentMarks($studentId)
    {
        $marks = (new FilemakerController())->getStudentsByIds($studentId);

        return $this->sanitizeFmStudentMarks($marks[0]);
    }


}