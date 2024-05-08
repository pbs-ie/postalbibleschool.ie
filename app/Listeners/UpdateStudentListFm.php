<?php

namespace App\Listeners;

use App\Http\Controllers\StudentController;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Auth0\Laravel\Events\AuthenticationSucceeded;
use App\Http\Controllers\FilemakerController;
use Illuminate\Support\Facades\Log;

class UpdateStudentListFm
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  \Auth0\Laravel\Events\AuthenticationSucceeded  $event
     * @return void
     */
    public function handle(AuthenticationSucceeded $event)
    {
        try {
            (new StudentController())->storeStudentsListForUser($event->user->email);
        } catch (\Exception $e) {
            Log::notice($e->getMessage());
        }
    }
}
