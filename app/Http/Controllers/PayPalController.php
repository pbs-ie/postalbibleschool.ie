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

    function guidv4($data = null)
    {
        // Generate 16 bytes (128 bits) of random data or use the data passed into the function.
        $data = $data ?? random_bytes(16);
        assert(strlen($data) == 16);

        // Set version to 0100
        $data[6] = chr(ord($data[6]) & 0x0f | 0x40);
        // Set bits 6-7 to 10
        $data[8] = chr(ord($data[8]) & 0x3f | 0x80);

        // Output the 36 character UUID.
        return vsprintf('%s%s-%s-%s-%s-%s%s%s', str_split(bin2hex($data), 4));
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
        return Inertia::render('Payment/Index');
    }


    public function createOrder(Request $request)
    {
        $bodyContent = $request->all(['cart']);
        $cartContent = $bodyContent['cart'][0];
        $purchaseValue = round($cartContent['value'], 2);
        $accessToken = $this->getAccessToken();
        $url = $this->endpointUrl . '/v2/checkout/orders';
        $payload = [
            "intent" => "CAPTURE",
            "purchase_units" => [[
                "description" => "Order #1",
                "amount" => [
                    "currency_code" => "EUR",
                    "value" => $purchaseValue
                ]
            ]]
        ];

        $paypalRequestId = $this->guidv4();

        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . $accessToken,
            'Paypal-Request-Id' => $paypalRequestId,
        ])->acceptJson()->post($url, $payload);

        $returnJson = [];
        $jsonResponse = $response->json();
        if (array_key_exists('id', $jsonResponse)) {
            $returnJson = [
                'id' => $jsonResponse['id']
            ];
        } else {
            $returnJson = $jsonResponse;
        }
        return $returnJson;
    }

    public function captureOrder(Request $request, $orderId)
    {
        $accessToken = $this->getAccessToken();
        $paypalRequestId = $this->guidv4();
        $url = $this->endpointUrl . '/v2/checkout/orders/' . $orderId . '/capture';
        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . $accessToken
        ])->acceptJson()->post($url, ['body' => json_encode([])]);
        return $response->json();
    }
}
