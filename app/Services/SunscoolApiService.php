<?php

namespace App\Services;

use App\Http\Controllers\FilemakerController;
use App\Models\SunscoolMap;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Arr;

class SunscoolApiService
{
    private $apiKey;
    const BASE_URL = 'https://nocf.sunscool.org/api/pbs';

    public function __construct()
    {
        $this->apiKey = '11ff9ebd9a18e199e1ddba2e79a537d9';
    }

    private function getAsync($path)
    {
        $promise = Http::async()->withHeaders([
            'Cookie' => 'key=' . $this->apiKey
        ])
            ->withBody('', 'application/json')
            ->get($path);

        $responseJson = json_decode(json_encode($promise->wait()->json()));
        if (isset($responseJson->error_message) || isset($responseJson->error)) {
            dd($responseJson);
        }
        return $responseJson;
    }
    public function getSchoolsList()
    {
        $baseUrl = self::BASE_URL;
        $path = "{$baseUrl}/schools";
        return Cache::remember('sunscoolSchoolList', 3600, fn() => (
            $this->getAsync($path)
        ));
    }

    public function getSchoolDetail($schoolId)
    {
        $baseUrl = self::BASE_URL;
        $path = "{$baseUrl}/results/schools/{$schoolId}.json";
        return Cache::remember('sunscoolSchool-' . $schoolId, 3600, fn() => (
            $this->getAsync($path)
        ));
    }

    public function getClassroomDetails($schoolId, $classId)
    {
        $baseUrl = self::BASE_URL;
        $path = "{$baseUrl}/results/schools/{$schoolId}/classes/{$classId}.json";
        return Cache::remember('sunscoolClass-' . $schoolId . '-' . $classId, 3600, fn() => (
            $this->getAsync($path)
        ));
    }

    public static function flattenClassroom($classroom)
    {
        // Map students for each class
        $students = collect($classroom->students)
            ->filter(fn($student) => (!empty ($student->lessons)));

        $students = $students->flatMap(function ($student) {
            // Get student details
            $pbsId = $student->pbs_id ?? null;
            $sunscoolId = $student->id;
            $studentName = $student->name;

            // Iterate through all language keys in lessons
            $studentLessons = collect($student->lessons)->flatMap(function ($lessons, $language) use ($pbsId, $sunscoolId, $studentName) {
                // Map each lesson with the language parameter
                return collect($lessons)->map(function ($lesson) use ($pbsId, $sunscoolId, $studentName, $language) {
                    // Get processed status of lesson
                    $mapStudent = SunscoolMap::where('fm_student_id', $pbsId)
                        ->where('level', $lesson->level)
                        ->where('bibletime', $lesson->bibletime)
                        ->first(SunscoolMap::columnsAsCamel);

                    return (object) [
                        'pbsId' => $pbsId,
                        'sunscoolId' => $sunscoolId,
                        'name' => $studentName,
                        'language' => $language,
                        'bibletime' => $lesson->bibletime,
                        'progress' => $lesson->progress,
                        'level' => $lesson->level,
                        'isProcessed' => is_null($mapStudent) ? false : (boolean) $mapStudent->isProcessed
                    ];
                })->sortBy([['name', 'asc'], ['bibletime', 'asc', SORT_NATURAL]]);
            })->values();
            return $studentLessons;
        });
        // Return the class with its students
        return (object) [
            'id' => $classroom->id,
            'name' => $classroom->name,
            'students' => $students->values(),
        ];

    }


