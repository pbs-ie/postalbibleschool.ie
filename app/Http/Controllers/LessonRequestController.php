<?php

namespace App\Http\Controllers;

use App\Models\LessonRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LessonRequestController extends Controller
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
            'fullname' => ['required', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'phone' => [],
            'address1' => [],
            'address2' => [],
            'city' => [],
            'state' => [],
            'postcode' => [],
            'country' => [],
            'region' => [],
            'type' => [
                function ($attribute, $value, $fail) {
                    if ($value !== "school" && $value !== "group") {
                        $fail('Expected either "school" or "group');
                    }
                }
            ],
            'numberOfStudents' => ['integer', "min:0", "max:1000"],
            'ageRange' => [],
            'message' => []
        ]);

        // Create an entry
        LessonRequest::create($validated);

        // Redirect the user
        return redirect('/')->with('success', "Lesson request form submitted successfully");
    }
}
