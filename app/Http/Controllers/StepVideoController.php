<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreStepEventRequest;
use Inertia\Inertia;
use App\Models\StepEvent;
use Illuminate\Support\Facades\Storage;
use App\Settings\StepSettings;
use Illuminate\Support\Facades\Gate;

class StepVideoController extends Controller
{
    /**
     * Display the events gallery for STEP events
     * 
     * @param \App\Settings\StepSettings $stepSettings
     * @return \Inertia\Response
     */
    public function gallery(StepSettings $stepSettings)
    {
        return Inertia::render('Events/Step/Gallery', [
            'allEvents' => fn() => StepEvent::whereNotNull('videoContent')->orderByDesc('startDate')->get(),
            'stepSettings' => fn() => $stepSettings
        ]);
    }

    /**
     * Show details for one Event
     * 
     * @param \App\Models\StepEvent $event
     * @param \App\Settings\StepSettings $stepSettings
     * @return \Inertia\Response | void
     */
    public function show(StepEvent $event, StepSettings $stepSettings)
    {
        if ((Gate::denies('create:events') && !$event['showDetails']) || $event['videoContent'] === null) {
            return abort(404);
        }
        return Inertia::render('Events/Step/Show', [
            'currentEvent' => $event,
            'stepSettings' => $stepSettings
        ]);
    }

    /**
     * Show the form for creating a new event.
     *
     * @return \Inertia\Response
     */
    public function create()
    {
        return Inertia::render('Events/Step/Create');
    }

    /**
     * Store a new past STEP event
     * 
     * @param \App\Http\Requests\StoreStepEventRequest $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(StoreStepEventRequest $request)
    {
        $stepEvent = new StepEvent;
        $stepEvent->fill($request->validated());

        $stepEvent->description = $request->description ?? "";

        // Storing image and saving image link to request
        $stepEvent->imageLink = $request->file('imageFile')->store('/', 'images');

        //Store additional files
        $stepEvent->fileContent = $stepEvent->storeFiles($request);

        // Convert submitted vimeo links
        $stepEvent->videoContent = $stepEvent->parseVideoLinks($request);

        $stepEvent->save();

        return redirect()->route('settings.step.index')->with('success', 'New event created');
    }

    /**
     * Show the form for editing the specified event.
     *
     * @param  \App\Models\StepEvent
     * @return \Inertia\Response
     */
    public function edit(StepEvent $event)
    {
        return Inertia::render('Events/Step/Edit', [
            "currentEvent" => $event
        ]);
    }

    /**
     * Update an existing event
     * 
     * @param \App\Http\Requests\StoreStepEventRequest $request
     * @param \App\Models\StepEvent $event
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(StoreStepEventRequest $request, StepEvent $event)
    {
        $event->fill($request->validated());
        $event->description = $request->description ?? "";

        // Replacing image and saving image link to request
        if ($request->file('imageFile')) {
            if ($request->imageLink && Storage::disk('images')->exists($request->imageLink)) {
                Storage::disk('images')->delete($event->imageLink);
            }
            $event->imageLink = $request->file('imageFile')->store('/', 'images');
        }

        //Store additional files
        $event->fileContent = $event->storeFiles($request);

        // Convert submitted vimeo links
        $event->videoContent = $event->parseVideoLinks($request);

        $event->save();

        return redirect()->route('settings.step.index')->with('success', 'Event updated successfully');
    }


    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\StepEvent
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy(StepEvent $event)
    {
        $event->delete();

        return redirect()->route('settings.step.index')->with('success', 'Event removed successfully');
    }

}
