<?php

namespace App\Services;

use Storage;

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
}