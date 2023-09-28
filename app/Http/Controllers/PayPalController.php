<?php


namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class PayPalController extends Controller
{
    public $environment;
    public $clientId;
    public $clientSecret;
    public $endpointUrl;

    public function __construct()
    {
        $this->environment = env('PAYPAL_ENVIRONMENT', 'sandbox');
        $this->clientId = env('PAYPAL_CLIENT_ID');
        $this->clientSecret = env('PAYPAL_CLIENT_SECRET');
        $this->endpointUrl = $this->environment === 'sandbox' ? 'https://api-m.sandbox.paypal.com' : 'https://api-m.paypal.com';
    }

    function getAccessToken()
    {
        if (!$this->clientId || !$this->clientSecret) {
            return null;
        }
        $auth = base64_encode($this->clientId . ':' . $this->clientSecret);
        $response = Http::withHeaders([
            'Authorization' => 'Basic ' . $auth
        ])
            ->withBody('grant_type=client_credentials', 'application/x-www-form-urlencoded')
            ->post($this->endpointUrl . '/v1/oauth2/token');

        $data = $response->json();
        if (isset($data['error'])) {
            error_log($data['error_description']);
            return;
        }
        return $data['access_token'];
    }
    public function index()
    {
        return Inertia::render('PayPal/Index');
    }


    public function createOrder(Request $request)
    {
        $accessToken = $this->getAccessToken();
        $url = $this->endpointUrl . '/v2/checkout/orders';
        $payload = [
            "intent" => "CAPTURE",
            "purchase_units" => [
                [
                    "amount" => [
                        "currency_code" => "EUR",
                        "value" => "100"
                    ]
                ]
            ]
        ];

        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . $accessToken
        ])->acceptJson()->post($url, $payload);

        return $response->json();
    }

    public function captureOrder(Request $request, $orderId)
    {
        $accessToken = $this->getAccessToken();
        $url = $this->endpointUrl . '/v2/checkout/orders/' . $orderId . '/capture';
        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . $accessToken
        ])->acceptJson()->post($url);

        return $response->json();
    }
}
