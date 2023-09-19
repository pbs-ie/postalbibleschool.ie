<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LessonOrder extends Model
{
    use HasFactory;

    protected $fillable = [
        'email',
        'schoolName',
        'schoolType',
        'level0Order',
        'level1Order',
        'level2Order',
        'level3Order',
        'level4Order',
        'tlpOrder'
    ];
}
