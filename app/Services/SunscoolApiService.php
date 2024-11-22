<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
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
}