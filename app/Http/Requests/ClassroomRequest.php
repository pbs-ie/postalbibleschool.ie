<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ClassroomRequest extends FormRequest
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
            "name" => ["required"],
            "level_0_order" => ["numeric"],
            "level_1_order" => ["numeric"],
            "level_2_order" => ["numeric"],
            "level_3_order" => ["numeric"],
            "level_4_order" => ["numeric"],
            "tlp_order" => ["numeric"],
        ];
    }
}
