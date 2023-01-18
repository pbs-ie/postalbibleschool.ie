<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ContactController;
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
    return Inertia::render('Dashboard', [
        'bibleTimeDownloads' => DownloadsList::getBibleTimeList(),
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register')
    ]);
});

// Show Contact Us Form
Route::get('/contactus', [ContactController::class, 'create'])->name('contactus');

// Submit Contact Us Form
Route::post('/contactus', [ContactController::class, 'store'])->name('contactus');


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
    return Inertia::render('Events/Step');
})->name('events.step');


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
