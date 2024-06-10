<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Gate;

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
            'title' => ['required', 'string'],
            'imageFile' => ['required', 'image', 'mimetypes:image/png'],
            'imageLink' => ['string', 'nullable'],
            'videoTitle' => ['required', 'string'],
            'externalUrl' => ['required', 'url'],
            'duration' => ['nullable', 'string'],
            'category' => [
                'required',
                function ($attribute, $value, $fail) {
                    if ($value !== "bbw" && $value !== "bbooks") {
                        $fail('Expected either "Big Bible Words" or "Bible Books');
                    }
                }
            ]
        ];
    }
}
