<?php

namespace App\Models;

use App\Http\Requests\StoreStepEventRequest;
use App\Services\VideoService;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class StepEvent extends Model
{
    use HasFactory;

    protected $fillable = [
        'startDate',
        'endDate',
        'description',
        'topic',
        'speaker',
        'showDetails',
        'imageLink',
        'routename',
        'videoContent',
        'fileContent',
    ];

    protected $casts = [
        'videoContent' => 'array',
        'fileContent' => 'array',
        'startDate' => 'datetime:Y-m-d',
        'endDate' => 'datetime:Y-m-d',
    ];

    protected static function booted(): void
    {
        self::deleting(function (StepEvent $stepPast) {
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

    // /**
    //  * Get the Event date string.
    //  *
    //  * @return \Illuminate\Database\Eloquent\Casts\Attribute
    //  */
    // protected function startDate(): Attribute
    // {
    //     return Attribute::make(
    //         get: fn($value) => Carbon::parse($value)->format('d F Y')
    //     );
    // }

    // /**
    //  * Get the Event date string.
    //  *
    //  * @return \Illuminate\Database\Eloquent\Casts\Attribute
    //  */
    // protected function endDate(): Attribute
    // {
    //     return Attribute::make(
    //         get: fn($value) => Carbon::parse($value)->format('d F Y')
    //     );
    // }

    public function storeFiles(StoreStepEventRequest $request)
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

    public function parseVideoLinks(StoreStepEventRequest $request)
    {
        if (!$request->input('videoContent')) {
            return null;
        }
        $videoCollection = collect($request->safe(['videoContent'])['videoContent']);
        $videoContent = $videoCollection->map(function ($item, $key) {
            try {
                $item['externalUrl'] = VideoService::parseExternalUrl($item['externalUrl']);
            } catch (\Exception $e) {
                throw new \Exception('The external URL is not a valid Vimeo link', $key);
            }

            return $item;
        });

        return $videoContent;
    }
}
