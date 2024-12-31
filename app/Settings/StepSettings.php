<?php

namespace App\Settings;

use Spatie\LaravelSettings\Settings;

class StepSettings extends Settings
{
    public ?string $description;

    public string $standardCost;

    public string $concessionCost;

    public bool $isRegistrationActive;

    public ?string $activeId;

    public ?string $upcomingId1;

    public ?string $upcomingId2;

    public ?string $upcomingId3;

    public string $embedLink;

    public ?string $scheduleFileLink;

    public static function group(): string
    {
        return 'step';
    }
}
