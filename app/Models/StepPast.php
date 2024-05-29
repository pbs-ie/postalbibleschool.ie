<?php

namespace App\Models;

use App\Http\Requests\StoreStepPastRequest;
use App\Services\VideoService;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Support\Facades\Storage;

class StepPast extends Model
{
    use HasFactory;

    protected $fillable = [
        'date',
        'description',
        'title',
        'showDetails',
        'imageLink',
        'routename',
        'videoContent',
        'fileContent'
    ];

    protected $casts = [
        'videoContent' => 'array',
        'fileContent' => 'array'
    ];

    protected $dates = ['date'];

    protected static function booted(): void
    {
        self::deleting(function (StepPast $stepPast) {
            // Deleting thumbnail image file
            if (Storage::disk('images')->exists($stepPast->imageLink)) {
                Storage::disk('images')->delete($stepPast->imageLink);
            }

            // Deleting stored files
            collect($stepPast->fileContent)->each(function ($item, $key) {
                if (isset($item['filePath']) && Storage::disk('public')->exists($item['filePath'])) {
                    Storage::disk('public')->delete($item['filePath']);
                }
            });
        });
    }

    /**
     * Get the Event date string.
     *
     * @return \Illuminate\Database\Eloquent\Casts\Attribute
     */
    protected function date(): Attribute
    {
        return Attribute::make(
            get: fn($value) => Carbon::parse($value)->format('F Y')
        );
    }

    public function storeFiles(StoreStepPastRequest $request)
    {
        if (!$request->input('fileContent')) {
            return null;
        }
        $fileCollection = collect($request->safe(['fileContent'])['fileContent']);
        $fileContent = $fileCollection->map(function ($item, $key) {
            if (!isset($item['fileData'])) {
                return $item;
            }
            if (isset($item['filePath']) && Storage::disk('public')->exists($item['filePath'])) {
                Storage::disk('public')->delete($item['filePath']);
            }
            $item['filePath'] = $item['fileData']->store('video_files', 'public');
            unset($item['fileData']);
            return $item;
        });
        return $fileContent;
    }

    public function parseVideoLinks(StoreStepPastRequest $request)
    {
        $videoCollection = collect($request->safe(['videoContent'])['videoContent']);
        $videoContent = $videoCollection->map(function ($item) {
            $item['externalUrl'] = (new VideoService)->parseExternalUrl($item['externalUrl']);
            return $item;
        });

        return $videoContent;
    }
}
