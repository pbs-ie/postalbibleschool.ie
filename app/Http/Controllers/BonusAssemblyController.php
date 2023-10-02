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
    private function getRules()
    {
        return [
            'monthTitle' => ['required'],
            'imageFile' => ['required', 'image', 'mimetypes:image/png'],
            'videoTitle' => ['required'],
            'externalUrl' => ['required'],
            'duration' => ['required'],
        ];
    }

    public function index()
    {
        $canEdit = Gate::check('create:assembly');
        $config = json_decode(Storage::get('assemblyconfig.json'), false);
        $sortedList = [];
        if (isset($config->bbwContent)) {
            $videoList = json_decode(json_encode($config->bbwContent), true);
            $sortedList = array_values(Arr::sort($videoList, function (array $value) {
                return $value;
            }));
        }
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

        $assemblyConfig = json_decode(Storage::get('assemblyconfig.json'), false);
        if (!isset($assemblyConfig->bbwContent)) {
            $assemblyConfig->bbwContent = [];
        }
        $lastElement = last($assemblyConfig->bbwContent);
        if ($lastElement == null) {
            $assemblyInfo['id'] = 0;
        } else {
            $assemblyInfo['id'] = $lastElement['id'] + 1;
        }
        $assemblyInfo['routename'] = 'bbw' . $assemblyInfo['id'];

        // Storing image for the month
        $imageFile = $imageInfo["imageFile"];

        $path = $imageFile->storeAs('public/video_images', $assemblyInfo['routename'] . '.' . $imageFile->getClientOriginalExtension());

        // Storing updated assembly config file

        $assemblyInfo['imageLink'] = $assemblyConfig->imagesPath . $assemblyInfo['routename'];
        array_push($assemblyConfig->bbwContent, (object)$assemblyInfo);

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
}
