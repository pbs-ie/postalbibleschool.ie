<?php

namespace App\Http\Controllers;

use App\Models\GroupRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class GroupLessonRequestController extends Controller
{
    // Display the Lesson request form
    public function create()
    {
        return Inertia::render('Forms/GroupRequest');
    }

    // Enter form values into DB
    public function store(Request $request)
    {
        $validated = $request->validate([
            'firstname' => ['required', 'max:255'],
            'lastname' => ['required', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'phone' => [],
            'address1' => [],
            'address2' => [],
            'city' => [],
            'state' => [],
            'postcode' => [],
            'country' => [],
            'type' => [
                function ($attribute, $value, $fail) {
                    if ($value !== 'school' && $value !== 'group') {
                        $fail('Expected either "school" or "group');
                    }
                },
            ],
            'numberOfStudents' => ['required', 'integer', 'min:1', 'max:1000'],
            'ageRange' => [],
            'message' => [],
        ]);

        // Create an entry
        GroupRequest::create($validated);

        $newGroup = GroupRequest::orderBy('created_at', 'desc')->first();

        // Send mail to Info
        Mail::to(config('mail.admin.address'))->send(new \App\Mail\GroupRequest($newGroup));

        // Redirect the user
        return redirect('/')->with('success', 'Lesson request form submitted successfully');
    }
}
