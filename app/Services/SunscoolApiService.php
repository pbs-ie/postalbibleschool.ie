<?php

namespace App\Services;

use App\Http\Controllers\FilemakerController;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;

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
        return Cache::remember('sunscoolSchool-' . $schoolId, 0, fn() => (
            $this->getAsync($path)
        ));
    }

    public function getClassDetails($schoolId, $classId)
    {
        $baseUrl = self::BASE_URL;
        $path = "{$baseUrl}/results/schools/{$schoolId}/classes/{$classId}.json";
        return $this->getAsync($path);
    }

    public function flattenClasses($classes)
    {
        return collect($classes)
            ->sortBy(fn($class) => strtolower($class->name))
            ->map(function ($class) {
                // Map students for each class
                $students = collect($class->students)
                    ->filter(fn($student) => (!empty ($student->lessons)));

                $pbsIds = $students->pluck('pbs_id');

                $studentFmMarks = (new FilemakerController())->getStudentsByIds($pbsIds->values()->toArray());

                $sanitizedFmStudents = collect($studentFmMarks)->map(function ($student) {
                    return (new FilemakerService())->sanitizeFmStudentMarks($student);
                });

                $students = $students->flatMap(function ($student) use ($sanitizedFmStudents) {
                    // Get student details
                    $pbsId = $student->pbs_id ?? null;
                    $sunscoolId = $student->id;
                    $studentName = $student->name;
                    $fmData = null;
                    if (isset($pbsId)) {
                        $fmData = $sanitizedFmStudents->firstWhere('fieldData.studentId', $pbsId);
                    }

                    // Iterate through all language keys in lessons
                    $studentLessons = collect($student->lessons)->map(function ($lessons, $language) use ($pbsId, $sunscoolId, $studentName, $fmData) {
                        // Map each lesson with the language parameter
                        $studentDetails = (object) [
                            'pbsId' => $pbsId,
                            'sunscoolId' => $sunscoolId,
                            'name' => $studentName,
                            'language' => $language,
                            'lessons' => collect($lessons)->map(fn($lesson) => (object) [
                                'bibletime' => $lesson->bibletime,
                                'progress' => $lesson->progress,
                                'level' => $lesson->level,
                            ])->values()->toArray(),
                            'fmData' => $fmData
                        ];
                        return $studentDetails;
                    })->values();
                    return $studentLessons;
                });
                // Return the class with its students
                return (object) [
                    'id' => $class->id,
                    'name' => $class->name,
                    'students' => $students->values(),
                ];
            })->values();
    }
}