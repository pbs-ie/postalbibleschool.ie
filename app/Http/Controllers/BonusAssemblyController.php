<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Arr;
use App\Http\Controllers\AssemblyController;
use Illuminate\Support\Facades\Validator;
use StdClass;
use Illuminate\Support\Facades\Gate;

class BonusAssemblyController extends Controller
{
    private function getVideoList()
    {
        $assemblyConfig = json_decode(Storage::get('assemblyconfig.json'), false);
        if (!isset($assemblyConfig->bbwContent) || !is_array($assemblyConfig->bbwContent) || empty($assemblyConfig->bbwContent)) {
            return false;
        }
        return $assemblyConfig->bbwContent;
    }
    private function getRules()
    {
        return [
            'monthTitle' => ['required'],
            'imageFile' => ['required', 'image', 'mimetypes:image/png'],
            'videoTitle' => ['required'],
            'externalUrl' => ['required'],
            'duration' => ['required'],
            'routename' => ['required']
        ];
    }

    public function index()
    {
        $canEdit = Gate::check('create:assembly');
        $videoList = json_decode(json_encode($this->getVideoList()), true);
        if ($videoList === false) {
            return redirect()->back()->with('failure', 'Missing file in system');
        }
        $sortedList = [];
        $sortedList = array_values(Arr::sort($videoList, function (array $value) {
            return $value;
        }));
        return Inertia::render('Assembly/Bonus/Index', [
            'videoList' => $sortedList,
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
        $assemblyInfo['routename'] = 'bbw' . $assemblyInfo['id'];

        // Storing image for the month
        $imageFile = $imageInfo["imageFile"];

        $path = $imageFile->storeAs('public/video_images', $assemblyInfo['routename'] . '.' . $imageFile->getClientOriginalExtension());

        // Storing updated assembly config file

        $assemblyInfo['imageLink'] = $assemblyConfig->imagesPath . $assemblyInfo['routename'];
        array_push($videoList, (object)$assemblyInfo);

        // Storing updated video config file for the month
        $videoConfig = new stdClass();
        $videoConfig->title = $assemblyInfo['monthTitle'];
        $videoConfig->imageId = $assemblyInfo['routename'];

        $videoConfig->content[0]['id'] = 0;
        $videoConfig->content[0]['title'] = $videoInfo['videoTitle'];
        $videoConfig->content[0]['externalUrl'] = (new AssemblyController)->parseExternalUrl($videoInfo['externalUrl']);
        $videoConfig->content[0]['duration'] = $videoInfo['duration'];

        $storeConfigSuccess = Storage::put(
            'assemblyconfig.json',
            json_encode($assemblyConfig)
        );
        $videoConfigSuccess = Storage::put(
            $assemblyConfig->jsonPath . strtolower($assemblyInfo['routename']) . '.json',
            json_encode($videoConfig)
        );


        if (!$storeConfigSuccess || !$videoConfigSuccess) {
            return redirect()->back()->with('failure', 'Something went wrong');
        } else {
            return redirect()->route('assembly.bonus.index')->with('success', 'Video added successfully');
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function edit(int $id)
    {
        $assemblyConfig = json_decode(Storage::get('assemblyconfig.json'), false);
        $videoList = $this->getVideoList();
        if ($videoList === false) {
            return redirect()->back()->with('failure', 'Missing file in system');
        }
        $videoData = $videoList[$id];
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
     * @return \Illuminate\Http\Response
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
            return redirect()->back()->with('failure', 'Missing file in system');
        }
        $assemblyConfig = json_decode(Storage::get('assemblyconfig.json'), false);

        $videoConfigPath = $assemblyConfig->jsonPath . strtolower($currentRoutename) . '.json';
        if (!Storage::exists($videoConfigPath)) {
            return redirect()->back()->with('failure', 'Could not find associated file');
        }

        // Storing image for the month
        if ($imageInfo) {
            $imageFile = $imageInfo["imageFile"];
            if (isset($imageFile)) {
                $path = $imageFile->storeAs('public/video_images', $currentRoutename . '.' . $imageFile->getClientOriginalExtension());
                $assemblyInfo['imageLink'] = $assemblyConfig->imagesPath . $currentRoutename;
            }
        }

        $bbwConfigUpdate = $assemblyConfig->bbwContent[$id];
        $bbwConfigUpdate->monthTitle = $assemblyInfo['monthTitle'];
        $bbwConfigUpdate->imageLink = $assemblyInfo['imageLink'];

        // Storing updated assembly config file
        $assemblyConfig->bbwContent[$id] = $bbwConfigUpdate;

        // Storing updated video config file for the month
        $videoConfig = new stdClass();
        $videoConfig->title = $assemblyInfo['monthTitle'];
        $videoConfig->imageId = $currentRoutename;

        $videoConfig->content[0]['id'] = 0;
        $videoConfig->content[0]['title'] = $videoInfo['videoTitle'];
        $videoConfig->content[0]['externalUrl'] = (new AssemblyController)->parseExternalUrl($videoInfo['externalUrl']);
        $videoConfig->content[0]['duration'] = $videoInfo['duration'];

        $storeConfigSuccess = Storage::put(
            'assemblyconfig.json',
            json_encode($assemblyConfig)
        );

        $videoConfigSuccess = Storage::put(
            $videoConfigPath,
            json_encode($videoConfig)
        );


        if (!$storeConfigSuccess || !$videoConfigSuccess) {
            return redirect()->back()->with('failure', 'Something went wrong');
        } else {
            return redirect()->route('assembly.bonus.admin')->with('success', 'Video updated successfully');
        }
    }




    /**
     * Remove the specified resource from storage.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(int $id)
    {
        $assemblyConfig = json_decode(Storage::get('assemblyconfig.json'), false);
        $fileName = strtolower($assemblyConfig->bbwContent[$id]->routename);

        $filePath = $assemblyConfig->jsonPath . $fileName . '.json';
        $pngPath = 'video_images/' . $fileName . '.png';


        // TODO: This check does not need to prevent the deletion
        if (!Storage::disk('local')->exists($filePath) || !Storage::disk('public')->exists($pngPath)) {
            return redirect()->back()->with('failure', 'Missing file in system');
        }

        // Destroy the .json file for the month
        Storage::disk('local')->delete($filePath);

        // Destroy the image for the month
        Storage::disk('public')->delete($pngPath);

        // Remove the entry in assembly config for the month
        $assemblyConfig->bbwContent = array_filter($assemblyConfig->bbwContent, function ($item) use ($id) {
            return $item->id !== $id;
        });
        Storage::put('assemblyconfig.json', json_encode($assemblyConfig));

        return redirect()->route('assembly.admin')->with('success', 'Video removed successfully');
    }

    public function admin()
    {
        $videoList = $this->getVideoList();
        if (!$videoList) {
            return redirect()->back()->with('failure', 'Missing file in system');
        }
        return Inertia::render('Assembly/Bonus/Admin', [
            'videoList' => $videoList
        ]);
    }
}
