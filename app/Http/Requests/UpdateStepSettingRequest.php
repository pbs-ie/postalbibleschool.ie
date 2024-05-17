<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateStepSettingRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            "dates" => ['required', 'string'],
            "topic" => ['required', 'string'],
            "standardCost" => ['required', 'string'],
            "concessionCost" => ['required', 'string'],
            "speaker" => ['required', 'string'],
            "embedLink" => ['required', 'string'],
            "isActive" => ['required']
        ];
    }
}
