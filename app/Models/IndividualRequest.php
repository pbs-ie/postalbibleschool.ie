<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class IndividualRequest extends Model
{
    use HasFactory;

    protected $fillable = [
        'firstname',
        'lastname',
        'dob',
        'age',
        'email',
        'phone',
        'address1',
        'address2',
        'city',
        'state',
        'postcode',
        'numberInFamily',
        'country',
        'message',
    ];
}
