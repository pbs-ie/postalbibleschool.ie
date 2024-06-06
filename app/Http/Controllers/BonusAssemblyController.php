<?php

namespace App\Http\Controllers;

use App\Services\VideoService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Validator;
use StdClass;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Log;

class BonusAssemblyController extends Controller
{
    private function getVideoList()
    {
        $assemblyConfig = json_decode(Storage::get('assemblyconfig.json'), false);
        if (!isset($assemblyConfig->bonusContent) || !is_array($assemblyConfig->bonusContent) || empty($assemblyConfig->bonusContent)) {
            return false;
        }
        return $assemblyConfig->bonusContent;
    }
    private function getRules()
    {
        return [
            'monthTitle' => ['required'],
            'imageFile' => ['required', 'image', 'mimetypes:image/png'],
            'videoTitle' => ['required'],
            'externalUrl' => ['required'],
            'duration' => ['required'],
            'routename' => [],
            'category' => [
                'required',
                function ($attribute, $value, $fail) {
                    if ($value !== "bbw" && $value !== "bbooks") {
                        $fail('Expected either "Big Bible Words" or "Bible Books');
                    }
                }
            ]
        ];
    }

    public function index()
    {
        $canEdit = Gate::check('create:assembly');
        $videoList = json_decode(json_encode($this->getVideoList()), true);
        if ($videoList === false) {
            return redirect()->route('assembly.index')->with('failure', 'No file in system');
        }
        $bbwList = array_filter($videoList, function ($listItem) {
            return $listItem['category'] === 'bbw';
        });

        $bbooksList = array_filter($videoList, function ($listItem) {
            return $listItem['category'] === 'bbooks';
        });
        $sortedBbwList = array_values(Arr::sort($bbwList, function (array $value) {
            return $value;
        }));
        $sortedBbooksList = array_values(Arr::sort($bbooksList, function (array $value) {
            return $value;
        }));
        return Inertia::render('Assembly/Bonus/Index', [
            'bbwList' => $sortedBbwList,
            'bbooksList' => $sortedBbooksList,
            'canEdit' => $canEdit
        ]);
    }

    public function create()
    {
        return Inertia::render('Assembly/Bonus/Create');
    }

