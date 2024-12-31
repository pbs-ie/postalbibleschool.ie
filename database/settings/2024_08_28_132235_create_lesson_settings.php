<?php

use Spatie\LaravelSettings\Migrations\SettingsBlueprint;
use Spatie\LaravelSettings\Migrations\SettingsMigration;

return new class extends SettingsMigration
{
    public function up(): void
    {
        $this->migrator->inGroup('lesson', function (SettingsBlueprint $blueprint): void {
            $blueprint->add(
                'lesson_map',
                [
                    (object) [
                        'jan_lesson' => 'A1',
                        'feb_lesson' => 'A2',
                        'mar_lesson' => 'A3',
                        'apr_lesson' => 'A4',
                        'may_lesson' => 'A5',
                        'jun_lesson' => 'A6',
                        'sep_lesson' => 'C9',
                        'oct_lesson' => 'C10',
                        'nov_lesson' => 'C11',
                        'dec_lesson' => 'C12',
                    ],
                    (object) [
                        'jan_lesson' => 'B1',
                        'feb_lesson' => 'B2',
                        'mar_lesson' => 'B3',
                        'apr_lesson' => 'B4',
                        'may_lesson' => 'B5',
                        'jun_lesson' => 'B6',
                        'sep_lesson' => 'A9',
                        'oct_lesson' => 'A10',
                        'nov_lesson' => 'A11',
                        'dec_lesson' => 'A12',
                    ],
                    (object) [
                        'jan_lesson' => 'C1',
                        'feb_lesson' => 'C2',
                        'mar_lesson' => 'C3',
                        'apr_lesson' => 'C4',
                        'may_lesson' => 'C5',
                        'jun_lesson' => 'C6',
                        'sep_lesson' => 'B9',
                        'oct_lesson' => 'B10',
                        'nov_lesson' => 'B11',
                        'dec_lesson' => 'B12',
                    ],
                ]
            );

            $blueprint->add('active_index', 0);
        });
    }

    public function down(): void
    {
        $this->migrator->delete('lesson.lesson_map');
        $this->migrator->delete('lesson.active_index');
    }
};
