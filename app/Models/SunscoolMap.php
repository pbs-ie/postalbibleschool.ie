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
        'processed',
    ];

    public const columnsAsCamel = [
        'fm_student_id as fmStudentId',
        'fm_grade_record_id as fmGradeRecordId',
        'bibletime',
        'level',
        'processed',
    ];

    public function Student()
    {
        return $this->belongsTo(Student::class);
    }
}
