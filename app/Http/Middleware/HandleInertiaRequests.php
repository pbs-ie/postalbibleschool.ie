<?php

namespace App\Http\Middleware;

use App\Settings\LessonSettings;
use Illuminate\Http\Request;
use Inertia\Middleware;
use Illuminate\Support\Facades\Gate;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return string|null
     */
    public function version(Request $request)
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return mixed[]
     */
    public function share(Request $request)
    {
        $lessonSettings = new LessonSettings();
        return array_merge(parent::share($request), [
            'auth' => [
                'user' => $request->user(),
                'canViewSettings' => Gate::allows('create:events')
            ],
            'flash' => [
                'success' => fn() => $request->session()->get('success'),
                'failure' => fn() => $request->session()->get('failure'),
                'warning' => fn() => $request->session()->get('warning')
            ],
            'currentMonthToSeries' => fn() => $lessonSettings->lesson_map[$lessonSettings->active_index]
        ]);
    }
}
