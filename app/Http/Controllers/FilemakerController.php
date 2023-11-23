<?php

namespace App\Http\Controllers;

use Aws\CognitoIdentityProvider\CognitoIdentityProviderClient;
use Aws\CognitoIdentityProvider\CognitoIdentityProviderException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class FilemakerController extends Controller
{
    private $client;
    private $clientId;
    private $poolId;

    private $fmHost;
    private $fmUser;
    private $fmPassword;
    private $fmVersion;

    private $fmidToken;
    private $refreshToken;

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

    private function validateSession() {
        $path = "{$this->fmHost}/fmi/data/{$this->fmVersion}/validateSession";
        $token = $this->getBearerToken();
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

    public function getProductInfo() {
        $path = "{$this->fmHost}/fmi/data/{$this->fmVersion}/productinfo";
        $token = $this->getBearerToken();
        $response = Http::withHeaders([
            'Authorization' => 'FMID '.$token
        ])
            ->withBody('[]', 'application/json')
            ->get($path);

        $data = $response->json();
        dd($data);
    }
}
