<?php

use Spatie\LaravelSettings\Migrations\SettingsMigration;
use Spatie\LaravelSettings\Migrations\SettingsBlueprint;

return new class extends SettingsMigration {
    public function up(): void
    {
        $this->migrator->inGroup('step', function (SettingsBlueprint $blueprint): void {
            $blueprint->delete('dates');
            $blueprint->delete('topic');
            $blueprint->delete('speaker');
            $blueprint->delete('eventImageLink');

            $blueprint->rename('isActive', 'isRegistrationActive');

            $blueprint->add('activeId', null);
            $blueprint->add('upcomingId1', null);
            $blueprint->add('upcomingId2', null);
            $blueprint->add('upcomingId3', null);
        });
    }

    public function down(): void
    {
        $this->migrator->inGroup('step', function (SettingsBlueprint $blueprint): void {
            $blueprint->add('dates', "14th June - 16th June, 2024");
            $blueprint->add('topic', "Book of Nehemiah");
            $blueprint->add('speaker', "Noel McMeekin");
            $blueprint->add('eventImageLink', "");

            $blueprint->rename('isRegistrationActive', 'isActive');

            $blueprint->delete('activeId');
            $blueprint->delete('upcomingId1');
            $blueprint->delete('upcomingId2');
            $blueprint->delete('upcomingId3');
        });
    }
};
