<?php

namespace App\Services;

use App\Settings\StepSettings;
use Storage;
use App\Models\StepEvent;
use Illuminate\Support\Collection;

class SettingsService
{
    public static function saveNewFile($newFile, $settingsLinkParam, $settings)
    {
        if ($settings->{$settingsLinkParam} && Storage::disk('public')->exists($settings->{$settingsLinkParam})) {
            Storage::disk('public')->delete($settings->{$settingsLinkParam});
        }
        $storagePath = Storage::disk('public')->put('/files', $newFile);
        $settings->{$settingsLinkParam} = $storagePath;
    }

    public static function saveNewImage($newFile, $settingsLinkParam, $settings)
    {
        if ($settings->{$settingsLinkParam} && Storage::disk('images')->exists($settings->{$settingsLinkParam})) {
            Storage::disk('images')->delete($settings->{$settingsLinkParam});
        }
        $storagePath = Storage::disk('images')->put('/event_images', $newFile);
        $settings->{$settingsLinkParam} = $storagePath;
    }

    /**
     * Get all events as option for select input
     * @param \Illuminate\Support\Collection<StepEvent> $stepEvents
     * @return mixed
     */
    public static function getEventOptions(Collection $stepEvents, StepSettings $settings)
    {
        return $stepEvents->map(function ($event) use ($settings) {
            return [
                'id' => $event->id,
                'topic' => $event->topic
            ];
        });
    }
}