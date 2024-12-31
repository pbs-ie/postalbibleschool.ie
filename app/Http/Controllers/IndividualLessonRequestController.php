<?php

namespace App\Http\Controllers;

use App\Models\IndividualRequest;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class IndividualLessonRequestController extends Controller
{
    private function getAge($dob)
    {
        $dateParse = Carbon::parse($dob);
        $age = Carbon::createFromDate($dateParse->year, $dateParse->month, $dateParse->day)->age;

        return $age;
    }

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
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $rules = [
            'studentDetails.*.firstname' => ['required', 'min:3', 'max:255'],
            'studentDetails.*.lastname' => ['required', 'min:3', 'max:255'],
            'studentDetails.*.dob' => ['required_with:studentDetails.*.firstname', 'date', 'after:1900-01-01', 'before:today'],
            'email' => ['email'],
            'phone' => [],
            'address1' => ['required'],
            'address2' => [],
            'city' => ['required'],
            'state' => [],
            'postcode' => [],
            'country' => ['required'],
            'message' => [],
        ];

        $validator = Validator::make($request->all(), $rules, [], [
            'studentDetails.*.firstname' => 'First Name',
            'studentDetails.*.lastname' => 'Last Name',
            'studentDetails.*.dob' => 'Date of Birth',
            'address1' => 'Address',
        ]);

        $validated = $validator->safe()->except(['studentDetails']);
        $studentDetails = $validator->safe()->only(['studentDetails']);

        $computed = [];
        $numberOfStudents = count($studentDetails['studentDetails']);

        $i = 0;

        foreach ($studentDetails['studentDetails'] as $value) {
            $i++;
            $computed[] = array_merge(
                $value,
                $validated,
                [
                    'updated_at' => Carbon::now()->toDateTimeString(),
                    'created_at' => Carbon::now()->toDateTimeString(),
                    'numberInFamily' => $i.'/'.$numberOfStudents,
                    'age' => $this->getAge($value['dob']),
                ]
            );
        }
        // Create an entry
        IndividualRequest::insert($computed);

        $newRequest = IndividualRequest::orderBy('created_at', 'desc')->first();

        // Send mail to Info
        Mail::to(config('mail.admin.address'))->send(new \App\Mail\IndividualRequest($studentDetails['studentDetails'], $validated, $newRequest));

        unset($computed);
        unset($i);

        // Redirect the user
        return redirect('/')->with('success', 'Lesson request form submitted successfully');
    }

    /**
     * Display the specified resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function show(IndividualRequest $individualRequest)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function edit(IndividualRequest $individualRequest)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, IndividualRequest $individualRequest)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @return \Illuminate\Http\Response
     */
    public function destroy(IndividualRequest $individualRequest)
    {
        //
    }
}
