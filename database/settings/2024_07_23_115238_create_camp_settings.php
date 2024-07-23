<?php

use Spatie\LaravelSettings\Migrations\SettingsBlueprint;
use Spatie\LaravelSettings\Migrations\SettingsMigration;

return new class extends SettingsMigration {
    public function up(): void
    {
        $this->migrator->inGroup('camp', function (SettingsBlueprint $blueprint): void {
            $blueprint->add('dates', "13th to 20th July, 2024");
            $blueprint->add('year', '2024');
            $blueprint->add('embedLink', "https://docs.google.com/forms/d/e/1FAIpQLSdEmA2nUyNVz6Lzb5RxUctJLt3bOBPHp1PG7O-RoP3OCWnCVg/viewform");
            $blueprint->add('isActive', true);
        });
    }
    public function down(): void
    {
        $this->migrator->delete('camp.dates');
        $this->migrator->delete('camp.year');
        $this->migrator->delete('camp.embedLink');
        $this->migrator->delete('camp.isActive');
    }
};
