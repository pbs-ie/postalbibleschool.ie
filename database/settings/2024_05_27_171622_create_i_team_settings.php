<?php

use Spatie\LaravelSettings\Migrations\SettingsBlueprint;
use Spatie\LaravelSettings\Migrations\SettingsMigration;

return new class extends SettingsMigration
{
    public function up(): void
    {
        $this->migrator->inGroup('iteam', function (SettingsBlueprint $blueprint): void {
            $blueprint->add('dates', '');
            $blueprint->add('embedLink', '');
            $blueprint->add('isActive', true);
            $blueprint->add('eventImageLink', '');
        });
    }

    public function down(): void
    {
        $this->migrator->delete('iteam.dates');
        $this->migrator->delete('iteam.embedLink');
        $this->migrator->delete('iteam.isActive');
        $this->migrator->delete('iteam.eventImageLink');
    }
};
