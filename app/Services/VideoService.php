<?php

namespace App\Services;

use Illuminate\Support\Facades\Storage;

class VideoService
{
    public function parseExternalUrl($externalUrl)
    {
        preg_match('/\/(\d{5,})\??/', $externalUrl, $numCode, PREG_UNMATCHED_AS_NULL);
        if (count($numCode) < 1 || is_null($numCode[1])) {
            return "";
        } else {

            $assemblyConfig = json_decode(Storage::get('assemblyconfig.json'), false);
            return $assemblyConfig->externalPlayer->path . $numCode[1] . $assemblyConfig->externalPlayer->params;
        }
    }
}