<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ContactController;
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


// Show New lesson form
Route::get('/request/school', [LessonRequestController::class, 'create'])->name('request.school');
Route::get('/request/home', [LessonRequestController::class, 'create'])->name('request.home');

Route::post('/request/new', [LessonRequestController::class, 'store'])->name('request.new');


Route::get('/courses', function () {
    return Inertia::render('Courses/Index', [
        'bibleTimeDownloads' => DownloadsList::getBibleTimeList(),
        'goingDeeperDownloads' => DownloadsList::getGoingDeeperList(),
        'gleanersDownloads' => DownloadsList::getGleanersList(),
    ]);
})->name('courses');

Route::get('/events/prizegivings', function () {
    return Inertia::render('Events/Prizegivings');
})->name('events.prizegivings');


Route::get('/events/shed', function () {
    return Inertia::render('Events/Shed');
})->name('events.shed');


Route::get('/events/step', function () {
    return Inertia::render('Events/Step/About');
})->name('events.step');

Route::get('/events/step/past', function () {
    return Inertia::render('Events/Step/About');
})->name('events.step.past');

Route::get('/events/step/signup', function () {
    return Inertia::render('Events/Step/About');
})->name('events.step.signup');

Route::get('/events/step/schedule', function () {
    return Inertia::render('Events/Step/About');
})->name('events.step.schedule');


Route::get('/events/camp', function () {
    return Inertia::render('Events/Camp');
})->name('events.camp');


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
