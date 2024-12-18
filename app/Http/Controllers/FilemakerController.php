<?php

namespace App\Http\Controllers;

use Aws\CognitoIdentityProvider\CognitoIdentityProviderClient;
use Aws\CognitoIdentityProvider\Exception\CognitoIdentityProviderException;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use stdClass;
use DateTime;

session_set_cookie_params(3600, "/");
session_start();

class FilemakerController extends Controller
{
    private $client;
    private $clientId;
    private $poolId;

    private $fmHost;
    private $fmUser;
    private $fmPassword;
    private $fmVersion;
    private $fmDatabase;

    private $refreshToken;

    const MONTHLY_ORDER_LAYOUT = 'Monthly Order Report API';
    const STUDENT_LIST_LAYOUT = 'Student Record API';
    const STUDENT_MARK_LAYOUT = 'Student Marks API';
    const CURRICULUM_LAYOUT = 'Curriculum API';
    const PROJECTED_ORDER_LAYOUT = 'Projected Order Report';

    public function __construct()
    {
        $cognitoRegion = config('filemaker.cognitoRegion');

        $this->fmHost = config('filemaker.host');
        $this->fmUser = config('filemaker.user');
        $this->fmPassword = config('filemaker.password');
        $this->fmVersion = config('filemaker.version');
        $this->fmDatabase = config('filemaker.database');

    }
    private function getBearerToken()
    {
        try {
            if (!$this->fmUser || !$this->fmPassword) {
                return null;
            }
            // Time set based on this document https://supergeekery.com/blog/learning-the-filemaker-data-api-by-trial-and-error#:~:text=Timing%20out%20of%20tokens%20%23&text=The%20Javascript%20app%20user%20sessions,last%20use%20of%20the%20token.
            if (
                isset($_SESSION["fmidToken"]) && isset($_SESSION["tokenGeneratedTime"]) &&
                $_SESSION["tokenGeneratedTime"]->diff(new DateTime())->format('%i') < 15
            ) {
                return $_SESSION["fmidToken"];
            }
            $credentials = new \MSDev\FMCloudAuthenticator\Credentials(
                $this->fmHost,
                $this->fmUser,
                $this->fmPassword,
                \MSDev\FMCloudAuthenticator\Credentials::DAPI,
                $this->fmDatabase
            );
            $authenticator = new \MSDev\FMCloudAuthenticator\Authenticate();
            $_SESSION["tokenGeneratedTime"] = new DateTime();
            $_SESSION["fmidToken"] = $authenticator->fetchToken($credentials);
            return $_SESSION["fmidToken"];
        } catch (CognitoIdentityProviderException $e) {
            Log::error($e);
        }
    }

