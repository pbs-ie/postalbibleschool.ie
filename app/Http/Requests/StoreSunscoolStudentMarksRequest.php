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
            '*' => ['array'],
            '*.pbsId' => ['required'],
            '*.sunscoolId' => ['required'],
            '*.level' => ['required'],
            '*.bibletimeProgress' => ['required'],
            '*.selectedYear' => ['required'],
            '*.selectedMonth' => ['required'],
            '*.finalGrade' => ['required', 'numeric', 'max:100', 'min:0'],
        ];
    }

    /**
     * Get custom attributes for validator errors.
     *
     * @return array<string, string>
     */
    public function attributes(): array
    {
        $messages = [
            '*.pbsId' => 'PBS Id',
            '*.sunscoolId' => 'Sunscool Id',
            '*.selectedYear' => 'Selected Year',
            '*.selectedMonth' => 'Selected Month',
        ];

        return $messages;
    }
}
