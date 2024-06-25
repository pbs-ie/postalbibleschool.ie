<?php

use Spatie\LaravelSettings\Migrations\SettingsMigration;

return new class extends SettingsMigration {
    public function up(): void
    {
        $this->migrator->add('step.description', "Join us for the upcoming STEP in June 2024 where we go through the book of Nehemiah led by Noel McMeekin. We would encourage you to read/study chapters in the book of Nehemiah beforehand. As always, new faces are welcome!");
    }
    public function down(): void
    {
        $this->migrator->delete('step.description');
    }
};
