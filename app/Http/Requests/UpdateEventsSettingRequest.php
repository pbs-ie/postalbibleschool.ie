<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\File;
use Illuminate\Support\Facades\Gate;

class UpdateEventsSettingRequest extends FormRequest
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
            "shed_dates" => ['required_if:shed_isActive,true', 'string', 'nullable'],
            "shed_location" => ['required_if:shed_isActive,true', 'string', 'nullable'],
            "shed_year" => ['required_if:shed_isActive,true', 'string', 'nullable'],
            "shed_embedLink" => ['required_if:shed_isActive,true', 'string', 'nullable'],
            "shed_isActive" => ['required_without:prizegivings_isActive', 'boolean'],
            'shed_consentForm' => [
                File::types('pdf'),
                'nullable'
            ],

            "prizegivings_year" => ['required_if:prizegivings_isActive,true', 'string', 'nullable'],
            "prizegivings_isActive" => ['required_without:shed_isActive', 'boolean'],
            'prizegivings_scheduleFile' => [
                File::types('pdf'),
                'nullable'
            ],
        ];
    }

    public function attributes()
    {
        return [
            'shed_isActive' => "SHED event active",
            'prizegivings_isActive' => "Prizegivings event active"
        ];
    }
}
