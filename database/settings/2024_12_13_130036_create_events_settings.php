<?php

use Spatie\LaravelSettings\Migrations\SettingsBlueprint;
use Spatie\LaravelSettings\Migrations\SettingsMigration;

return new class extends SettingsMigration {
    public function up(): void
    {
        $this->migrator->inGroup('events', function (SettingsBlueprint $blueprint): void {
            $blueprint->add('shed_dates', '3rd to 5th May, 2025');
            $blueprint->add('shed_location', 'Mullertown House, Annalong, Co. Down');
            $blueprint->add('shed_year', '2025');
            $blueprint->add('shed_embedLink', 'https://docs.google.com/forms/d/e/1FAIpQLSdiLsqbON8dPgXdxzvJlXvu2I3xKZpHG5p4nz50MfhhUDju4w/viewform');
            $blueprint->add('shed_isActive', false);
            $blueprint->add('shed_consentFormLink', '');
            $blueprint->add('prizegivings_scheduleFileLink', '');
            $blueprint->add('prizegivings_year', '2025');
            $blueprint->add('prizegivings_isActive', false);
        });
    }

    public function down(): void
    {
        $this->migrator->delete('events.shed_dates');
        $this->migrator->delete('events.shed_location');
        $this->migrator->delete('events.shed_year');
        $this->migrator->delete('events.shed_embedLink');
        $this->migrator->delete('events.shed_isActive');
        $this->migrator->delete('events.shed_consentFormLink');
        $this->migrator->delete('events.prizegivings_scheduleFileLink');
        $this->migrator->delete('events.prizegivings_year');
        $this->migrator->delete('events.prizegivings_isActive');
    }
};
