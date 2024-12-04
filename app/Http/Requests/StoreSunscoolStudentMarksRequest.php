<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Gate;

class StoreSunscoolStudentMarksRequest extends FormRequest
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
            'selectedGrades' => ['required', 'array'],
            'selectedGrades.*.studentId' => ['numeric', 'required'],
            // 'selectedGrades.*.level' => ['string', 'required'],
            'selectedGrades.*.bibletime' => ['string', 'required']
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
            'selectedGrades' => 'Students',
            'selectedGrades.*.studentId' => 'Student Id',
            // 'selectedGrades.*.level' => 'Level',
            'selectedGrades.*.bibletime' => 'Bibletime',
        ];
    }
}
