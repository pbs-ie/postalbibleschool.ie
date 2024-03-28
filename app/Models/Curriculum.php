<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Curriculum extends Model
{
    use HasFactory;

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

    public function scopeCurrent($query)
    {
        return $query->where('email', auth()->user()->email)->get();
    }

    public function scopeAllWithDigitalCount($query)
    {
        $curricula = $query->get();
        $curricula->map(function (Curriculum $curriculum) {
            $curriculum["digital_count"] = $curriculum->getDigitalMonthsCount();
        });
        return $curricula;
    }

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

    public function classroom()
    {
        return $this->hasMany(Classroom::class);
    }
}
