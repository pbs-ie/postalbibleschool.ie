<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Gate;
use Illuminate\Validation\Rule;


class StoreStepEventRequest extends FormRequest
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
        $eventId = $this->route('event')?->id;

        return [
            'startDate' => [
                'required',
                'string',
                'date_format:Y-m-d',
                function ($attribute, $value, $fail) use ($eventId) {
                    $exists = \App\Models\StepEvent::whereDate('startDate', $value)
                        ->when($eventId, function ($query) use ($eventId) {
                            return $query->where('id', '!=', $eventId);
                        })
                        ->exists();
                    if ($exists) {
                        $fail('Event with start date already exists.');
                    }
                }
            ],
            'endDate' => [
                'required',
                'string',
                'date_format:Y-m-d',
                function ($attribute, $value, $fail) use ($eventId) {
                    $exists = \App\Models\StepEvent::whereDate('endDate', $value)
                        ->when($eventId, function ($query) use ($eventId) {
                            return $query->where('id', '!=', $eventId);
                        })
                        ->exists();
                    if ($exists) {
                        $fail('Event with end date already exists.');
                    }
                },
                'after:startDate'
            ],
            'description' => ['nullable', 'string'],
            'topic' => ['required', 'string'],
            'speaker' => ['nullable', 'string'],
            'showDetails' => ['required', 'boolean'],
            'imageFile' => [
                'required_without:imageLink',
                'mimes:jpeg,png,gif',
                'max:2048',
                Rule::dimensions()->ratio(16 / 9)
            ],
            'imageLink' => ['string', "nullable"],
            'videoContent' => ['array', 'max:20', 'nullable'],
            'videoContent.*.id' => ['required_with:videoContent'],
            'videoContent.*.title' => ['required_with:videoContent', 'string'],
            'videoContent.*.externalUrl' => ['required_with:videoContent', 'url'],
            'videoContent.*.duration' => ['string', 'nullable'],
            'fileContent' => ['array', 'max:20', 'nullable'],
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
            'imageFile' => 'Thumbnail Image',
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
        $messages = [
            'startDate.required' => 'The start date is required.',
            'startDate.unique' => 'The start date must be unique.',
            'endDate.required' => 'The end date is required.',
            'endDate.unique' => 'The end date must be unique.',
            'description.required' => 'The description is required.',
            'topic.required' => 'The topic is required.',
            'showDetails.required' => 'The show details field is required.',
            'imageFile.max' => 'The thumbnail image must not be greater than 2MB.',
            'showDetails.boolean' => 'The show details field must be true or false.',
            'videoContent.*.id.required_with' => 'The video ID is required when video content is present.',
            'videoContent.*.title.required_with' => 'The video title is required when video content is present.',
            'videoContent.*.externalUrl.required_with' => 'The video external URL is required when video content is present.',
            'videoContent.*.externalUrl.url' => 'The video external URL must be a valid URL.',
            'fileContent.*.id.required_with' => 'The file ID is required when file content is present.',
            'fileContent.*.title.required_with' => 'The file title is required when file content is present.',
            'fileContent.*.name.required_with' => 'The file name is required when file content is present.',
            'fileContent.*.type.required_with' => 'The file type is required when file content is present.',
            'fileContent.*.fileData.required_without' => 'The uploaded file is required when file path is not present.',
            'fileContent.*.fileData.mimes' => 'The uploaded file must be a PDF.',
        ];
        if ($this->input('videoContent')) {
            foreach ($this->input('videoContent') as $key => $val) {
                $url = $val['externalUrl'];
                $messages["videoContent.$key.externalUrl.url"] = "$url is not a valid url";
            }
        }
        if ($this->input('fileContent')) {
            foreach ($this->input('fileContent') as $key => $val) {
                $messages["fileContent.$key.fileData.required_without"] = "Uploaded file is required for new file";
            }
        }
        return $messages;
    }
}
