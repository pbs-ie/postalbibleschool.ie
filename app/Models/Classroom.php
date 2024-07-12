<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Str;

class Classroom extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'email',
        'level_0_order',
        'level_1_order',
        'level_2_order',
        'level_3_order',
        'level_4_order',
        'tlp_order',
        'curriculum_id'
    ];

    protected $appends = ['curriculum_name'];

    /**
     * Add curriculum name to parameters.
     *
     * @return  \Illuminate\Database\Eloquent\Casts\Attribute
     */
    protected function curriculumName(): Attribute
    {
        return Attribute::make(
            get: fn($value, $attributes) =>
            $this->curriculum()->find($attributes['curriculum_id'])->name
        );
    }

    public function scopeCurrent($query)
    {
        return $query->where('email', auth()->user()->email)->get();
    }

    protected function name(): Attribute
    {
        return Attribute::make(
            get: fn(mixed $value) =>
            Str::headline($value),
        );
    }

    public function students()
    {
        return $this->hasMany(Student::class);
    }

    public function curriculum()
    {
        return $this->belongsTo(Curriculum::class);
    }
}
