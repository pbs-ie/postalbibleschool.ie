<?php

namespace App\Http\Controllers;

use Aws\CognitoIdentityProvider\CognitoIdentityProviderClient;
use Aws\CognitoIdentityProvider\CognitoIdentityProviderException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use stdClass;

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

    private $fmidToken;
    private $refreshToken;

    const MONTHLY_ORDER_LAYOUT = 'Monthly Order Report API';

    public function __construct() 
    {
        $cognitoRegion = config('filemaker.cognitoRegion');

        $this->fmHost = config('filemaker.host');
        $this->fmUser = config('filemaker.user');
        $this->fmPassword = config('filemaker.password');
        $this->fmVersion = config('filemaker.version');
        $this->fmDatabase = config('filemaker.database');
        
    }
    private function getBearerToken() {
        try {
            if (!$this->fmUser || !$this->fmPassword) {
                return null;
            }
            $credentials = new \MSDev\FMCloudAuthenticator\Credentials(
                $this->fmHost,
                $this->fmUser,
                $this->fmPassword,
                \MSDev\FMCloudAuthenticator\Credentials::DAPI,
                $this->fmDatabase
            );
            $authenticator = new \MSDev\FMCloudAuthenticator\Authenticate();
            return $authenticator->fetchToken($credentials);
        }
        catch(CognitoIdentityProviderException $e) {
            Log::error($e);
        }
    }

    /** 
     * Validate session of the current token
     * 
     * @return string
    */
    private function validateSession($token) {
        $path = "{$this->fmHost}/fmi/data/{$this->fmVersion}/validateSession";
        $response = Http::withHeaders([
            'Authorization' => 'Bearer '.$token
        ])
            ->withBody('', 'application/json')
            ->get($path);

        if($response->getStatusCode() === 200 && $response->getReasonPhrase() === "OK") {
            return $token;
        } else {
            dd($response->json());
        }
    }

    private function getMonthlyOrderRecords() {
        $formattedLayout = rawurlencode(self::MONTHLY_ORDER_LAYOUT);
        $path = "{$this->fmHost}/fmi/data/{$this->fmVersion}/databases/{$this->fmDatabase}/layouts/{$formattedLayout}/records";
        $queryData = [
            '_limit' => 100,
            'script' => 'dapi_monthly_order'
        ];
        $query = http_build_query($queryData);
        $token = $this->getBearerToken();
        $response = Http::withHeaders([
            'Authorization' => 'Bearer '.$token
        ])
            ->withBody('', 'application/json')
            ->get($path.'?'.$query);

        $responseData = json_decode(json_encode($response->json()))->response->data;
        return $responseData;
        
    }

    private function runScript($layoutName, $scriptName) {
        $formattedLayout = rawurlencode($layoutName);
        $formattedScript = rawurlencode($scriptName);
        $path = "{$this->fmHost}/fmi/data/{$this->fmVersion}/databases/{$this->fmDatabase}/layouts/{$formattedLayout}/script/{$formattedScript}";
        
        $token = $this->getBearerToken();
        $response = Http::withHeaders([
            'Authorization' => 'Bearer '.$token
        ])
            ->withBody('', 'application/json')
            ->get($path);

        dd($response->json());
    }

    private function updateRecordById(string $layoutName,int $recordId, $changedRecord) {
        $formattedLayout = rawurlencode($layoutName);
        $path = "{$this->fmHost}/fmi/data/{$this->fmVersion}/databases/{$this->fmDatabase}/layouts/{$formattedLayout}/records/{$recordId}";
        
        $token = $this->getBearerToken();
        $body = new stdClass();
        $body->fieldData = $changedRecord;
        $response = Http::withHeaders([
            'Authorization' => 'Bearer '.$token
        ])
            ->withBody(json_encode($body), 'application/json')
            ->patch($path);
        
        $responseData = json_decode(json_encode($response->json()))->response;
        return $response->ok();
    }

    public function getLessonOrders() {
        return $this->getMonthlyOrderRecords();
    }

    /**
     * @return boolean
     */
    public function updateLessonOrders(int $recordId, $changedRecord) {
        return $this->updateRecordById(self::MONTHLY_ORDER_LAYOUT, $recordId, $changedRecord);
    }
}
