<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreBonusVideoRequest;
use App\Models\BonusVideo;
use App\Services\VideoService;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class BonusVideoController extends Controller
{
    public function admin()
    {
        return Inertia::render('Assembly/Bonus/Admin', [
            'videoList' => BonusVideo::all(BonusVideo::columnsAsCamel),
        ]);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Inertia\Response
     */
    public function index()
    {
        $sortedBbwList = BonusVideo::where('category', 'bbw')->latest()->get(BonusVideo::columnsAsCamel);
        $sortedBbooksList = BonusVideo::where('category', 'bbooks')->latest()->get(BonusVideo::columnsAsCamel);
        $sortedSongsList = BonusVideo::where('category', 'music')->latest()->get(BonusVideo::columnsAsCamel);

        return Inertia::render('Assembly/Bonus/Index', [
            'bbwList' => $sortedBbwList,
            'bbooksList' => $sortedBbooksList,
            'music' => $sortedSongsList,
            'canEdit' => Gate::check('create:assembly'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Inertia\Response
     */
    public function create()
    {
        return Inertia::render('Assembly/Bonus/Create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(StoreBonusVideoRequest $request)
    {
        $bonusVideo = new BonusVideo;
        $bonusVideo->fill($request->validated());

        // Convert submitted vimeo links
        try {
            $bonusVideo->externalUrl = VideoService::parseExternalUrl($request['externalUrl']);
        } catch (\Exception $e) {
            return redirect()->back()->withErrors(['externalUrl' => 'The external URL is not a valid Vimeo link']);
        }

        // Storing image and saving image link to request
        $bonusVideo->imageLink = $request->file('imageFile')->store('/bonus_videos', 'images');

        // Storing download file and saving download link to request
        if ($request->file('downloadFile')) {
            $bonusVideo->downloadLink = $request->file('downloadFile')->store('/bonus_videos', 'public');
        }

        $bonusVideo->save();

        return redirect()->route('assembly.bonus.admin')->with('success', 'Video added successfully');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Inertia\Response
     */
    public function show($id)
    {
        return Inertia::render('Assembly/Bonus/Show', [
            'videoData' => BonusVideo::find($id, BonusVideo::columnsAsCamel),
            'canEdit' => Gate::check('create:assembly'),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Inertia\Response
     */
    public function edit($id)
    {
        return Inertia::render('Assembly/Bonus/Edit', [
            'videoData' => BonusVideo::find($id, BonusVideo::columnsAsCamel),
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(StoreBonusVideoRequest $request, $id)
    {
        $video = BonusVideo::find($id, BonusVideo::columnsAsCamel);
        $video->fill($request->validated());

        if ($video->isDirty('external_url')) {
            try {
                $video->externalUrl = VideoService::parseExternalUrl($request['externalUrl']);
            } catch (\Exception $e) {
                return redirect()->back()->withErrors(['externalUrl' => 'The external URL is not a valid Vimeo link']);
            }
        }

        if ($request->file('imageFile')) {
            if ($request->imageLink && Storage::disk('images')->exists($request->imageLink)) {
                Storage::disk('images')->delete($request->imageLink);
            }
            $video->imageLink = $request->file('imageFile')->store('/bonus_videos', 'images');
        }

        if ($request->file('downloadFile')) {
            if ($request->downloadLink && Storage::disk('public')->exists($request->downloadLink)) {
                Storage::disk('public')->delete($request->downloadLink);
            }
            $video->downloadLink = $request->file('downloadFile')->store('/bonus_videos', 'public');
        }

        $video->save();

        return redirect()->route('assembly.bonus.admin')->with('success', 'Video updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy($id)
    {
        $video = BonusVideo::find($id);
        $video->delete();

        return redirect()->route('assembly.bonus.admin')->with('success', 'Bonus Video successfully deleted');
    }

    public function destroyFile($id)
    {
        $video = BonusVideo::find($id);
        if (Storage::disk('public')->exists($video->downloadLink)) {
            Storage::disk('public')->delete($video->downloadLink);
        }
        $video->downloadLink = null;
        $video->save();

        return redirect()->route('assembly.bonus.admin')->with('success', 'Download file removed successfully');
    }
}
