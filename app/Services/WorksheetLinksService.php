<?php

namespace App\Services;

use App\CustomClasses\HtmlDomParser;
use App\Mail\BibletimeLinksMissing;
use Illuminate\Support\Facades\Cache;
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

            foreach ($htmlParsed->find('table tr') as $row) {
                if ($row === null) {
                    continue;
                }
                $linkValue = $row->find('td a', 0);
                if ($linkValue === null) {
                    continue;
                }

                $linkHref = $linkValue->href;

                $propertyValue = self::determinePropertyValue($linkHref, $properties);

                if (!isset($response[$propertyValue])) {
                    $response[$propertyValue] = [];
                }

                $dateValue = $row->find('td', 2)->innertext();
                $sizeValue = $row->find('td', 3)->innertext();
                $matchCode = self::extractCode($linkHref);

                $response[$propertyValue][] = [
                    'link' => $baseUrl . trim($linkHref),
                    'dateModified' =>
                        !empty($dateValue) ? trim($dateValue) : null,
                    'size' => !empty($sizeValue) ? trim($sizeValue) : null,
                    'series' => $matchCode['series'],
                    'monthNumber' => $matchCode['monthNumber'],
                ];
            }
            unset($linkValue, $dateValue, $sizeValue);
            unset($response['undefined']);

            // Re-indexing array to 0 index after unsetting the key "undefined"
            // This is done to receive an array on the view rather than an object with keys of incremnental numbers determined by $iter
            $response = array_map(fn($propertyGroup) => array_values($propertyGroup), $response);

            return $response;
        } catch (\Exception $e) {
            Log::warning($e);

            return [];
        }
    }

    /**
     * Determines the property value based on the link href and properties.
     *
     * @param string $linkHref The link href.
     * @param array $properties The array of properties to filter by.
     * @return string The determined property value.
     */
    private static function determinePropertyValue(
        string $linkHref,
        array $properties
    ): string {
        $propertyFiltered = array_filter(
            $properties,
            fn($property) =>
            strpos(strtolower($linkHref), strtolower($property)) !== false
        );
        $propertyFiltered = array_values($propertyFiltered);

        if (empty($propertyFiltered))
            return 'undefined';

        $isValidLink = preg_match(
            '/^' . preg_quote($propertyFiltered[0], '/') . '(?:_|-)(A|B|C|D|E)(\d{1,2}).pdf/i',
            $linkHref
        );

        return $isValidLink === 0 ? 'undefined' : $propertyFiltered[0];
    }

    /**
     * Extracts the series and month number from the link href using a regular expression.
     *
     * @param string $linkHref The link href.
     * @return array An array containing the extracted series and month number.
     */
    private static function extractCode(string $linkHref): array
    {
        preg_match(
            '/(?:_|-)(A|B|C|D|E)(\d{1,2}).pdf/i',
            $linkHref,
            $matchCode,
            PREG_UNMATCHED_AS_NULL
        );

        return [
            'series' =>
                empty($matchCode[1]) ? null : trim(strtoupper($matchCode[1])),
            'monthNumber' => empty($matchCode[2]) ? null : (int) trim(
                $matchCode[2]
            ),
        ];
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
        $properties = ['level0', 'level1', 'level2', 'level3', 'level4'];

        $baseUrl = 'https://www.besweb.com/downloads/en/bibletime/';

        $lessonsList = Cache::remember('besBibletimeList', 3600, fn() => (
            self::getListForUrl($properties, $baseUrl)
        ));

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

        $lessonsList = Cache::remember('besGoingDeeperList', 3600, fn() => (
            self::getListForUrl($properties, $baseUrl)
        ));

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

        $lessonsList = Cache::remember('besGleanersList', 3600, fn() => (
            self::getListForUrl($properties, $baseUrl)
        ));

        if (empty($lessonsList)) {
            self::sendAdminEmail('Gleaners worksheet');
        }

        return $lessonsList;
    }
}
