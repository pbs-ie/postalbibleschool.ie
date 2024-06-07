<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreBonusVideoRequest;
use App\Models\BonusVideo;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use App\Services\VideoService;
use Illuminate\Support\Str;

class BonusVideoController extends Controller
{
    public function admin()
    {
        return Inertia::render('Assembly/Bonus/Admin', [
            'videoList' => BonusVideo::all(BonusVideo::columnsAsCamel)
        ]);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Inertia\Response
     */
    public function index()
    {
        $canEdit = Gate::check('create:assembly');

        $sortedBbwList = BonusVideo::where('category', 'bbw')->latest()->get(BonusVideo::columnsAsCamel);
        $sortedBbooksList = BonusVideo::where('category', 'bbooks')->latest()->get(BonusVideo::columnsAsCamel);
        return Inertia::render('Assembly/Bonus/Index', [
            'bbwList' => $sortedBbwList,
            'bbooksList' => $sortedBbooksList,
            'canEdit' => $canEdit
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
     * @param  \App\Http\Requests\StoreBonusVideoRequest $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(StoreBonusVideoRequest $request)
    {
        $bonusVideo = new BonusVideo;
        $bonusVideo->fill($request->validated());

        // Storing image and saving image link to request
        $bonusVideo->imageLink = $request->file('imageFile')->store('/bonus_videos', 'images');

        // Convert submitted vimeo links
        $bonusVideo->externalUrl = (new VideoService)->parseExternalUrl($request['externalUrl']);


        $bonusVideo->save();

        return redirect()->route('assembly.bonus.index')->with('success', 'Video added successfully');
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
            "videoData" => BonusVideo::find($id, BonusVideo::columnsAsCamel)
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
            "videoData" => BonusVideo::find($id, BonusVideo::columnsAsCamel)
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\StoreBonusVideoRequest  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(StoreBonusVideoRequest $request, $id)
    {
        // $video = BonusVideo::find($id, BonusVideo::columnsAsCamel);
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
}
