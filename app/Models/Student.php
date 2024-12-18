<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\Classroom;
use App\Models\BaseModel;

class Student extends BaseModel
{
    use HasFactory;

    protected $table = "fm_students";

    protected $fillable = [
        'classroom_id',
        'fm_student_id',
        'fm_record_id',
        'first_name',
        'last_name',
        'area_code',
        'grade',
        'active'
    ];

    protected $hidden = ['created_at', 'updated_at'];


    public function classroom()
    {
        return $this->belongsTo(Classroom::class);
    }

    public function SunscoolMap()
    {
        return $this->hasMany(SunscoolMap::class);
    }

    public function scopeGetStudentsForUser($query)
    {
        $areaCode = FmSchool::where('email', auth()->user()->email)->get()->only(['areaCode']);
        return $query->where('area_code', $areaCode)
            ->orderBy('grade')
            ->orderBy('last_name')
            ->get();
    }

    public function scopeGetActiveStudents($query)
    {
        return $query->where('active', 'Y')->orWhere('active', 'T');
    }

}
