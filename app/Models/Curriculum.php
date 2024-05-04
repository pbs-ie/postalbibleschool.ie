<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Curriculum extends Model
{
    use HasFactory;

    public const DIGITAL = "digital";
    public const PAPER = "paper";

    protected $fillable = [
        "name",
        "email",
        "jan_lesson",
        "feb_lesson",
        "mar_lesson",
        "apr_lesson",
        "may_lesson",
        "jun_lesson",
        "sep_lesson",
        "oct_lesson",
        "nov_lesson",
        "dec_lesson",
        "curriculum_type"
    ];


    public function getDigitalMonthsCount()
    {
        $digitalCount = 0;
        foreach ($this->getAttributes() as $key => $value) {
            if (str_contains($key, '_lesson') && $value === "digital") {
                $digitalCount = $digitalCount + 1;
            }
        }
        return $digitalCount;
    }

    public function classrooms()
    {
        return $this->hasMany(Classroom::class);
    }

    public function students()
    {
        return $this->through('classrooms')->has('students');
    }

    public function scopeCurrent($query)
    {
        return $query->where('email', auth()->user()->email)
            ->orWhere('email', null)
            ->get();
    }

    public function scopeGetDefaultId($query)
    {
        return $query->where('curriculum_type', $this::PAPER)->first()->value('id');
    }

    public function scopeAllWithDigitalCount($query)
    {
        $curricula = $query->get();
        $curricula->map(function (Curriculum $curriculum) {
            $curriculum->digital_count = $curriculum->getDigitalMonthsCount();
        });
        return $curricula;
    }
}