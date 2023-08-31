<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AssemblyVideo extends Model
{
    use HasFactory;

    protected $fillable = [
        'monthTitle',
        'month',
        'series',
        'routename',
        'imageLink',
        'videoTitle',
        'externalUrl',
        'duration'
    ];
}
