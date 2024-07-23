<?php

namespace App\Settings;

use Spatie\LaravelSettings\Settings;

class CampSettings extends Settings
{

    public string $dates;
    public string $year;
    public string $embedLink;
    public bool $isActive;
    public static function group(): string
    {
        return 'camp';
    }
}