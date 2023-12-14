<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FmLessonOrder extends Model
{
    use HasFactory;

    protected $fillable = [
        'fmRecordId',
        'email',
        'schoolName',
        'schoolType',
        'level0Order',
        'level1Order',
        'level2Order',
        'level3Order',
        'level4Order',
        'goingDeeperOrder',
        'gleanersOrder',
        'tlpOrder'
    ];
}
