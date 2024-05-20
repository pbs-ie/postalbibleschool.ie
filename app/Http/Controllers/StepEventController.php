<?php

namespace App\Http\Controllers;

use App\Settings\StepSettings;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\AssemblyController;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use stdClass;

class StepEventController extends Controller
{
    private function sortArrayByParam($array, string $byParam)
    {
        usort($array, function ($a, $b) use ($byParam) {
            if ((int) $a[$byParam] === (int) $b[$byParam]) {
                return 0;
            }
            return (int) $a[$byParam] < (int) $b[$byParam] ? -1 : 1;
        });
    }
    private function getStepConfig()
    {
        return json_decode(Storage::get('stepconfig.json'), false);
    }
    private function getUploadedFilesPath(string $routename, string $filename)
    {

        return 'video_files/' . $routename . '/' . $filename;
    }
    private function getRules()
    {
        return [
            'date' => ['required'],
            'description' => ['required'],
            'heading' => ['required'],
            'imageFile' => ['required', 'image', 'mimes:png,jpg'],
            'showDetails' => ['required', 'boolean'],
            'content' => ['array:title,externalUrl,duration', 'max:20', 'min:1'],
            'fileContent' => ['array:id,title,name,type,filePath,fileData', 'max:20'],
            'fileContent.*.type' => ['required'],
            'fileContent.*.fileData' => ['nullable', 'mimes:pdf'],
        ];
    }

    private function getCustomAttributes()
    {
        return [
            'content' => 'Video information',
            'content.*.externalUrl' => 'External Url',
            'content.*.duration' => 'Duration',
            'fileContent' => 'Files information',
            'fileContent.*.name' => 'File Name',
            'fileContent.*.type' => 'File Type',
            'fileContent.*.fileData' => 'Uploaded file',
        ];
    }

    private function searchMatchingContent($value, $parameter, $content)
    {
        foreach ($content as $event) {
            $eventArray = (array) $event;
            if ($eventArray[$parameter] === $value) {
                return $event;
            }
        }
        return null;
    }

    public function index()
    {
        return Inertia::render('Events/Step/Index');
    }

    public function signup(StepSettings $stepSettings)
    {
        return Inertia::render('Events/Step/Signup', [
            'stepSettings' => $stepSettings
        ]);
    }

    public function gallery()
    {
        $config = $this->getStepConfig();
        return Inertia::render('Events/Step/Past/Gallery', [
            'content' => $config->content
        ]);
    }

    public function show(string $eventName)
    {
        $config = $this->getStepConfig();
        $content = $config->content;
        $event = $this->searchMatchingContent($eventName, 'routename', $content);

        $jsonContent = new stdClass();

        $fileName = strtolower($eventName);
        $filePath = 'video_json/' . $fileName . '.json';
        if (Storage::disk('local')->exists($filePath)) {

            $content = Storage::disk('local')->get($filePath);
            $jsonContent = json_decode($content, false);
        }
        if ($jsonContent == new stdClass()) {
            return Inertia::render('NotFound');
        }

        return Inertia::render('Events/Step/Past/Show', [
            'videoData' => $jsonContent
        ]);
    }

