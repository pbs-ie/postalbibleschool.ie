<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Facades\Storage;

class BonusVideo extends BaseModel
{
    use HasFactory;

    protected $fillable = [
        'title',
        'category',
        'imageLink',
        'videoTitle',
        'externalUrl',
        'duration',
    ];

    public const columnsAsCamel = [
        'id',
        'title',
        'category',
        'image_link as imageLink',
        'video_title as videoTitle',
        'external_url as externalUrl',
        'duration',
    ];

    protected static function booted(): void
    {
        self::deleting(function (BonusVideo $bonusVideo) {
            // Deleting thumbnail image file
            if (Storage::disk('images')->exists($bonusVideo->imageLink)) {
                Storage::disk('images')->delete($bonusVideo->imageLink);
            }
        });
    }
}
