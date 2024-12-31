<?php

namespace App\Settings;

use Spatie\LaravelSettings\Settings;

class ITeamSettings extends Settings
{
    public ?string $dates;

    public ?string $embedLink;

    public bool $isActive;

    public ?string $eventImageLink;

    public static function group(): string
    {
        return 'iteam';
    }
}
