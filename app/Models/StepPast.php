<?php

namespace App\Models;

use App\Http\Requests\StoreStepPastRequest;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

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
            Storage::disk('images')->delete($stepPast->imageLink);
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
        $fileCollection = collect($request->safe(['fileContent'])['fileContent']);
        $fileContent = $fileCollection->map(function ($item, $key) {
            if (isset ($item['fileData'])) {
                if (isset ($item['filePath']) && Storage::disk('public')->exists($item['filePath'])) {
                    Storage::disk('public')->delete($item['filePath']);
                }
                $item['filePath'] = $item['fileData']->store('video_files', 'public');
                unset ($item['fileData']);
            }
            return $item;
        });
        return $fileContent;
    }
}
