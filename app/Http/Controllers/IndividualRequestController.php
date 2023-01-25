<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreIndividualRequest;
use App\Models\IndividualRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

use Inertia\Inertia;
use Carbon\Carbon;

class IndividualRequestController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return Inertia::render('Forms/IndividualRequest');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreIndividualRequest $request)
    {
        $validated = $request->safe()->except(['studentDetails']);
        $studentDetails = $request->safe()->only(['studentDetails']);

        $computed = [];
        foreach ($studentDetails['studentDetails'] as $value) {
            $computed[] = array_merge($value, $validated, ['updated_at' => Carbon::now()->toDateTimeString()], ['created_at' => Carbon::now()->toDateTimeString()]);
        }
        // Create an entry
        // dd($computed);
        IndividualRequest::insert($computed);

        // Redirect the user
        return redirect('/')->with('success', "Lesson request form submitted successfully");
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\IndividualRequest  $individualRequest
     * @return \Illuminate\Http\Response
     */
    public function show(IndividualRequest $individualRequest)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\IndividualRequest  $individualRequest
     * @return \Illuminate\Http\Response
     */
    public function edit(IndividualRequest $individualRequest)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\IndividualRequest  $individualRequest
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, IndividualRequest $individualRequest)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\IndividualRequest  $individualRequest
     * @return \Illuminate\Http\Response
     */
    public function destroy(IndividualRequest $individualRequest)
    {
        //
    }
}
