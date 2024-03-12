<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Classroom extends Model
{
    use HasFactory;

    protected $fillable = [
        'name'
    ];

    public function scopeCurrent($query)
    {
        return $query->where('email', auth()->user()->email)->get();
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