    public function store(Request $request)
    {
        $rules = $this->getRules();
        $validator = Validator::make($request->all(), $rules, [], [
            'monthTitle' => 'Main Title',
        ]);

        $imageInfo = $validator->safe()->only(['imageFile']);
        $assemblyInfo = $validator->safe()->except(['imageFile', 'videoTitle', 'externalUrl', 'duration']);
        $videoInfo = $validator->safe()->only(['videoTitle', 'externalUrl', 'duration']);

        $videoList = $this->getVideoList();
        $assemblyConfig = json_decode(Storage::get('assemblyconfig.json'), false);
        if ($videoList === false) {
            $videoList = [];
            $assemblyInfo['id'] = 0;
        } else {
            $lastElement = last($videoList);
            $assemblyInfo['id'] = $lastElement->id + 1;
        }
        $assemblyInfo['routename'] = 'bonus' . $assemblyInfo['id'];

        // Storing image for the month
        $imageFile = $imageInfo["imageFile"];

        $path = $imageFile->storeAs('public/video_images', $assemblyInfo['routename'] . '.' . $imageFile->getClientOriginalExtension());

        // Storing updated assembly config file

        $assemblyInfo['imageLink'] = $assemblyConfig->imagesPath . $assemblyInfo['routename'];
        array_push($videoList, (object) $assemblyInfo);

        $assemblyConfig->bonusContent = $videoList;

        // Storing updated video config file for the month
        $videoConfig = new stdClass();
        $videoConfig->title = $assemblyInfo['monthTitle'];
        $videoConfig->imageId = $assemblyInfo['routename'];

        $videoConfig->content[0]['id'] = 0;
        $videoConfig->content[0]['title'] = $videoInfo['videoTitle'];
        $videoConfig->content[0]['externalUrl'] = (new VideoService)->parseExternalUrl($videoInfo['externalUrl']);
        $videoConfig->content[0]['duration'] = $videoInfo['duration'];

        $storeConfigSuccess = Storage::put(
            'assemblyconfig.json',
            json_encode($assemblyConfig, JSON_PRETTY_PRINT)
        );
        $videoConfigSuccess = Storage::put(
            $assemblyConfig->jsonPath . strtolower($assemblyInfo['routename']) . '.json',
            json_encode($videoConfig, JSON_PRETTY_PRINT)
        );


        if (!$storeConfigSuccess || !$videoConfigSuccess) {
            return redirect()->route('assembly.bonus.admin')->with('failure', 'Something went wrong');
        } else {
            return redirect()->route('assembly.bonus.admin')->with('success', 'Video added successfully');
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int $id
     * @return \Inertia\Response | \Illuminate\Http\RedirectResponse
     */
    public function edit(int $id)
    {
        $assemblyConfig = json_decode(Storage::get('assemblyconfig.json'), false);
        $videoList = $this->getVideoList();
        if ($videoList === false) {
            return redirect()->route('assembly.bonus.admin')->with('failure', 'Missing file in system');
        }
        $videoData = $videoList[$id - 1];
        $fileName = strtolower($videoData->routename);

        $filePath = $assemblyConfig->jsonPath . $fileName . '.json';
        $fileContent = (json_decode(Storage::get($filePath), false))->content;
        $finalVideoData = (object) array_merge((array) $videoData, (array) $fileContent[0]);

        return Inertia::render('Assembly/Bonus/Edit', [
            "videoData" => $finalVideoData
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int $id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(Request $request, int $id)
    {
        $rules = $this->getRules();
        $rules['imageLink'] = [];
        $validator = Validator::make($request->all(), $rules, [], [
            'monthTitle' => 'Main Title',
        ]);

        $imageInfo = $validator->safe()->only(['imageFile']);
        $assemblyInfo = $validator->safe()->except(['imageFile', 'videoTitle', 'externalUrl', 'duration']);
        $videoInfo = $validator->safe()->only(['videoTitle', 'externalUrl', 'duration']);

        $videoList = $this->getVideoList();
        $currentRoutename = $videoList[$id]->routename;
        if ($videoList === false) {
            return redirect()->route('assembly.bonus.admin')->with('failure', 'Missing file in system');
        }
        $assemblyConfig = json_decode(Storage::get('assemblyconfig.json'), false);

        $videoConfigPath = $assemblyConfig->jsonPath . strtolower($currentRoutename) . '.json';
        if (!Storage::exists($videoConfigPath)) {
            return redirect()->route('assembly.bonus.admin')->with('failure', 'Could not find associated file');
        }

        // Storing image for the month
        if ($imageInfo) {
            $imageFile = $imageInfo["imageFile"];
            if (isset($imageFile)) {
                $path = $imageFile->storeAs('public/video_images', $currentRoutename . '.' . $imageFile->getClientOriginalExtension());
                $assemblyInfo['imageLink'] = $assemblyConfig->imagesPath . $currentRoutename;
            }
        }
        $bonusConfigUpdate = $assemblyConfig->bonusContent[$id];
        $bonusConfigUpdate->monthTitle = $assemblyInfo['monthTitle'];
        $bonusConfigUpdate->imageLink = $assemblyInfo['imageLink'];
        $bonusConfigUpdate->category = $assemblyInfo['category'];

        // Storing updated assembly config file
        $assemblyConfig->bonusContent[$id] = $bonusConfigUpdate;

        // Storing updated video config file for the month
        $videoConfig = new stdClass();
        $videoConfig->title = $assemblyInfo['monthTitle'];
        $videoConfig->imageId = $currentRoutename;

        $videoConfig->content[0]['id'] = 0;
        $videoConfig->content[0]['title'] = $videoInfo['videoTitle'];
        $videoConfig->content[0]['externalUrl'] = (new VideoService)->parseExternalUrl($videoInfo['externalUrl']);
        $videoConfig->content[0]['duration'] = $videoInfo['duration'];

        $storeConfigSuccess = Storage::put(
            'assemblyconfig.json',
            json_encode($assemblyConfig, JSON_PRETTY_PRINT)
        );

        $videoConfigSuccess = Storage::put(
            $videoConfigPath,
            json_encode($videoConfig, JSON_PRETTY_PRINT)
        );


        if (!$storeConfigSuccess || !$videoConfigSuccess) {
            return redirect()->route('assembly.bonus.admin')->with('failure', 'Something went wrong');
        } else {
            return redirect()->route('assembly.bonus.admin')->with('success', 'Video updated successfully');
        }
    }




    /**
     * Remove the specified resource from storage.
     *
     * @param  int $id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy(int $id)
    {
        $assemblyConfig = json_decode(Storage::get('assemblyconfig.json'), false);
        $fileName = strtolower($assemblyConfig->bonusContent[$id - 1]->routename);

        $filePath = $assemblyConfig->jsonPath . $fileName . '.json';
        $pngPath = 'video_images/' . $fileName . '.png';

        // TODO: This check does not need to prevent the deletion
        if (!Storage::disk('local')->exists($filePath) || !Storage::disk('public')->exists($pngPath)) {
            return redirect()->route('assembly.bonus.admin')->with('failure', 'Missing file in system');
        }

        try {
            // Destroy the .json file for the month
            Storage::disk('local')->delete($filePath);

            // Destroy the image for the month
            Storage::disk('public')->delete($pngPath);

            // Remove the entry in assembly config for the month
            $filteredContent = array_filter($assemblyConfig->bonusContent, function ($item) use ($id) {
                return $item->id !== $id;
            });
            $assemblyConfig->bonusContent = array_values($filteredContent);
            Storage::put('assemblyconfig.json', json_encode($assemblyConfig, JSON_PRETTY_PRINT));
        } catch (\Exception $ex) {
            Log::error($ex->getMessage());
        }

        return redirect()->route('assembly.bonus.admin')->with('success', 'Video removed successfully');
    }

    public function admin()
    {
        $videoList = $this->getVideoList();
        return Inertia::render('Assembly/Bonus/Admin', [
            'videoList' => $videoList
        ]);
    }
}
