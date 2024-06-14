<?php

use Spatie\LaravelSettings\Migrations\SettingsMigration;

return new class extends SettingsMigration {
    public function up(): void
    {
        $this->migrator->add('step.scheduleFileLink', "");
    }
    public function down(): void
    {
        $this->migrator->delete('step.scheduleFileLink');
    }
};
