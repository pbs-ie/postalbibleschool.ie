<?php

namespace App\Services;

class VideoService
{
    public function parseExternalUrl($externalUrl)
    {
        $vimeoPath = 'https://player.vimeo.com/video/';
        $vimeoParams = '?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479';
        preg_match('/\/(\d{5,})\??/', $externalUrl, $numCode, PREG_UNMATCHED_AS_NULL);
        if (count($numCode) < 1 || is_null($numCode[1])) {
            return '';
        } else {
            return $vimeoPath.$numCode[1].$vimeoParams;
        }
    }
}
