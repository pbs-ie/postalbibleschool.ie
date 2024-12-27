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
            "description" => ['required_with:activeId', 'string', 'nullable'],
            "standardCost" => ['required_with:activeId', 'numeric'],
            "concessionCost" => ['required_with:activeId', 'numeric'],
            "embedLink" => ['required_with:activeId', 'string', 'nullable'],
            "isRegistrationActive" => ['required', 'boolean'],
            "activeId" => ['required_if:isRegistrationActive,true', 'exists:App\Models\StepEvent,id', 'nullable', 'numeric'],
            "upcomingId1" => ['nullable', 'numeric', 'different:activeId'],
            "upcomingId2" => ['nullable', 'numeric', 'different:activeId', 'different:upcomingId1'],
            "upcomingId3" => ['nullable', 'numeric', 'different:activeId', 'different:upcomingId1', 'different:upcomingId2'],
            'scheduleFile' => [
                File::types('pdf'),
                'nullable'
            ]
        ];
    }

}
