<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use App\CustomClasses\HtmlDomParser;

class DownloadsList extends Model
{
    function getListForUrl($properties, $baseUrl) {
        $response = Http::get($baseUrl);
        $htmlBody = $response->body();


        $htmlParsed = HtmlDomParser::str_get_html( $htmlBody );
        $response = [];
        $iter=0;

        foreach ($htmlParsed->find('table tr') as $row) {
            if(is_null($row)) {
                continue;
            }
            $linkValue = $row->find('td a',0);
            if(is_null($linkValue)) {
                continue;
            }

            $linkHref = $linkValue->href;
            
            $propertyFiltered = array_filter($properties, fn($property) =>
                strpos(strtolower($linkHref), strtolower($property)) !== FALSE
            );
            $propertyFiltered = array_values($propertyFiltered);

            if(empty($propertyFiltered)) {
                $propertyValue = "undefined";
            } else {
                $propertyValue = $propertyFiltered[0];
            }
            if(!isset($response[$propertyValue])) {
                $response[$propertyValue] = [];
            }

            $dateValue = $row->find('td',2);
            $sizeValue = $row->find('td',3);
            preg_match('/(?:_|-)(A|B|C|D|E)(\d{1,2}).pdf/i', $linkHref, $matchCode, PREG_UNMATCHED_AS_NULL);
            
            $response[$propertyValue][$iter]["link"] = $baseUrl.trim($linkHref);
            $response[$propertyValue][$iter]["dateModified"] = is_null($dateValue) ? null: trim($dateValue->innertext);
            $response[$propertyValue][$iter]["size"] = is_null($sizeValue) ? null: trim($sizeValue->innertext);
            $response[$propertyValue][$iter]["series"] = is_null($matchCode) || count($matchCode)<3 ? null: trim(strtoupper($matchCode[1]));
            $response[$propertyValue][$iter]["monthNumber"] = is_null($matchCode) || count($matchCode)<3 ? null: (int)trim($matchCode[2]);
            $iter++;
        }
        unset($iter, $linkValue, $dateValue, $sizeValue);
        unset($response['undefined']);

        // Re-indexing array to 0 index after unsetting the key "undefined"
        // This is done to receive an array on the view rather than an object with keys of incremnental numbers determined by $iter
        $response = array_map(fn($propertyGroup)=>array_values($propertyGroup),$response);

        return $response;
    }
    
    public static function getBibleTimeList() {
        $properties = ["timeline","level0","level1","level2","level3","level4"];
        
        $baseUrl = "https://www.besweb.com/downloads/en/bibletime/";

        return (new self)->getListForUrl($properties, $baseUrl);
    }

    public static function getGoingDeeperList() {
        $properties = ["goingdeeper"];
        
        $baseUrl = "https://www.besweb.com/downloads/en/goingdeeper/";

        return (new self)->getListForUrl($properties, $baseUrl);

    }
    public static function getGleanersList() {
        $properties = ["gleaners"];
        
        $baseUrl = "https://www.besweb.com/downloads/en/gleaners/";

        return (new self)->getListForUrl($properties, $baseUrl);

    }
    
}
