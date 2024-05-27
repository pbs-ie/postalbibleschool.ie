<?php

namespace App\Models;

use App\Http\Requests\StoreStepPastRequest;
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

    protected static function booted(): void
    {
        self::deleting(function (StepPast $stepPast) {
            Storage::disk('images')->delete($stepPast->imageLink);
        });
    }

    public function __construct(array $attributes = [])
    {
        parent::__construct($attributes);
    }

    public function storeFiles(StoreStepPastRequest $request)
    {
        $fileCollection = collect($request->safe(['fileContent'])['fileContent']);
        $fileContent = $fileCollection->map(function ($item, $key) {
            if (isset ($item['fileData'])) {
                if (Storage::disk('public')->exists($item['filePath'])) {
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
