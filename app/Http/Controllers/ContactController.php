<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;

class ContactController extends Controller
{

    // Display the contact us page
    public function create()
    {
        return Inertia::render('Forms/ContactUs');
    }

    // Store new contact us form entry
    public function store(Request $request)
    {
        // Honeypot check
        if ($request->has('name') && $request->filled('name')) {
            return redirect('/')->withErrors('Tried to access honey field');
        }

        // Validate request
        $validated = $request->validate([
            'name' => ['nullable'],
            'contactName' => ['required', 'max:50'],
            'contactEmail' => ['required', 'email', 'max:50'],
            'contactDescription' => ['required', 'max:200']
        ]);

        // Create an entry
        Contact::create([
            'contactName' => $request->contactName,
            'contactEmail' => $request->contactEmail,
            'contactDescription' => $request->contactDescription
        ]);

        // Redirect the user
        return redirect('/')->with('success', "Contact Us form submitted successfully");
    }
}
