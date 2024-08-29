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
            'schoolId' => ['numeric', 'required'],
            'selectedStudents' => ['required', 'array'],
            'selectedStudents.*.studentId' => ['numeric', 'required'],
            'selectedStudents.*.name' => ['string', 'required'],
            'selectedStudents.*.attemptedAverage' => ['numeric', 'required'],
            'selectedStudents.*.bibletime' => ['string', 'required'],
            'selectedStudents.*.itemCount' => ['numeric', 'required'],
            'selectedStudents.*.totalAverage' => ['numeric', 'required'],
        ];
    }
}
