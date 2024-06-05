<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MapEmailAreacode extends Model
{
    use HasFactory;
    protected $table = "map_user_email_to_area_code";

    protected $fillable = ['email', 'area_code'];

    protected $hidden = ['created_at', 'updated_at'];


}