    /**
     * Display admin panel for the past resources.
     *
     * @return \Inertia\Response
     */
    public function admin()
    {
        $config = $this->getStepConfig();
        $videoList = $config->content;
        return Inertia::render('Events/Step/Past/Admin', [
            'videoList' => $videoList
        ]);
    }
    /**
     * Show the form for creating a new resource.
     *
     * @return \Inertia\Response
     */
    public function create()
    {
        return Inertia::render('Events/Step/Past/Create');
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(Request $request)
    {
        $rules = $this->getRules();
        $validator = Validator::make($request->all(), $rules, [], $this->getCustomAttributes());

        $videoData = $validator->safe()->only(['content']);
        $imageData = $validator->safe()->only(['imageFile']);
        $fileData = $validator->safe()->only(['fileContent']);
        $configData = $validator->safe()->except(['content', 'imageFile', 'fileContent']);

        $configData['routename'] = Str::kebab("step " . $configData["date"]);
        // Storing updated step config file
        $stepConfig = json_decode(Storage::get('stepconfig.json'), false);
        $configData['id'] = count($stepConfig->content);
        $configData['imageLink'] = $stepConfig->imagePath . $configData['routename'];
        array_push($stepConfig->content, (object) $configData);
        // Storing image for the month
        $imageFile = $imageData["imageFile"];

        $path = $imageFile->storeAs('public/video_images', $configData['routename'] . '.' . strtolower($imageFile->getClientOriginalExtension()));


        // Storing updated video config file for the month
        $videoConfig = new stdClass();
        $videoConfig->title = $configData['heading'];
        $videoConfig->date = $configData['date'];
        $videoConfig->imageId = $configData['routename'];
        $videoConfig->content = $videoData['content'];
        $videoConfig->fileContent = $fileData['fileContent'] ?? [];

        for ($i = 0; $i < count($videoConfig->content); $i++) {
            $videoConfig->content[$i]['id'] = $i;
            $videoConfig->content[$i]['externalUrl'] = (new AssemblyController())->parseExternalUrl($videoConfig->content[$i]['externalUrl']);
        }

        // Storing additional files
        for ($i = 0; $i < count($videoConfig->fileContent); $i++) {
            $videoConfig->fileContent[$i]['id'] = $i;
            $uploadedFile = $videoConfig->fileContent[$i]['fileData'];
            $filePath = $uploadedFile->storeAs('public/video_files/' . $configData['routename'], $configData['routename'] . '_' . strtolower(Str::random(9)) . '.' . strtolower($uploadedFile->getClientOriginalExtension()));
            $videoConfig->fileContent[$i]['filePath'] = $stepConfig->filePath . $configData['routename'] . '/' . Storage::name($filePath);
            unset($videoConfig->fileContent[$i]['fileData']);
        }

        $storeConfigSuccess = Storage::put(
            'stepconfig.json',
            json_encode($stepConfig, JSON_PRETTY_PRINT)
        );
        $videoConfigSuccess = Storage::put(
            $stepConfig->jsonPath . strtolower($configData['routename']) . '.json',
            json_encode($videoConfig, JSON_PRETTY_PRINT)
        );


        if (!$storeConfigSuccess || !$videoConfigSuccess) {
            return redirect()->back()->with('failure', 'Something went wrong');
        } else {
            return redirect()->route('events.step.past.admin')->with('success', 'Event added successfully');
        }
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\RedirectResponse | \Inertia\Response
     */
    public function edit(int $id)
    {
        $stepConfig = $this->getStepConfig();
        $event = $this->searchMatchingContent($id, 'id', $stepConfig->content);
        if ($event === null) {
            return redirect()->route('events.step.past.admin')->with('failure', 'Missing file in system');
        }
        $fileName = strtolower($event->routename);

        $filePath = $stepConfig->jsonPath . $fileName . '.json';
        $fileData = (json_decode(Storage::get($filePath), false));

        if (isset($fileData->content)) {
            $event->content = $fileData->content;
        }
        if (isset($fileData->fileContent)) {
            $event->fileContent = $fileData->fileContent;
        }

        return Inertia::render('Events/Step/Past/Edit', [
            "videoData" => $event
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
        $rules['imageFile'] = ['nullable'];
        $validator = Validator::make($request->all(), $rules, [], $this->getCustomAttributes());

        $videoData = $validator->safe(['content']);
        $imageData = $validator->safe(['imageFile']);
        $fileData = $validator->safe(['fileContent']);
        $configData = $validator->safe()->except(['imageFile', 'content', 'fileContent']);

        $stepConfig = $this->getStepConfig();

        $currentEvent = $this->searchMatchingContent($id, 'id', $stepConfig->content);
        if ($currentEvent === null) {
            return redirect()->route('events.step.past.admin')->with('failure', 'Missing event in system');
        }
        $fileName = strtolower($currentEvent->routename);


        $eventConfigPath = $stepConfig->jsonPath . $fileName . '.json';
        if (!Storage::exists($eventConfigPath)) {
            return redirect()->route('events.step.past.admin')->with('failure', 'Could not find associated file');
        }

        // Updating image for the month
        if ($imageData) {
            $imageFile = $imageData["imageFile"];
            if (isset($imageFile)) {
                $path = $imageFile->storeAs('public/video_images', $fileName . '.' . $imageFile->getClientOriginalExtension());
                $configData['imageLink'] = $stepConfig->imagesPath . $fileName;
            }
        }

        // Updating step config content
        foreach ($stepConfig->content as $event) {
            if ($event->id === $id) {
                $event->date = $configData['date'];
                $event->heading = $configData['heading'];
                $event->description = $configData['description'];
                $event->showDetails = $configData['showDetails'];
                $event->imageLink = $configData['imageLink'];
                break;
            }
        }

        // Storing updated event config file 
        $eventConfig = new stdClass();
        $eventConfig->title = $configData['heading'];
        $eventConfig->date = $configData['date'];
        $eventConfig->imageId = $fileName;
        $eventConfig->content = $videoData['content'];
        $eventConfig->fileContent = $fileData['fileContent'] ?? [];

        $this->sortArrayByParam($eventConfig->content, 'id');
        for ($i = 0; $i < count($eventConfig->content); $i++) {
            $eventConfig->content[$i]['id'] = $i;
            $eventConfig->content[$i]['externalUrl'] = (new AssemblyController())->parseExternalUrl($eventConfig->content[$i]['externalUrl']);
        }
        $this->sortArrayByParam($eventConfig->fileContent, 'id');
        for ($i = 0; $i < count($eventConfig->fileContent); $i++) {
            $eventConfig->fileContent[$i]['id'] = $i;

            if (array_key_exists('fileData', $eventConfig->fileContent[$i]) && isset($eventConfig->fileContent[$i]['fileData'])) {
                $uploadedFile = $eventConfig->fileContent[$i]['fileData'];
                $newFilePath = $uploadedFile->storeAs('public/video_files/' . $currentEvent->routename, $currentEvent->routename . '_' . strtolower(Str::random(9)) . '.' . strtolower($uploadedFile->getClientOriginalExtension()));
                $eventConfig->fileContent[$i]['filePath'] = $stepConfig->filePath . $currentEvent->routename . '/' . basename($newFilePath);
                unset($eventConfig->fileContent[$i]['fileData']);
            } else if (array_key_exists('filePath', $eventConfig->fileContent[$i])) {
                $fileName = Str::after($eventConfig->fileContent[$i]['filePath'], $stepConfig->filePath . $currentEvent->routename);
                $filePath = $this->getUploadedFilesPath($currentEvent->routename, $fileName);
                if (Storage::disk('public')->exists($filePath)) {
                    continue;
                } else {
                    Log::warning("Could not find file in system : " . $fileName, [$filePath, $currentEvent->routename]);
                }
            } else {
                unset($eventConfig->fileContent[$i]);
                $i--;
            }
        }

        $storeConfigSuccess = Storage::put(
            'stepconfig.json',
            json_encode($stepConfig, JSON_PRETTY_PRINT)
        );

        $eventConfigSuccess = Storage::put(
            $eventConfigPath,
            json_encode($eventConfig, JSON_PRETTY_PRINT)
        );


        if (!$storeConfigSuccess || !$eventConfigSuccess) {
            return redirect()->route('events.step.past.admin')->with('failure', 'Something went wrong');
        } else {
            return redirect()->route('events.step.past.admin')->with('success', 'Event updated successfully');
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
        $stepConfig = $this->getStepConfig();
        $event = $this->searchMatchingContent($id, 'id', $stepConfig->content);
        $fileName = strtolower($event->routename);

        $filePath = $stepConfig->jsonPath . $fileName . '.json';

        $allVideoImages = Storage::disk('public')->files('video_images/');
        $matchingImages = array_values(array_filter($allVideoImages, function ($image) use ($fileName) {
            return Str::startsWith(basename($image), $fileName);
        }));

        $allSavedFiles = Storage::disk('public')->allFiles('video_files/');
        $associatedFiles = array_values(array_filter($allSavedFiles, function ($file) use ($fileName) {
            return Str::startsWith(basename($file), $fileName);
        }));


        // TODO: This check does not need to prevent the deletion
        if (!Storage::disk('local')->exists($filePath)) {
            return redirect()->route('events.step.past.admin')->with('failure', 'Missing file in system');
        }

        try {
            // Destroy the .json file for the event
            Storage::disk('local')->delete($filePath);

            // Destroy associated files uploaded for the event
            Storage::disk('public')->delete($associatedFiles);

            // Destroy the image for the event
            Storage::disk('public')->delete($matchingImages);

            // Remove the entry in step config for the event
            $filteredContent = array_filter($stepConfig->content, function ($item) use ($id) {
                return $item->id !== $id;
            });
            $stepConfig->content = array_values($filteredContent);
            Storage::put('stepconfig.json', json_encode($stepConfig, JSON_PRETTY_PRINT));
        } catch (\Exception $ex) {
            Log::error($ex->getMessage());
        }

        return redirect()->route('events.step.past.admin')->with('success', 'Video removed successfully');
    }

    public function schedule()
    {
        return Inertia::render('Events/Step/Index');
    }

    public function getImage($imageId)
    {
        $fileName = strtolower($imageId);
        $filePathJpg = 'video_images/' . $fileName . '.jpg';
        $filePathPng = 'video_images/' . $fileName . '.png';


        if (Storage::disk('public')->exists($filePathPng)) {
            return response()->file(Storage::disk('public')->path($filePathPng), ['Content-type' => 'image/png']);
        } else if (Storage::disk('public')->exists($filePathJpg)) {
            return response()->file(Storage::disk('public')->path($filePathJpg), ['Content-type' => 'image/jpg']);
        }
    }

    public function getFile(string $routename, string $filename)
    {
        $fileName = strtolower($filename);
        $filePath = $this->getUploadedFilesPath($routename, $fileName);

        if (Storage::disk('public')->exists($filePath)) {
            return response()->file(Storage::disk('public')->path($filePath), ['Content-type' => 'application/pdf']);
        }
    }
}
