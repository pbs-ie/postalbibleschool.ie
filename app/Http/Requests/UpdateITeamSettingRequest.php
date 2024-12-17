<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\File;
use Illuminate\Support\Facades\Gate;

class UpdateITeamSettingRequest extends FormRequest
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
            "embedLink" => ['required_if:isActive,true', 'string', 'nullable'],
            "isActive" => ['required', 'boolean'],
            'eventImage' => [
                File::image()
                    ->types(['png', 'jpg'])
                    ->max(15 * 1024)
            ],
        ];
    }
}
