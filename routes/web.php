<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\IndividualRequestController;
use App\Http\Controllers\LessonRequestController;
use App\Models\DownloadsList;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

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
    return Inertia::render('Front', [
        'bibleTimeDownloads' => DownloadsList::getBibleTimeList(),
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register')
    ]);
});

// Show Contact Us Form
Route::get('/contactus', [ContactController::class, 'create'])->name('contactus');

// Submit Contact Us Form
Route::post('/contactus', [ContactController::class, 'store'])->name('contactus');


Route::prefix('request')->name('request.')->group(function () {
    Route::get('/group', [LessonRequestController::class, 'create'])->name('group');
    Route::post('/group', [LessonRequestController::class, 'store'])->name('group');

    Route::get('/individual', [IndividualRequestController::class, 'create'])->name('individual');
    Route::post('/individual', [IndividualRequestController::class, 'store'])->name('individual');
});


Route::get('/courses', function () {
    return Inertia::render('Courses/Index', [
        'bibleTimeDownloads' => DownloadsList::getBibleTimeList(),
        'goingDeeperDownloads' => DownloadsList::getGoingDeeperList(),
        'gleanersDownloads' => DownloadsList::getGleanersList(),
    ]);
})->name('courses');



Route::prefix('events')->name('events.')->group(function () {
    Route::get('/prizegivings', function () {
        return Inertia::render('Events/Prizegivings');
    })->name('prizegivings');
    Route::get('/shed', function () {
        return Inertia::render('Events/Shed');
    })->name('shed');
    Route::get('/camp', function () {
        return Inertia::render('Events/Camp');
    })->name('camp');

    Route::prefix('step')->group(function () {
        Route::get('/', function () {
            return Inertia::render('Events/Step/About');
        })->name('step');

        Route::get('/past', function () {
            return Inertia::render('Events/Step/About');
        })->name('step.past');

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


Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