    /** 
     * Validate session of the current token
     * 
     * @return string
     */
    private function validateSession($token)
    {
        $path = "{$this->fmHost}/fmi/data/{$this->fmVersion}/validateSession";
        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . $token
        ])
            ->withBody('', 'application/json')
            ->get($path);

        if ($response->getStatusCode() === 200 && $response->getReasonPhrase() === "OK") {
            return $token;
        } else {
            dd($response->json());
        }
    }

    private function getMonthlyOrderRecords()
    {
        $formattedLayout = rawurlencode(self::MONTHLY_ORDER_LAYOUT);
        $path = "{$this->fmHost}/fmi/data/{$this->fmVersion}/databases/{$this->fmDatabase}/layouts/{$formattedLayout}/records";
        $queryData = [
            '_limit' => 100,
            'script' => 'dapi_monthly_order'
        ];
        $query = http_build_query($queryData);
        $token = $this->getBearerToken();
        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . $token
        ])
            ->withBody('', 'application/json')
            ->get($path . '?' . $query);

        $responseData = json_decode(json_encode($response->json()))->response->data;
        return $responseData;

    }

    /**
     * Get list of students for current user from Filemaker
     * 
     * @param string $email
     * @return array
     */
    private function getStudentsForAreaRecords(string $email)
    {
        $formattedLayout = rawurlencode(self::STUDENT_LIST_LAYOUT);
        $path = "{$this->fmHost}/fmi/data/{$this->fmVersion}/databases/{$this->fmDatabase}/layouts/{$formattedLayout}/records";
        $queryData = [
            '_limit' => 1000,
            'script' => 'dapi_student_record',
            'script.param' => $email
        ];
        $query = http_build_query($queryData);
        $token = $this->getBearerToken();
        $promise = Http::async()->withHeaders([
            'Authorization' => 'Bearer ' . $token
        ])
            ->withBody('', 'application/json')
            ->get($path . '?' . $query);

        $responseJson = json_decode(json_encode($promise->wait()->json()));
        if (isset($responseJson->messages) || $responseJson->messages[0]->message !== "OK") {
            Log::error($responseJson->messages[0]->message);
        }
        $responseData = $responseJson->response->data;
        return $responseData;

    }

    /**
     * Get list of student grades for current user from Filemaker
     * 
     * @param array $studentIds
     * @return object
     */
    private function getStudentsMarkByIds($studentIds)
    {
        $formattedLayout = rawurlencode(self::STUDENT_MARK_LAYOUT);
        $path = "{$this->fmHost}/fmi/data/{$this->fmVersion}/databases/{$this->fmDatabase}/layouts/{$formattedLayout}/records";
        $queryData = [
            '_limit' => 1000,
            'script' => 'dapi_student_marks_record',
            'script.param' => json_encode($studentIds)
        ];
        $query = http_build_query($queryData);
        $token = $this->getBearerToken();
        $promise = Http::async()->withHeaders([
            'Authorization' => 'Bearer ' . $token
        ])
            ->withBody('', 'application/json')
            ->get($path . '?' . $query);

        $responseJson = json_decode(json_encode($promise->wait()->json()));
        if (isset($responseJson->messages) && $responseJson->messages[0]->message !== "OK") {
            Log::error($responseJson->messages[0]->message);
        }
        $responseData = $responseJson->response->data;
        return $responseData;

    }

    /**
     * Run a script on Filemaker
     * @param string $layoutName
     * @param string $scriptName
     * @param string $scriptParam
     * @return boolean
     */
    private function runScript($layoutName, $scriptName, $scriptParam = "")
    {
        $formattedLayout = rawurlencode($layoutName);
        $formattedScript = rawurlencode($scriptName);
        $path = "{$this->fmHost}/fmi/data/{$this->fmVersion}/databases/{$this->fmDatabase}/layouts/{$formattedLayout}/script/{$formattedScript}";

        $queryData = [
            'script.param' => $scriptParam
        ];
        $query = http_build_query($queryData);

        $token = $this->getBearerToken();
        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . $token
        ])
            ->withBody('', 'application/json')
            ->get($path . '?' . $query);

        if (!$response->ok()) {
            dd($response->json());
        }
        return $response->ok();
    }

    /**
     * Create a record in the specified layouts
     * @param string $layoutName
     * @param mixed $recordData
     * @return string
     */
    private function createRecord(string $layoutName, $recordData)
    {
        $formattedLayout = rawurlencode($layoutName);
        $path = "{$this->fmHost}/fmi/data/{$this->fmVersion}/databases/{$this->fmDatabase}/layouts/{$formattedLayout}/records";

        $token = $this->getBearerToken();
        $body = new stdClass();
        $body->fieldData = $recordData;
        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . $token
        ])
            ->withBody(json_encode($body), 'application/json')
            ->post($path);

        if ($response->ok()) {
            $responseData = json_decode(json_encode($response->json()))->response;
            return $responseData->recordId;
        } else {
            Log::error($response->json());
            return "";
        }
    }

    /**
     * Update filemaker record by its record ID
     * 
     * @param string $layoutName
     * @param int $recordId
     * @param mixed $changedRecord
     * @return bool
     */
    private function updateRecordById(string $layoutName, int $recordId, $changedRecord)
    {
        $formattedLayout = rawurlencode($layoutName);
        $path = "{$this->fmHost}/fmi/data/{$this->fmVersion}/databases/{$this->fmDatabase}/layouts/{$formattedLayout}/records/{$recordId}";

        $token = $this->getBearerToken();
        $body = new stdClass();
        $body->fieldData = $changedRecord;
        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . $token
        ])
            ->withBody(json_encode($body), 'application/json')
            ->patch($path);

        $responseData = json_decode(json_encode($response->json()))->response;
        dd($response->json());
        return $response->ok();
    }

    /**
     * Update filemaker record by its record ID
     * 
     * @param string $layoutName
     * @param int $recordId
     * @param mixed $changedRecord
     * @return bool
     */
    private function updateRecordByIdFullBody(string $layoutName, int $recordId, $changedRecord)
    {
        $formattedLayout = rawurlencode($layoutName);
        $path = "{$this->fmHost}/fmi/data/{$this->fmVersion}/databases/{$this->fmDatabase}/layouts/{$formattedLayout}/records/{$recordId}";

        $token = $this->getBearerToken();
        $body = new stdClass();
        $body = $changedRecord;
        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . $token
        ])
            ->withBody(json_encode($body), 'application/json')
            ->patch($path);

        $responseData = json_decode(json_encode($response->json()))->response;
        return $response->ok();
    }

    // Public Functions

    public function getLessonOrders()
    {
        return $this->getMonthlyOrderRecords();
    }

    /**
     * Update a record for lesson order
     * 
     * @param int $recordId
     * @param mixed $changedRecord
     * @return boolean
     */
    public function updateLessonOrders(int $recordId, $changedRecord)
    {
        return $this->updateRecordById(self::MONTHLY_ORDER_LAYOUT, $recordId, $changedRecord);
    }

    public function updateStudentMarks(int $recordId, $changedRecord)
    {
        return $this->updateRecordByIdFullBody(self::STUDENT_MARK_LAYOUT, $recordId, $changedRecord);
    }

    /**
     * Get list of students for current user from Filemaker
     * 
     * @param string $email
     * @return array
     */
    public function getStudentsByUser(string $email)
    {
        return $this->getStudentsForAreaRecords($email);
    }

    /**
     * Create a new record for Curriculum table
     * 
     * @param mixed $newRecord
     * @return string
     */
    public function createCurriculum($newRecord)
    {
        return $this->createRecord(self::CURRICULUM_LAYOUT, $newRecord);
    }

    /**
     * Function to clear all records in the projected orders table
     * @return void
     */
    public function clearProjectedOrdersTable()
    {
        $this->runScript(self::PROJECTED_ORDER_LAYOUT, 'dapi_reset_projected_orders');
    }

    /**
     * Create a new record for Projected Orders table
     * 
     * @param mixed $newRecord
     * @return string
     */
    public function createProjectedOrderRecord($newRecord)
    {
        return $this->createRecord(self::PROJECTED_ORDER_LAYOUT, $newRecord);
    }

    private function setGlobalField($table, $field, $value)
    {
        $path = "{$this->fmHost}/fmi/data/{$this->fmVersion}/databases/{$this->fmDatabase}/globals";

        $token = $this->getBearerToken();
        $body = new stdClass();
        $body->globalFields = [$table . '::' . $field => $value];
        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . $token
        ])
            ->withBody(json_encode($body), 'application/json')
            ->patch($path);

        if ($response->ok()) {
            $responseData = json_decode(json_encode($response->json()))->messages;
            return $responseData;
        } else {
            Log::error($response->json());
            return "";
        }
    }

    /**
     * Get an individual students marks records from Filemaker
     * @param array $studentIds
     * @return object
     */
    public function getStudentsByIds($studentIds)
    {
        return $this->getStudentsMarkByIds($studentIds);
    }


}
