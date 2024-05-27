<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreStepPastRequest;
use Inertia\Inertia;
use App\Models\StepPast;
use Illuminate\Support\Facades\Storage;

class StepPastController extends Controller
{
    /**
     * Display admin panel for the past resources.
     *
     * @return \Inertia\Response
     */
    public function admin()
    {
        return Inertia::render('Events/Step/Past/Admin', [
            'pastEvents' => StepPast::orderByDesc('date')->get()
        ]);
    }

    /**
     * Display the past events gallery for STEP events
     * 
     * @return \Inertia\Response
     */
    public function index()
    {
        return Inertia::render('Events/Step/Past/Gallery', [
            'pastEvents' => StepPast::orderByDesc('date')->get()
        ]);
    }

    /**
     * Show details for one Past Event
     * 
     * @param \App\Models\StepPast $event
     * @return \Inertia\Response
     */
    public function show(StepPast $event)
    {
        return Inertia::render('Events/Step/Past/Show', [
            'pastEvent' => $event
        ]);
    }

    /**
     * Show the form for creating a new event.
     *
     * @return \Inertia\Response
     */
    public function create()
    {
        return Inertia::render('Events/Step/Past/Create');
    }

    /**
     * Store a new past STEP event
     * 
     * @param \App\Http\Requests\StoreStepPastRequest $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(StoreStepPastRequest $request)
    {
        $stepEvent = new StepPast;
        $stepEvent->fill($request->validated());

        // Storing image and saving image link to request
        $stepEvent->imageLink = $request->file('imageFile')->store('/', 'images');

        //Store additional files
        $stepEvent->fileContent = $stepEvent->storeFiles($request);


        $stepEvent->save();

        return redirect()->route('events.step.past.admin')->with('success', 'New event created');
    }

    /**
     * Show the form for editing the specified event.
     *
     * @param  \App\Models\StepPast
     * @return \Inertia\Response
     */
    public function edit(StepPast $event)
    {
        return Inertia::render('Events/Step/Past/Edit', [
            "pastEvent" => $event
        ]);
    }

    /**
     * Update an existing past event
     * 
     * @param \App\Http\Requests\StoreStepPastRequest $request
     * @param \App\Models\StepPast $event
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(StoreStepPastRequest $request, StepPast $event)
    {
        $event->fill($request->validated());
        // Replacing image and saving image link to request
        if ($request->file('imageFile')) {
            if (Storage::disk('images')->exists($event->imageLink)) {
                Storage::disk('images')->delete($event->imageLink);
            }
            $event->imageLink = $request->file('imageFile')->store('/', 'images');
        }

        //Store additional files
        $event->fileContent = $event->storeFiles($request);

        $event->save();

        return redirect()->route('events.step.past.admin')->with('success', 'Event updated successfully');
    }


    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\StepPast
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy(StepPast $event)
    {
        $event->delete();

        return redirect()->route('events.step.past.admin')->with('success', 'Event removed successfully');
    }

}
