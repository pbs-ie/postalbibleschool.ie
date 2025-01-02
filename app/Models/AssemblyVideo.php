<?php

namespace App\Models;

use App\Http\Requests\StoreAssemblyVideoRequest;
use App\Services\VideoService;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Facades\Storage;

class AssemblyVideo extends BaseModel
{
    use HasFactory;

    protected $fillable = [
        'title',
        'month',
        'series',
        'imageLink',
        'videoContent',
    ];

    protected $casts = [
        'videoContent' => 'array',
    ];

    public const columnsAsCamel = [
        'id',
        'title',
        'month',
        'series',
        'image_link as imageLink',
        'video_content as videoContent',
    ];

    protected static function booted(): void
    {
        self::deleting(function (AssemblyVideo $assemblyVideo) {
            // Deleting thumbnail image file
            if (Storage::disk('images')->exists($assemblyVideo->imageLink)) {
                Storage::disk('images')->delete($assemblyVideo->imageLink);
            }
        });
    }

    public function parseVideoLinks(StoreAssemblyVideoRequest $request)
    {
        $videoCollection = collect($request->safe(['videoContent'])['videoContent']);
        $videoContent = $videoCollection->map(function ($item, $key) {
            try {
                $item['externalUrl'] = VideoService::parseExternalUrl($item['externalUrl']);
            } catch (\Exception $e) {
                return redirect()->back()->withErrors(['videoContent.' . $key . '.externalUrl' => 'The external URL is not a valid Vimeo link']);
            }

            return $item;
        });

        return $videoContent;
    }
}
