<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\File;
use Illuminate\Support\Facades\Gate;

class UpdateStepSettingRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return Gate::allows('create:events');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            "dates" => ['required_if:isActive,true', 'string', 'nullable'],
            "topic" => ['required_if:isActive,true', 'string', 'nullable'],
            "standardCost" => ['required_if:isActive,true', 'numeric', 'nullable'],
            "concessionCost" => ['required_if:isActive,true', 'numeric', 'nullable'],
            "speaker" => ['required_if:isActive,true', 'string', 'nullable'],
            "embedLink" => ['required_if:isActive,true', 'string', 'nullable'],
            "isActive" => ['required', 'boolean'],
            'eventImage' => [
                File::image()
                    ->types(['png', 'jpg'])
                    ->max(2 * 1024),
                'nullable'
            ],
            'scheduleFile' => [
                File::types('pdf'),
                'nullable'
            ]
        ];
    }

    public function messages()
    {
        return [
            'eventImage.max' => 'The image may not be greater than 2 MB'
        ];
    }
}
