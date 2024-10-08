<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;

class FmLessonOrder extends Model
{
    use HasFactory;

    protected $fillable = [
        'fmRecordId',
        'email',
        'areaCode',
        'schoolName',
        'schoolType',
        'contactName',
        'level0Order',
        'level1Order',
        'level2Order',
        'level3Order',
        'level4Order',
        'goingDeeperOrder',
        'gleanersOrder',
        'tlpOrder',
        'address1',
        'address2',
        'address3',
        'address4',
    ];

    protected $hidden = ['address1', 'address2', 'address3', 'address4'];

    protected $appends = ['address'];

    /**
     * Interact with the school address.
     *
     * @return  \Illuminate\Database\Eloquent\Casts\Attribute
     */
    protected function address(): Attribute
    {
        return Attribute::make(
            get: fn($value, $attributes) => nl2br(implode('\n', array_filter([
                $attributes['address1'],
                $attributes['address2'],
                $attributes['address3'],
                $attributes['address4']
            ])))
        );
    }
}
