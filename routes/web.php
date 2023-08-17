<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\IndividualLessonRequestController;
use App\Http\Controllers\GroupLessonRequestController;
use App\Http\Controllers\AssemblyController;
use App\Http\Controllers\LessonOrderController;
use App\Models\DownloadsList;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Auth0\Laravel\Facade\Auth0;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Home', [
        'bibleTimeDownloads' => DownloadsList::getBibleTimeList(),
        'videoList' => (new AssemblyController)->getAssemblyList(),
    ]);
});

// Show Contact Us Form
Route::get('/contactus', [ContactController::class, 'create'])->name('contactus');

// Submit Contact Us Form
Route::post('/contactus', [ContactController::class, 'store'])->name('contactus.store');


Route::prefix('request')->name('request.')->group(function () {
    Route::get('/group', [GroupLessonRequestController::class, 'create'])->name('group');
    Route::post('/group', [GroupLessonRequestController::class, 'store'])->name('group.store');

    Route::get('/individual', [IndividualLessonRequestController::class, 'create'])->name('individual');
    Route::post('/individual', [IndividualLessonRequestController::class, 'store'])->name('individual.store');
});


Route::get('/courses', function (Request $request) {
    return Inertia::render('Courses/Index', [
        'bibleTimeDownloads' => DownloadsList::getBibleTimeList(),
        'goingDeeperDownloads' => DownloadsList::getGoingDeeperList(),
        'gleanersDownloads' => DownloadsList::getGleanersList(),
        'queryParams' => $request->query(),
    ]);
})->name('courses');



Route::prefix('events')->name('events.')->group(function () {
    Route::get('/prizegivings', function () {
        return Inertia::render('Events/Prizegivings');
    })->name('prizegivings');
    Route::get('/shed', function () {
        return Inertia::render('Events/Shed');
    })->name('shed');

    Route::prefix('camp')->group(function () {
        Route::get('/', function () {
            return Inertia::render('Events/Camp/Home');
        })->name('camp');
        Route::get('/signup', function () {
            return Inertia::render('Events/Camp/Signup');
        })->name('camp.signup');
    });

    Route::get('/iteam', function () {
        return Inertia::render('Events/ITeam');
    })->name('iteam');

    Route::prefix('step')->group(function () {
        Route::get('/', function () {
            return Inertia::render('Events/Step/About');
        })->name('step');

        Route::get('/signup', function () {
            return Inertia::render('Events/Step/Signup');
        })->name('step.signup');

        Route::get('/schedule', function () {
            return Inertia::render('Events/Step/About');
        })->name('step.schedule');
    });
});

Route::get('/about', function () {
    return Inertia::render('About');
})->name('about');

Route::prefix('assembly')->name('assembly.')->group(function () {
    Route::get('/', [AssemblyController::class, 'index'])->name('index');
    Route::get('/{series}', [AssemblyController::class, 'show'])->name('show');
    Route::get('/image/{imageId}', [AssemblyController::class, 'image'])->name('image');
});

Route::get('/dashboard', function () {
    if (!auth()->check()) {
        return response('You are not logged in.');
    }
    return Inertia::render('Dashboard');
})->middleware(['auth'])->name('dashboard');

Route::resource('orders', LessonOrderController::class)
    ->parameter('orders', 'lessonOrder')
    ->middleware(['auth']);
