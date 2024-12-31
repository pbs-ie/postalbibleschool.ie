<?php

namespace App\Services;

use App\CustomClasses\HtmlDomParser;
use App\Mail\BibletimeLinksMissing;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Mail;

class WorksheetLinksService
{
    private static function getListForUrl($properties, $baseUrl)
    {
        try {
            $response = Http::get($baseUrl);

            $htmlBody = $response->body();

            $htmlParsed = HtmlDomParser::str_get_html($htmlBody);
            $response = [];
            $iter = 0;

            foreach ($htmlParsed->find('table tr') as $row) {
                if (is_null($row)) {
                    continue;
                }
                $linkValue = $row->find('td a', 0);
                if (is_null($linkValue)) {
                    continue;
                }

                $linkHref = $linkValue->href;

                $propertyFiltered = array_filter(
                    $properties,
                    fn ($property) => strpos(strtolower($linkHref), strtolower($property)) !== false
                );
                $propertyFiltered = array_values($propertyFiltered);

                if (empty($propertyFiltered)) {
                    $propertyValue = 'undefined';
                } else {
                    $propertyValue = $propertyFiltered[0];
                }
                if (! isset($response[$propertyValue])) {
                    $response[$propertyValue] = [];
                }

                $dateValue = $row->find('td', 2);
                $sizeValue = $row->find('td', 3);
                preg_match('/(?:_|-)(A|B|C|D|E)(\d{1,2}).pdf/i', $linkHref, $matchCode, PREG_UNMATCHED_AS_NULL);

                $response[$propertyValue][$iter]['link'] = $baseUrl.trim($linkHref);
                $response[$propertyValue][$iter]['dateModified'] = is_null($dateValue) ? null : trim($dateValue->innertext);
                $response[$propertyValue][$iter]['size'] = is_null($sizeValue) ? null : trim($sizeValue->innertext);
                $response[$propertyValue][$iter]['series'] = is_null($matchCode) || count($matchCode) < 3 ? null : trim(strtoupper($matchCode[1]));
                $response[$propertyValue][$iter]['monthNumber'] = is_null($matchCode) || count($matchCode) < 3 ? null : (int) trim($matchCode[2]);
                $iter++;
            }
            unset($iter, $linkValue, $dateValue, $sizeValue);
            unset($response['undefined']);

            // Re-indexing array to 0 index after unsetting the key "undefined"
            // This is done to receive an array on the view rather than an object with keys of incremnental numbers determined by $iter
            $response = array_map(fn ($propertyGroup) => array_values($propertyGroup), $response);

            return $response;
        } catch (\Exception $e) {
            Log::warning($e);

            return [];
        }
    }

    private static function sendAdminEmail($typeName)
    {
        try {
            Mail::to(config('mail.admin.address'))->queue(new BibletimeLinksMissing($typeName));
        } catch (\Exception $e) {
            Log::error('Could not send email for BES worksheet links missing warning', [$e]);
        }
    }

    /**
     * Get array Bibletime lessons from besweb.com
     *
     * @return array
     */
    public static function getBibleTimeList()
    {
        $properties = ['timeline', 'level0', 'level1', 'level2', 'level3', 'level4'];

        $baseUrl = 'https://www.besweb.com/downloads/en/bibletime/';

        $lessonsList = self::getListForUrl($properties, $baseUrl);

        if (empty($lessonsList)) {
            self::sendAdminEmail('Bibletime worksheet');
        }

        return $lessonsList;
    }

    /**
     * Get array of Going deeper lessons from besweb.com
     *
     * @return array
     */
    public static function getGoingDeeperList()
    {
        $properties = ['goingdeeper'];

        $baseUrl = 'https://www.besweb.com/downloads/en/goingdeeper/';

        $lessonsList = self::getListForUrl($properties, $baseUrl);

        if (empty($lessonsList)) {
            self::sendAdminEmail('Going Deeper worksheet');
        }

        return $lessonsList;
    }

    /**
     * Get array of Gleaners lessons from besweb.com
     *
     * @return array
     */
    public static function getGleanersList()
    {
        $properties = ['gleaners'];

        $baseUrl = 'https://www.besweb.com/downloads/en/gleaners/';

        $lessonsList = self::getListForUrl($properties, $baseUrl);

        if (empty($lessonsList)) {
            self::sendAdminEmail('Gleaners worksheet');
        }

        return $lessonsList;
    }
}
