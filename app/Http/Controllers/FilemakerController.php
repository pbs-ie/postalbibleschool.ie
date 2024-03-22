<?php

namespace App\Http\Controllers;

use Aws\CognitoIdentityProvider\CognitoIdentityProviderClient;
use Aws\CognitoIdentityProvider\Exception\CognitoIdentityProviderException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use stdClass;
use DateTime;

session_start();
session_set_cookie_params(3600, "/");

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
            if (
                isset ($_SESSION["fmidToken"]) && isset ($_SESSION["tokenGeneratedTime"]) &&
                $_SESSION["tokenGeneratedTime"]->diff(new DateTime())->format('%i') < 60
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
            '_limit' => 10,
            'script' => 'dapi_student_record',
            'script.param' => $email
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

    private function runScript($layoutName, $scriptName)
    {
        $formattedLayout = rawurlencode($layoutName);
        $formattedScript = rawurlencode($scriptName);
        $path = "{$this->fmHost}/fmi/data/{$this->fmVersion}/databases/{$this->fmDatabase}/layouts/{$formattedLayout}/script/{$formattedScript}";

        $token = $this->getBearerToken();
        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . $token
        ])
            ->withBody('', 'application/json')
            ->get($path);

        dd($response->json());
    }

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
     * @return boolean
     */
    public function updateLessonOrders(int $recordId, $changedRecord)
    {
        return $this->updateRecordById(self::MONTHLY_ORDER_LAYOUT, $recordId, $changedRecord);
    }

    /**
     * Get list of students for current user from Filemaker
     * 
     * @param string $email
     * @return array
     */
    public function getStudents(string $email)
    {
        return $this->getStudentsForAreaRecords($email);
    }
}
