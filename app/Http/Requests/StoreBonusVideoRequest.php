<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Gate;
use Illuminate\Validation\Rule;

class StoreBonusVideoRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return Gate::allows('create:assembly');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'title' => ['required', 'string', 'max:30'],
            'imageFile' => [
                'required_without:imageLink',
                'mimes:jpeg,png,gif',
                'max:2048',
                Rule::dimensions()->ratio(16 / 9),
            ],
            'imageLink' => ['string', 'nullable'],
            'videoTitle' => ['required', 'string', 'max:30'],
            'externalUrl' => ['required', 'url'],
            'duration' => ['nullable', 'string'],
            'category' => [
                'required',
                function ($attribute, $value, $fail) {
                    if ($value !== 'bbw' && $value !== 'bbooks' && $value !== 'music') {
                        $fail('Expected either "Big Bible Words" or "Bible Books" or "Music"');
                    }
                },
            ],
        ];
    }
}