    public static function populateStudentsFmData($students)
    {
        $pbsIds = collect($students)->pluck('pbsId')->unique();
        $studentFmMarks = (new FilemakerController())->getStudentsByIds($pbsIds->values()->toArray());
        $sanitizedFmStudents = collect($studentFmMarks)->map(function ($student) {
            return (new FilemakerService())->sanitizeFmStudentMarks($student);
        });

        $grouped = collect($students)->groupBy(function ($item) {
            return $item['name'] . '|' . $item['level'] . '|' . explode('-', $item['bibletime'])[0];
        });

        // Reduce to averaged `progress`
        $reduced = $grouped->map(function ($group) {
            // Take the first item to preserve shared data
            $firstItem = $group->first();

            // Map to extract bibletime => progress pairs
            $bibletimeProgress = $group->map(function ($item) {
                return [
                    'bibletime' => $item['bibletime'],
                    'progress' => $item['progress'] / 5
                ];
            })->toArray();

            array_push($bibletimeProgress, ["bibletime" => "Bonus", "progress" => "20"]);

            // Extract progress values
            $progressValues = collect($bibletimeProgress)->pluck('progress');

            // Calculate the average
            $processedProgress = $progressValues->sum();

            $processedBibletime = explode('-', $firstItem['bibletime'])[0];

            return array_merge(
                Arr::except($firstItem, ['bibletime']),
                [
                    'processedProgress' => round($processedProgress),
                    'processedBibletime' => $processedBibletime,
                    "bibletimeProgress" => $bibletimeProgress,
                    "processedBibletimeProgress" => SunscoolMap::where('fm_student_id', $firstItem["pbsId"])
                        ->where('level', $firstItem["level"])
                        ->where('is_processed', true)
                        ->whereRaw("bibletime LIKE ?", [$processedBibletime . '%'])
                        ->get(['bibletime', 'progress'])->toArray()
                ]
            );
        })->values()->toArray();


        $studentsWithFmData = collect($reduced)->map(function ($student) use ($sanitizedFmStudents) {
            // Get student details
            // $pbsId = $student->pbsId ?? null;
            // $sunscoolId = $student->sunscoolId;
            // $studentName = $student->name;
            $fmData = null;
            if (isset($student["pbsId"])) {
                $fmData = $sanitizedFmStudents->firstWhere('fieldData.studentId', $student["pbsId"]);
            };
            $student["fmData"] = $fmData;
            return $student;
        });


        return $studentsWithFmData->values();
    }

    public static function uploadStudentGrades($students)
    {
        $fmController = new FilemakerController();

        $requestStudents = collect($students);
        $pbsIds = $requestStudents->pluck('pbsId');

        // Fetch students info from filemaker
        $fmStudents = ($fmController)->getStudentsByIds($pbsIds->values()->toArray());

        // Process each filemaker student
        foreach ($fmStudents as $fmStudent) {
            $currentStudentId = (string) $fmStudent->fieldData->{"StudentID"};

            //Match month to updated month coming in $request and fill in new value
            $requestStudent = $requestStudents->firstWhere('pbsId', $currentStudentId);
            if (!$requestStudent) {
                continue; // Skip if no matching student is found
            }

            preg_match('/\d+/', $requestStudent["selectedMonth"], $monthMatch);

            $currentPortal = collect($fmStudent->portalData->Years)->firstWhere('Years::Year Description', $requestStudent["selectedYear"]);
            if (!$currentPortal) {
                continue; // Skip if no matching portal data is found
            }

            // Prepare updated portal data
            $updatedPortal = (object) [
                'recordId' => $currentPortal->recordId,
                'modId' => $currentPortal->modId,
                'Years::Month ' . $monthMatch[0] => $requestStudent['finalGrade'],
                'Years::Source ' . $monthMatch[0] => 'digital',
            ];

            // Prepare modification object
            $modObject = (object) [
                'fieldData' => $fmStudent->fieldData,
                'portalData' => (object) ['Years' => [$updatedPortal]],
                'options' => (object) [
                    'entrymode' => 'script',
                    'prohibitmode' => 'script',
                ],
            ];

            $updatedFmStudents = $fmController->updateStudentMarks($fmStudent->recordId, $modObject);

            if (!$updatedFmStudents) {
                throw new \Exception("Error Processing Request", 1);

            }

            // Update map with bibletimes and student id
            foreach ($requestStudent["bibletimeProgress"] as $item) {
                if (strtolower($item["bibletime"]) === "bonus") {
                    continue;
                }
                SunscoolMap::updateOrCreate(
                    [
                        'fm_student_id' => $currentStudentId,
                        'bibletime' => $item["bibletime"],
                        "level" => $requestStudent["level"]
                    ],
                    [
                        'fm_grade_record_id' => $currentPortal->recordId,
                        'is_processed' => true,
                        'progress' => $item["progress"]
                    ]
                );

            }

        }

        return true;
    }


}