<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;

class ContactController extends Controller
{

    // Display the contact us page
    public function create()
    {
        return Inertia::render('ContactUs');
    }

    // Store new contact us form entry
    public function store(Request $request)
    {
        $validated = $request->validate([
            'contactName' => ['required', 'max:50'],
            'contactEmail' => ['required', 'email', 'max:50'],
            'contactDescription' => ['required', 'max:200']
        ]);

        return redirect('/');
    }
}
