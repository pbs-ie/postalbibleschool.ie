<?php

namespace App\Services;

use App\Http\Controllers\FilemakerController;
use Exception;
use Illuminate\Support\Facades\Validator;
use App\Models\FmLessonOrder;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;

class LessonOrderService
{
    private function getRules()
    {
        return [
            'fmRecordId' => ['nullable'],
            'email' => ['email', 'nullable'],
            'schoolName' => ['required', 'max:50', 'min:3'],
            'schoolType' => ['nullable', 'string', 'max:50'],
            'contactName' => ['nullable', 'string'],
            'level0Order' => ['numeric', 'max_digits:3'],
            'level1Order' => ['numeric', 'max_digits:3'],
            'level2Order' => ['numeric', 'max_digits:3'],
            'level3Order' => ['numeric', 'max_digits:3'],
            'level4Order' => ['numeric', 'max_digits:3'],
            'tlpOrder' => ['numeric', 'max_digits:3'],
            'goingDeeperOrder' => ['numeric', 'max_digits:3'],
            'gleanersOrder' => ['numeric', 'max_digits:3'],
            'address1' => ['string', 'nullable'],
            'address2' => ['string', 'nullable'],
            'address3' => ['string', 'nullable'],
            'address4' => ['string', 'nullable'],
        ];
    }

    private function getFmOrderRecordsMap()
    {
        return [
            'fmRecordId' => 'recordId',
            'email' => 'Contact Email',
            'schoolName' => 'Area',
            'schoolType' => 'Dispatch Code',
            'contactName' => 'Contact Name',
            'level0Order' => 'L0 Ord',
            'level1Order' => 'L1 Ord',
            'level2Order' => 'L2 Ord',
            'level3Order' => 'L3 Ord',
            'level4Order' => 'L4 Ord',
            'tlpOrder' => 'TLP Ord',
            'goingDeeperOrder' => 'NL Ord',
            'gleanersOrder' => 'Adv Ord',
            'address1' => 'Address 1',
            'address2' => 'Address 2',
            'address3' => 'Address 3',
            'address4' => 'Address 4',
        ];
    }

    /**
     * Convert Filemaker object to Laravel database friendly array
     * 
     * @param array $fmOrders
     * @return array
     */
    private function sanitizeOrders($fmOrders)
    {
        $fmLessonOrders = collect($fmOrders);
        $mapValues = $this->getFmOrderRecordsMap();
        $mappedOrders = $fmLessonOrders->map(function ($item, $key) use ($mapValues) {
            $fieldData = $item->fieldData;
            $returnObject = array(
                'fmRecordId' => $item->recordId,
                'schoolName' => trim($fieldData->{$mapValues['schoolName']}),
                'email' => trim($fieldData->{$mapValues['email']}),
                'schoolType' => trim($fieldData->{$mapValues['schoolType']}),
                'contactName' => trim($fieldData->{$mapValues['contactName']}),
                'level0Order' => trim($fieldData->{$mapValues['level0Order']}) ?: 0,
                'level1Order' => trim($fieldData->{$mapValues['level1Order']}) ?: 0,
                'level2Order' => trim($fieldData->{$mapValues['level2Order']}) ?: 0,
                'level3Order' => trim($fieldData->{$mapValues['level3Order']}) ?: 0,
                'level4Order' => trim($fieldData->{$mapValues['level4Order']}) ?: 0,
                'goingDeeperOrder' => trim($fieldData->{$mapValues['goingDeeperOrder']}) ?: 0,
                "gleanersOrder" => trim($fieldData->{$mapValues["gleanersOrder"]}) ?: 0,
                'tlpOrder' => trim($fieldData->{$mapValues['tlpOrder']}) ?: 0,
                'address1' => trim($fieldData->{$mapValues['address1']}),
                'address2' => trim($fieldData->{$mapValues['address2']}),
                'address3' => trim($fieldData->{$mapValues['address3']}),
                'address4' => trim($fieldData->{$mapValues['address4']}),
            );
            return $returnObject;
        });
        return $mappedOrders->toArray();
    }


    public function populateOrdersFromFilemaker()
    {
        $ordersFm = (new FilemakerController())->getLessonOrders();
        $lessonOrders = collect($this->sanitizeOrders($ordersFm));
        $lessonOrders->each(function ($item) {

            $validator = Validator::make($item, $this->getRules());
            if ($validator->fails()) {
                $validator->errors()->add("Name of School", $item['schoolName']);
                Log::error($validator->errors());
                throw ValidationException::withMessages($validator->errors()->toArray());
            }
            $validatedArray = $validator->validated();

            FmLessonOrder::upsert($validatedArray, ['email']);
        });

    }
}
