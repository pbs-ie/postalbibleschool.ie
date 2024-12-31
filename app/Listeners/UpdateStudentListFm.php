<?php

namespace App\Listeners;

use App\Http\Controllers\StudentController;
use Auth0\Laravel\Events\AuthenticationSucceeded;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Log;

class UpdateStudentListFm implements ShouldQueue
{
    use InteractsWithQueue;

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
     * @return void
     */
    public function handle(AuthenticationSucceeded $event)
    {
        try {
            // (new StudentController())->storeStudentsListForUser($event->user->email);
        } catch (\Exception $e) {
            Log::notice($e->getMessage());
        }
    }

    /**
     * Determine whether the listener should be queued.
     *
     * @return bool
     */
    public function shouldQueue(AuthenticationSucceeded $event)
    {
        return Gate::denies('create:curriculum');
    }

    /**
     * Handle a job failure.
     *
     * @param  \Throwable  $exception
     * @return void
     */
    public function failed(AuthenticationSucceeded $event, $exception)
    {
        Log::warning($exception->getMessage(), ['user' => $event->user]);
    }
}
