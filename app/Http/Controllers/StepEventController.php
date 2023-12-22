<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\AssemblyController;
use Illuminate\Support\Str;
use stdClass;

class StepEventController extends Controller
{
    private function getStepConfig() {
        return json_decode(Storage::get('stepconfig.json'), false);
    }
    private function getRules() {
        return [
            'date' => ['required'],
            'description' => ['required'],
            'heading' => ['required'],
            'imageFile' => ['required', 'image', 'mimetypes:image/png'],
            'showDetails' => ['required', 'boolean'],
            'content' => ['array:videoTitle,externalUrl,duration', 'max:20', 'min:1'],
        ];
    }

    private function searchMatchingContent($value, $parameter,$content) {
        foreach($content as $event) {
            $eventArray = (array) $event;
            if($eventArray[$parameter] === $value) {
                return $event;
            }
        }
        return null;
    }

    public function index() {
        return Inertia::render('Events/Step/Index');
    }

    public function signup() {
        return Inertia::render('Events/Step/Signup');
    }

    public function gallery() {
        $config = $this->getStepConfig();
        return Inertia::render('Events/Step/Past/Gallery', [
            'content' => $config->content
        ]);
    }

    public function show(string $eventName) {
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
     * @return \Illuminate\Http\Response
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
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return Inertia::render('Events/Step/Past/Create');
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $rules = $this->getRules();
        $validator = Validator::make($request->all(), $rules, [], [
            'content' => 'Video information',
            'content.*.videoTitle' => 'Video Title',
            'content.*.externalUrl' => 'External Url',
            'content.*.duration' => 'Duration',
        ]);
        
        $videoData = $validator->safe()->only(['content']);
        $imageData = $validator->safe()->only(['imageFile']);
        $configData = $validator->safe()->except(['content', 'imageFile']);
        
        $configData['routename'] = Str::kebab("step ".$configData["date"]);
        // Storing updated step config file
        $stepConfig = json_decode(Storage::get('stepconfig.json'), false);
        $configData['id'] = count($stepConfig->content);
        $configData['imageLink'] = $stepConfig->imagePath . $configData['routename'];
        array_push($stepConfig->content, (object)$configData);
        // Storing image for the month
        $imageFile = $imageData["imageFile"];

        $path = $imageFile->storeAs('public/video_images', $configData['routename'] . '.' . strtolower($imageFile->getClientOriginalExtension()));


        // Storing updated video config file for the month
        $videoConfig = new stdClass();
        $videoConfig->title = $configData['heading'];
        $videoConfig->date = $configData['date'];
        $videoConfig->imageId = $configData['routename'];
        $videoConfig->content = $videoData['content'];

        for ($i = 0; $i < count($videoConfig->content); $i++) {
            $videoConfig->content[$i]['id'] = $i;
            $videoConfig->content[$i]['title'] = $videoData['content'][$i]['videoTitle'];
            unset($videoConfig->content[$i]['videoTitle']);
            $videoConfig->content[$i]['externalUrl'] = (new AssemblyController())->parseExternalUrl($videoConfig->content[$i]['externalUrl']);
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
     * @return \Illuminate\Http\Response
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
        $fileContent = (json_decode(Storage::get($filePath), false))->content;
        
        $event->content = $fileContent;

        return Inertia::render('Events/Step/Past/Edit', [
            "videoData" => $event
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
            'content' => 'Video information',
            'content.*.videoTitle' => 'Video Title',
            'content.*.externalUrl' => 'External Url',
            'content.*.duration' => 'Duration',
        ]);

        $imageData = $validator->safe()->only(['imageFile']);
        $videoData = $validator->safe()->only(['content']);
        $configData = $validator->safe()->except(['imageFile', 'content']);

        $stepConfig = $this->getStepConfig();

        $currentEvent = $this->searchMatchingContent($id, 'id', $stepConfig->content);
        if ($currentEvent === null) {
            return redirect()->route('events.step.past.admin')->with('failure', 'Missing file in system');
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
        foreach($stepConfig->content as $event) {
            if($event->id === $id) {
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

        usort($eventConfig->content, function ($a, $b) {
            if ((int)$a['id'] === (int)$b['id']) {
                return 0;
            }
            return (int)$a['id'] < (int)$b['id'] ? -1 : 1;
        });
        for ($i = 0; $i < count($eventConfig->content); $i++) {
            $eventConfig->content[$i]['id'] = $i;
            $eventConfig->content[$i]['externalUrl'] = (new AssemblyController())->parseExternalUrl($eventConfig->content[$i]['externalUrl']);
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
     * @return \Illuminate\Http\Response
     */
    public function destroy(int $id)
    {
        $stepConfig = $this->getStepConfig();
        $event = $this->searchMatchingContent($id, 'id', $stepConfig->content);
        $fileName = strtolower($event->routename);

        $filePath = $stepConfig->jsonPath . $fileName . '.json';
        $pngPath = 'video_images/' . $fileName . '.png';

        // TODO: This check does not need to prevent the deletion
        if (!Storage::disk('local')->exists($filePath) || !Storage::disk('public')->exists($pngPath)) {
            return redirect()->route('events.step.past.admin')->with('failure', 'Missing file in system');
        }

        try {
            // Destroy the .json file for the month
            Storage::disk('local')->delete($filePath);

            // Destroy the image for the month
            Storage::disk('public')->delete($pngPath);

            // Remove the entry in step config for the month
            $filteredContent = array_filter($stepConfig->content, function ($item) use ($id) {
                return $item->id !== $id;
            });
            $stepConfig->content = array_values($filteredContent);
            Storage::put('stepconfig.json', json_encode($stepConfig));
        } catch (Exception $ex) {
            Log::error($ex->getMessage());
        }

        return redirect()->route('events.step.past.admin')->with('success', 'Video removed successfully');
    }

    public function schedule( ) {
            return Inertia::render('Events/Step/Index');
    }

    public function getImage($imageId) {
        $fileName = strtolower($imageId);
        $filePathJpg = 'video_images/' . $fileName . '.jpg';
        $filePathPng = 'video_images/' . $fileName . '.png';


        if (Storage::disk('public')->exists($filePathPng)) {
            return response()->file(Storage::disk('public')->path($filePathPng), ['Content-type' => 'image/png']);
        } else if(Storage::disk('public')->exists($filePathJpg)) {
            return response()->file(Storage::disk('public')->path($filePathJpg), ['Content-type' => 'image/jpg']);
        }
    }
}
