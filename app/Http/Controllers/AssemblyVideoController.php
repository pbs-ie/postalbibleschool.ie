<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Storage;
use App\Services\VideoService;
use App\Models\AssemblyVideo;
use App\Http\Requests\StoreAssemblyVideoRequest;

class AssemblyVideoController extends Controller
{
    /**
     * Display admin panel for the assembly resources.
     *
     * @return \Inertia\Response
     */
    public function admin()
    {
        return Inertia::render('Assembly/Admin', [
            'videoList' => AssemblyVideo::oldest()->get(AssemblyVideo::columnsAsCamel)
        ]);
    }

    /**
     * Display the index gallery for assembly videos
     * 
     * @return \Inertia\Response
     */
    public function index()
    {
        return Inertia::render('Assembly/Index', [
            'videoList' => AssemblyVideo::oldest()->get(AssemblyVideo::columnsAsCamel),
            'canViewGallery' => Gate::check('view:assembly'),
            'canEdit' => Gate::check('create:assembly')
        ]);
    }

    /**
     * Show details for a month's assembly 
     * 
     * @param  int  $id
     * @return \Inertia\Response
     */
    public function show(int $id)
    {
        return Inertia::render('Assembly/Show', [
            'videoData' => AssemblyVideo::find($id, AssemblyVideo::columnsAsCamel)
        ]);
    }

    /**
     * Show the form for creating a new assembly.
     *
     * @return \Inertia\Response
     */
    public function create()
    {
        return Inertia::render('Assembly/Create');
    }

    /**
     * Store a new assembly video
     * 
     * @param \App\Http\Requests\StoreAssemblyVideoRequest $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(StoreAssemblyVideoRequest $request)
    {
        $assemblyVideo = new AssemblyVideo;
        $assemblyVideo->fill($request->validated());

        // Storing image and saving image link to request
        $assemblyVideo->imageLink = $request->file('imageFile')->store('/assembly_videos', 'images');

        // Convert submitted vimeo links
        $assemblyVideo->videoContent = $assemblyVideo->parseVideoLinks($request);

        $assemblyVideo->save();

        return redirect()->route('assembly.admin')->with('success', 'New event created');
    }

    /**
     * Show the form for editing the specified assembly.
     *
     * @param  \App\Models\AssemblyVideo $video
     * @param  int  $id
     * @return \Inertia\Response
     */
    public function edit(int $id)
    {
        return Inertia::render('Assembly/Edit', [
            "videoData" => AssemblyVideo::find($id, AssemblyVideo::columnsAsCamel)
        ]);
    }

    /**
     * Update an existing assembly video
     * 
     * @param \App\Http\Requests\StoreAssemblyVideoRequest $request
     * @param  \App\Models\AssemblyVideo $video
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(StoreAssemblyVideoRequest $request, AssemblyVideo $video)
    {
        $video->fill($request->validated());

        // Replacing image and saving image link to request
        if ($request->file('imageFile')) {
            if (Storage::disk('images')->exists($video->imageLink)) {
                Storage::disk('images')->delete($video->imageLink);
            }
            $video->imageLink = $request->file('imageFile')->store('/assembly_videos', 'images');
        }

        // Convert submitted vimeo links
        $video->videoContent = $video->parseVideoLinks($request);

        $video->save();

        return redirect()->route('assembly.admin')->with('success', 'Event updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\AssemblyVideo
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy(AssemblyVideo $video)
    {
        $video->delete();

        return redirect()->route('assembly.admin')->with('success', 'Event removed successfully');
    }
}
