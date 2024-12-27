<?php

namespace App\Settings;

use Spatie\LaravelSettings\Settings;

class StepSettings extends Settings
{

    public ?string $description;
    public string $standardCost;
    public string $concessionCost;

    public bool $isRegistrationActive;
    public ?int $activeId;
    public ?int $upcomingId1;
    public ?int $upcomingId2;
    public ?int $upcomingId3;
    public string $embedLink;
    public ?string $scheduleFileLink;

    public static function group(): string
    {
        return 'step';
    }
}