<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\IndividualLessonRequestController;
use App\Http\Controllers\GroupLessonRequestController;
use App\Http\Controllers\AssemblyController;
use App\Http\Controllers\BonusAssemblyController;
use App\Http\Controllers\LessonOrderController;
use App\Http\Controllers\PayPalController;
use App\Http\Controllers\StepEventController;
use App\Models\DownloadsList;
use App\Models\LessonOrder;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Auth0\Laravel\Facade\Auth0;
use Illuminate\Support\Facades\Gate;

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
    return redirect()->route('home');
})->middleware(['guest']);

Route::get('/home', function () {
    return Inertia::render('Home', [
        'bibleTimeDownloads' => DownloadsList::getBibleTimeList(),
        'videoList' => (new AssemblyController)->getAssemblyList(),
        'canViewGallery' => Gate::check('view:assembly'),
    ]);
})->name('home');

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

    Route::prefix('step')->name('step.')->group(function () {
        Route::get('/', [StepEventController::class, 'index'])->name('index');

        Route::get('/signup', [StepEventController::class, 'signup'])->name('signup');
        
        Route::get('/image/{imageId}', [StepEventController::class, 'getImage'])->name('image');
        Route::prefix('past')->name('past.')->middleware(['auth'])->group(function() {
            Route::post('/', [StepEventController::class, 'store'])->name('store')->can('create:events');
            Route::get('/admin', [StepEventController::class, 'admin'])->name('admin')->can('create:events');
            Route::get('/create', [StepEventController::class, 'create'])->name('create')->can('create:events');
            Route::delete('/{id}', [StepEventController::class, 'destroy'])->name('destroy')->can('create:events');
        });
        Route::prefix('past')->name('past.')->group(function() {
            Route::get('/', [StepEventController::class, 'gallery'])->name('gallery');
            Route::get('/{eventName}', [StepEventController::class, 'show'])->name('show');
        });
    });
});

Route::get('/about', function () {
    return Inertia::render('About');
})->name('about');

Route::prefix('assembly')->name('assembly.')->group(function () {
    Route::prefix('bonus')->name('bonus.')->middleware(['auth'])->group(function () {
        Route::get('/', [BonusAssemblyController::class, 'index'])->name('index')->can('view:assembly');
        Route::post('/', [BonusAssemblyController::class, 'store'])->name('store')->can('create:assembly');
        Route::get('/admin', [BonusAssemblyController::class, 'admin'])->name('admin')->can('create:assembly');
        Route::get('/create', [BonusAssemblyController::class, 'create'])->name('create')->can('create:assembly');
        Route::get('/{id}/edit', [BonusAssemblyController::class, 'edit'])->name('edit')->can('create:assembly');
        // Using POST instead of PUT because of known PHP issue with multipart/form-data - https://stackoverflow.com/questions/47676134/laravel-request-all-is-empty-using-multipart-form-data
        Route::post('/{id}', [BonusAssemblyController::class, 'update'])->name('update')->middleware(['auth'])->can('create:assembly');
        Route::delete('/{id}', [BonusAssemblyController::class, 'destroy'])->name('destroy')->can('create:assembly');
    });
    Route::get('/', [AssemblyController::class, 'index'])->name('index');
    Route::post('/', [AssemblyController::class, 'store'])->name('store')->middleware(['auth'])->can('create:assembly');
    Route::get('/admin', [AssemblyController::class, 'admin'])->name('admin')->middleware(['auth'])->can('create:assembly');
    Route::get('/create', [AssemblyController::class, 'create'])->name('create')->middleware(['auth'])->can('create:assembly');
    Route::get('/{series}', [AssemblyController::class, 'show'])->name('show');
    Route::get('/{id}/edit', [AssemblyController::class, 'edit'])->name('edit')->middleware(['auth'])->can('create:assembly');
    // Using POST instead of PUT because of known PHP issue with multipart/form-data - https://stackoverflow.com/questions/47676134/laravel-request-all-is-empty-using-multipart-form-data
    Route::post('/{id}', [AssemblyController::class, 'update'])->name('update')->middleware(['auth'])->can('create:assembly');
    Route::delete('/{id}', [AssemblyController::class, 'destroy'])->name('destroy')->middleware(['auth'])->can('create:assembly');
    Route::get('/image/{imageId}', [AssemblyController::class, 'image'])->name('image');
});
Route::get('/dashboard', function () {
    if (!auth()->check()) {
        return response('You are not logged in.');
    }
    return Inertia::render('Dashboard');
})->middleware(['auth'])->name('dashboard')->can('view:dashboard');

Route::prefix('orders')->name('orders.')->middleware(['auth'])->group(function () {
    Route::get('/', [LessonOrderController::class, 'index'])->name('index')->can('view:orders');
    Route::post('/', [LessonOrderController::class, 'store'])->name('store')->can('create:orders');
    Route::get('/create', [LessonOrderController::class, 'create'])->name('create')->can('create:orders');
    Route::get('/{lessonOrder}', [LessonOrderController::class, 'show'])->name('show')->can('view:orders');
    Route::get('/{lessonOrder}/edit', [LessonOrderController::class, 'edit'])->name('edit')->can('view:orders');
    Route::put('/{lessonOrder}', [LessonOrderController::class, 'update'])->name('update')->can('view:orders');
    Route::delete('/{lessonOrder}', [LessonOrderController::class, 'destroy'])->name('destroy')->can('create:orders');
});

Route::prefix('payment')->name('payment.')->group(function () {
    Route::get('/', [PayPalController::class, 'index'])->name('index');
    Route::get('/step', [PayPalController::class, 'step'])->name('step');
});
