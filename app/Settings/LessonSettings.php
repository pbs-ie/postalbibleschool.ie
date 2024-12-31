<?php

namespace App\Settings;

use Spatie\LaravelSettings\Settings;

class LessonSettings extends Settings
{
    public array $lesson_map;

    public int $active_index;

    public static function group(): string
    {
        return 'lesson';
    }
}
