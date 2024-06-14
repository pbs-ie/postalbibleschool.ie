<?php

namespace App\Settings;

use Spatie\LaravelSettings\Settings;

class StepSettings extends Settings
{

    public string $dates;
    public string $topic;
    public string $standardCost;
    public string $concessionCost;
    public string $speaker;
    public string $embedLink;
    public bool $isActive;
    public string $eventImageLink;
    public string $scheduleFileLink;

    public static function group(): string
    {
        return 'step';
    }
}