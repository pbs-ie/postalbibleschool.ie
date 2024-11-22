<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SunscoolMap extends Model
{
    use HasFactory;

    protected $table = 'sunscool_map';

    protected $fillable = [
        'fm_student_id',
        'fm_grade_record_id',
        'bibletime',
        'level',
    ];

    public function Student()
    {
        return $this->belongsTo(Student::class);
    }
}
