<?php

use Spatie\LaravelSettings\Migrations\SettingsBlueprint;
use Spatie\LaravelSettings\Migrations\SettingsMigration;

return new class extends SettingsMigration {
    public function up(): void
    {
        $this->migrator->inGroup('step', function (SettingsBlueprint $blueprint): void {
            $blueprint->add('dates', "14th June - 16th June, 2024");
            $blueprint->add('topic', "Book of Nehemiah");
            $blueprint->add('standardCost', "65");
            $blueprint->add('concessionCost', "50");
            $blueprint->add('speaker', "Noel McMeekin");
            $blueprint->add('embedLink', "https://docs.google.com/forms/d/e/1FAIpQLSfRva_FHWeXVNXSj3i-HItkQ997atTb1m-DY9AmAbo5t7wpoA/viewform?usp=sf_link");
            $blueprint->add('isActive', true);
        });
    }

    public function down(): void
    {
        $this->migrator->delete('step.dates');
        $this->migrator->delete('step.topic');
        $this->migrator->delete('step.standardCost');
        $this->migrator->delete('step.concessionCost');
        $this->migrator->delete('step.speaker');
        $this->migrator->delete('step.embedLink');
        $this->migrator->delete('step.isActive');

    }
};
