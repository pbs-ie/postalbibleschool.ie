<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\Classroom;
use App\Models\BaseModel;
use Str;
use Illuminate\Database\Eloquent\Casts\Attribute;

class Student extends BaseModel
{
    use HasFactory;

    protected $table = "fm_students";

    protected $fillable = ['classroom_id', 'fm_student_id', 'fm_record_id', 'first_name', 'last_name', 'area_code', 'grade'];

    protected $hidden = ['created_at', 'updated_at'];

    protected $appends = ['classroom_name'];

    protected function classroomName(): Attribute
    {
        return Attribute::make(
            get: fn(mixed $value, array $attributes) =>
            Str::headline(Classroom::where('id', $attributes['classroom_id'])->get()->value('name')),
        );
    }

    public function classroom()
    {
        return $this->belongsTo(Classroom::class);
    }

    public function scopeGetStudentsForUser($query)
    {
        $areaCode = MapEmailAreacode::where('email', auth()->user()->email)->get()->value('area_code');
        return $query->where('area_code', $areaCode)
            ->orderBy('grade')
            ->orderBy('last_name')
            ->get();
    }

}
