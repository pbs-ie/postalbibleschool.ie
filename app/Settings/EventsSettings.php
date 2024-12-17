<?php

namespace App\Settings;

use Spatie\LaravelSettings\Settings;

class EventsSettings extends Settings
{
    public string $shed_dates;
    public string $shed_location;
    public string $shed_year;
    public string $shed_embedLink;
    public bool $shed_isActive;
    public ?string $shed_consentFormLink;
    public ?string $prizegivings_scheduleFileLink;
    public string $prizegivings_year;
    public bool $prizegivings_isActive;

    public static function group(): string
    {
        return 'events';
    }
}