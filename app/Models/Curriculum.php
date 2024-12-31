<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Curriculum extends Model
{
    use HasFactory;

    public const DIGITAL = 'digital';

    public const PAPER = 'paper';

    protected $fillable = [
        'name',
        'email',
        'jan_lesson',
        'feb_lesson',
        'mar_lesson',
        'apr_lesson',
        'may_lesson',
        'jun_lesson',
        'sep_lesson',
        'oct_lesson',
        'nov_lesson',
        'dec_lesson',
        'curriculum_type',
    ];

    public function getDigitalMonthsCount()
    {
        $digitalCount = 0;
        foreach ($this->getAttributes() as $key => $value) {
            if (str_contains($key, '_lesson') && $value === $this::DIGITAL) {
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
        $curricula = $query->where('email', auth()->user()->email)
            ->orWhere('email', null)
            ->get();

        // TODO: To filter additional curricula till new features are released
        // $curricula = $curricula->filter(
        //     fn($item) => Str::lower($item->curriculum_type) === $this::PAPER
        // );
        return $curricula;
    }

    public function scopeGetDefaultId($query)
    {
        return $query->firstOrCreate(
            ['curriculum_type' => $this::PAPER],
            [
                'name' => 'Paper Only',
                'jan_lesson' => $this::PAPER,
                'feb_lesson' => $this::PAPER,
                'mar_lesson' => $this::PAPER,
                'apr_lesson' => $this::PAPER,
                'may_lesson' => $this::PAPER,
                'jun_lesson' => $this::PAPER,
                'sep_lesson' => $this::PAPER,
                'oct_lesson' => $this::PAPER,
                'nov_lesson' => $this::PAPER,
                'dec_lesson' => $this::PAPER,
            ]
        )->value('id');
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
