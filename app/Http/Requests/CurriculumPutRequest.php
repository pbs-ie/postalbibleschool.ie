<?php

namespace App\Http\Requests;

use App\Rules\CurriculumType;
use Illuminate\Foundation\Http\FormRequest;

class CurriculumPutRequest extends FormRequest
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
            'email' => ['email', 'nullable'],
            'name' => [
                'required',
                'string',
            ],
            'jan_lesson' => ['string', 'nullable', new CurriculumType],
            'feb_lesson' => ['string', 'nullable', new CurriculumType],
            'mar_lesson' => ['string', 'nullable', new CurriculumType],
            'apr_lesson' => ['string', 'nullable', new CurriculumType],
            'may_lesson' => ['string', 'nullable', new CurriculumType],
            'jun_lesson' => ['string', 'nullable', new CurriculumType],
            'sep_lesson' => ['string', 'nullable', new CurriculumType],
            'oct_lesson' => ['string', 'nullable', new CurriculumType],
            'nov_lesson' => ['string', 'nullable', new CurriculumType],
            'dec_lesson' => ['string', 'nullable', new CurriculumType],
            'curriculum_type' => [
                'string',
                'nullable',
                new CurriculumType,
                function ($attribute, $value, $fail) {
                    if ($value === 'digital') {
                        $selectionArray = [
                            request()->jan_lesson,
                            request()->feb_lesson,
                            request()->mar_lesson,
                            request()->apr_lesson,
                            request()->may_lesson,
                            request()->jun_lesson,
                            request()->sep_lesson,
                            request()->oct_lesson,
                            request()->nov_lesson,
                            request()->dec_lesson,
                        ];
                        $digitalSelection = array_filter($selectionArray, function ($value) {
                            return $value === 'digital';
                        });
                        if (count($digitalSelection) > 5) {
                            $fail('More than 5 months selected as digital');
                        }
                    }
                },
            ],
            'grade' => ['string', 'nullable'],
        ];
    }

    /**
     * Get custom messages for validator errors.
     *
     * @return array
     */
}
