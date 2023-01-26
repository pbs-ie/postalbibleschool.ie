<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreIndividualRequest extends FormRequest
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
            'studentDetails.*.fullname' => ['required', 'min:3'],
            'studentDetails.*.dob' => ['required_with:studentDetails.*.fullname', 'date', 'before:today'],
            'email' => ['email'],
            'phone' => [],
            'address1' => ['required'],
            'address2' => [],
            'city' => ['required'],
            'state' => [],
            'postcode' => [],
            'country' => ['required'],
            'message' => []
        ];
    }
}
