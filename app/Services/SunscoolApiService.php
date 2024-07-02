<?php

namespace App\Http\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use stdClass;
use DateTime;

class SunscoolApiService
{
    private $apiKey;
    const BASE_URL = 'https://nocf.sunscool.org/api/pbs';

    public function __construct()
    {
        $this->apiKey = '11ff9ebd9a18e199e1ddba2e79a537d9';
    }
    public function getSchoolsList()
    {
        $baseUrl = self::BASE_URL;
        $path = "{$baseUrl}/schools";
        $promise = Http::async()->withHeaders([
            'Cookie' => 'key=' . $this->apiKey
        ])
            ->withBody('', 'application/json')
            ->get($path);

        $responseJson = json_decode(json_encode($promise->wait()->json()));
        if (isset($responseJson->error_message)) {
            dd($responseJson);
        }
        return $responseJson;
    }

    public function getSchoolDetail($school_id)
    {
        $baseUrl = self::BASE_URL;
        $path = "{$baseUrl}/schools/{$school_id}.json";
        $promise = Http::async()->withHeaders([
            'Cookie' => 'key=' . $this->apiKey
        ])
            ->withBody('', 'application/json')
            ->get($path);

        $responseJson = json_decode(json_encode($promise->wait()->json()));
        if (isset($responseJson->error_message)) {
            dd($responseJson);
        }
        dd($responseJson);
        return $responseJson;
    }
}