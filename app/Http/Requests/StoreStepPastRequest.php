<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Gate;
use Illuminate\Validation\Rule;


class StoreStepPastRequest extends FormRequest
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
        //Rule::requiredIf(fn($request) => count($request->fileContent) > 0)
        return [
            'date' => ['required', 'string', 'unique:step_pasts,date'],
            'description' => ['required', 'string'],
            'title' => ['required', 'string'],
            'showDetails' => ['required', 'boolean'],
            'imageLink' => ['string', "nullable"],
            'routename' => [],
            'videoContent' => ['array', 'max:20', 'min:1'],
            'videoContent.*.id' => ['required_with:videoContent'],
            'videoContent.*.title' => ['required_with:videoContent', 'string'],
            'videoContent.*.externalUrl' => ['required_with:videoContent', 'url'],
            'videoContent.*.duration' => ['string', 'nullable'],
            'fileContent' => ['array', 'max:20'],
            'fileContent.*.id' => ['required_with:fileContent'],
            'fileContent.*.title' => ['required_with:fileContent', 'string'],
            'fileContent.*.name' => ['required_with:fileContent', 'string'],
            'fileContent.*.filePath' => ['string'],
            'fileContent.*.type' => ['required_with:fileContent'],
            'fileContent.*.fileData' => ['required_without:fileContent.*.filePath', 'nullable', 'mimes:pdf'],
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
            'fileContent' => 'Files information',
            'fileContent.*.name' => 'File Name',
            'fileContent.*.type' => 'File Type',
            'fileContent.*.fileData' => 'Uploaded file',
            'fileContent.*.title' => 'File title',
        ];
    }

    public function messages(): array
    {
        foreach ($this->input('videoContent') as $key => $val) {
            $url = $val['externalUrl'];
            $messages["videoContent.$key.externalUrl.url"] = "$url is not a valid url";
        }
        if ($this->input('fileContent')) {
            foreach ($this->input('fileContent') as $key => $val) {
                $messages["fileContent.$key.fileData.required_without"] = "Uploaded file is required for new file";
            }
        }
        return $messages;
    }
}
