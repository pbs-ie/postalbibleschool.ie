<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Gate;
use Illuminate\Validation\Rule;


class StoreAssemblyVideoRequest extends FormRequest
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
        //Rule::requiredIf(fn($request) => count($request->fileContent) > 0)
        return [
            'title' => ['required', 'string'],
            'month' => ['required', 'string'],
            'series' => ['required', 'string'],
            'imageLink' => ['string', "nullable"],
            'videoContent' => ['array', 'max:20', 'min:1'],
            'videoContent.*.id' => ['required_with:videoContent'],
            'videoContent.*.title' => ['required_with:videoContent', 'string'],
            'videoContent.*.externalUrl' => ['required_with:videoContent', 'url'],
            'videoContent.*.duration' => ['string', 'nullable'],
        ];
    }

    /**
     * Get custom attributes for validator errors.
     *
     * @return array<string, string>
     */
    public function attributes(): array
    {
        return [
            'videoContent' => 'Video information',
            'videoContent.*.title' => 'Video title',
            'videoContent.*.externalUrl' => 'Video External Url',
            'videoContent.*.duration' => 'Video Duration',
        ];
    }

    public function messages(): array
    {
        $videoContent = $this->input('videoContent');
        if (!isset($videoContent)) {
            $messages["videoContent"] = "Video Information not set";
        } else {

            foreach ($this->input('videoContent') as $key => $val) {
                $url = $val['externalUrl'];
                $messages["videoContent.$key.externalUrl.url"] = "$url is not a valid url";
            }
        }
        return $messages;
    }
}
