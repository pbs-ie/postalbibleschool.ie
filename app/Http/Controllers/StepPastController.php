<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreStepPastRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\StepPast;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;

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
            'pastEvents' => StepPast::latest()->get()
        ]);
    }

    public function index()
    {
        return Inertia::render('Events/Step/Past/Gallery', [
            'pastEvents' => StepPast::latest()->get()
        ]);
    }

    public function show(StepPast $event)
    {
        return Inertia::render('Events/Step/Past/Show', [
            'pastEvent' => $event
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
    public function store(StoreStepPastRequest $request)
    {
        $stepEvent = new StepPast;

        // Storing image and saving image link to request
        $stepEvent->imageLink = $request->file('imageFile')->store('/', 'images');

        $stepEvent->fill($request->validated());
        $stepEvent->save();

        return redirect()->route('events.step.past.admin')->with('success', 'New event created');
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\StepPast
     * @return \Illuminate\Http\RedirectResponse | \Inertia\Response
     */
    public function edit(StepPast $event)
    {
        return Inertia::render('Events/Step/Past/Edit', [
            "pastEvent" => $event
        ]);
    }

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

        return redirect()->route('events.step.past.admin')->with('success', 'Video removed successfully');
    }

}
