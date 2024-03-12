<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Classroom;
use App\Models\BaseModel;

class Student extends BaseModel
{
    use HasFactory;

    protected $table = "fm_students";

    protected $fillable = ['classroom_id', 'fm_student_id', 'first_name', 'last_name', 'area_code', 'grade'];

    protected $hidden = ['created_at', 'updated_at'];


    public function classroom()
    {
        return $this->belongsTo(Classroom::class);
    }

}
