<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GroupRequest extends Model
{
    use HasFactory;

    protected $fillable = [
        'firstname',
        'lastname',
        'email',
        'phone',
        'address1',
        'address2',
        'city',
        'state',
        'postcode',
        'country',
        'type',
        'numberOfStudents',
        'ageRange',
        'message'
    ];
}
