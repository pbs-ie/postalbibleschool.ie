<?php

use App\Http\Controllers\ContactController;
use App\Http\Controllers\IndividualLessonRequestController;
use App\Http\Controllers\GroupLessonRequestController;
use App\Http\Controllers\AssemblyController;
use App\Http\Controllers\BonusAssemblyController;
use App\Http\Controllers\LessonOrderController;
use App\Http\Controllers\PayPalController;
use App\Http\Controllers\SettingController;
use App\Http\Controllers\StepEventController;
use App\Http\Controllers\ClassroomController;
use App\Http\Controllers\StudentController;
use App\Models\Classroom;
use App\Models\Curriculum;
use App\Models\DownloadsList;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Gate;
use App\Http\Controllers\CurriculumController;

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

Route::get('/designsystem', function () {
    return Inertia::render('DesignSystem');
});

// Contact Us Form
Route::get('/contactus', [ContactController::class, 'create'])->name('contactus');
Route::post('/contactus', [ContactController::class, 'store'])->name('contactus.store');

// Lesson Request Forms
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
    Route::prefix('settings')->name('settings.')->middleware(['auth', 'can:create:events'])->group(function () {
        Route::get('/', [SettingController::class, 'editEvents'])->name('edit');
        Route::post('/update', [SettingController::class, 'storeEvents'])->name('store');
    });

    Route::get('/prizegivings', function (Request $request) {
        return Inertia::render('Events/Prizegivings', [
            'queryParams' => $request->query(),
        ]);
    })->name('prizegivings');
    Route::get('/shed', function () {
        return Inertia::render('Events/Shed');
    })->name('shed');

    Route::prefix('camp')->name('camp.')->group(function () {
        Route::get('/', function () {
            return Inertia::render('Events/Camp/Home');
        })->name('index');
        Route::get('/signup', function () {
            return Inertia::render('Events/Camp/CampSignup');
        })->name('signup');
    });

    Route::get('/iteam', function () {
        return Inertia::render('Events/ITeam');
    })->name('iteam');

    Route::prefix('step')->name('step.')->group(function () {
        Route::get('/', [StepEventController::class, 'index'])->name('index');

        Route::get('/signup', [StepEventController::class, 'signup'])->name('signup');
        // Fix for bad link that has a . at the end of /signup -> /signup.
        Route::get('/signup.', function () {
            return redirect()->route('events.step.signup');
        });

        Route::get('/image/{imageId}', [StepEventController::class, 'getImage'])->name('image');
        Route::get('/file/{routename}/{filename}', [StepEventController::class, 'getFile'])->name('file');
        Route::prefix('past')->name('past.')->middleware(['auth'])->group(function () {
            Route::post('/', [StepEventController::class, 'store'])->name('store')->can('create:events');
            Route::get('/admin', [StepEventController::class, 'admin'])->name('admin')->can('create:events');
            Route::get('/create', [StepEventController::class, 'create'])->name('create')->can('create:events');
            Route::get('/{id}/edit', [StepEventController::class, 'edit'])->name('edit')->can('create:events');
            // Using POST instead of PUT because of known PHP issue with multipart/form-data - https://stackoverflow.com/questions/47676134/laravel-request-all-is-empty-using-multipart-form-data
            Route::post('/{id}', [StepEventController::class, 'update'])->name('update')->can('create:events');
            Route::delete('/{id}', [StepEventController::class, 'destroy'])->name('destroy')->can('create:events');
        });
        Route::prefix('past')->name('past.')->group(function () {
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
    $classroomList = Classroom::current();
    // $curriculumList = Curriculum::current();
    $classroomList->each(fn($obj) => (
        $obj->setAttribute('curriculum_name', $obj->curriculum()->select('name')->find($obj->curriculum_id)->name)
    ));
    return Inertia::render('Dashboard', [
        'classrooms' => $classroomList,
        'canViewCurriculum' => Gate::allows('view:curriculum'),
        'curriculumList' => Curriculum::current(),
    ]);
})->middleware(['auth'])->name('dashboard')->can('view:dashboard');

Route::prefix('students')->name('students.')->middleware(['auth'])->group(function () {
    Route::get('/', [StudentController::class, 'index'])->name('index');
    Route::get('/all', [StudentController::class, 'getAllStudents'])->name('all');
});


Route::prefix('classroom')->name('classroom.')->middleware(['auth'])->group(function () {
    Route::prefix('students')->name('students.')->group(function () {
        Route::post('/add', [StudentController::class, 'addStudentsToClassroom'])->name('store');
        Route::post('/remove', [StudentController::class, 'removeStudentsFromClassroom'])->name('destroy');
    });
    Route::post('curriculum/store', [ClassroomController::class, 'curriculumStore'])->name('curriculum.store');
    Route::get('/', [ClassroomController::class, 'index'])->name('index');
    Route::post('/', [ClassroomController::class, 'store'])->name('store');
    Route::get('/create', [ClassroomController::class, 'create'])->name('create');
    Route::get('/{classroom}', [ClassroomController::class, 'show'])->name('show');
    Route::get('/{classroom}/edit', [ClassroomController::class, 'edit'])->name('edit');
    Route::post('/{classroom}', [ClassroomController::class, 'update'])->name('update');
    Route::delete('/{classroom}', [ClassroomController::class, 'destroy'])->name('destroy');
});

Route::prefix('curriculum')->name('curriculum.')->middleware(['auth'])->group(function () {
    Route::get('/', [CurriculumController::class, 'index'])->name('index')->can('view:curriculum');
    Route::post('/', [CurriculumController::class, 'store'])->name('store')->can('create:curriculum');
    Route::get('/sync', [SettingController::class, 'updateFMCurriculum'])->name('sync')->can('create:curriculum');
    Route::get('/create', [CurriculumController::class, 'create'])->name('create')->can('create:curriculum');
    Route::get('/{curriculum}', [CurriculumController::class, 'show'])->name('show')->can('view:curriculum');
    Route::get('/{curriculum}/edit', [CurriculumController::class, 'edit'])->name('edit')->can('create:curriculum');
    Route::put('/{curriculum}', [CurriculumController::class, 'update'])->name('update')->can('create:curriculum');
    Route::delete('/{curriculum}', [CurriculumController::class, 'destroy'])->name('destroy')->can('create:curriculum');
});
Route::prefix('orders')->name('orders.')->middleware(['auth'])->group(function () {
    Route::get('/', [LessonOrderController::class, 'index'])->name('index')->can('view:orders');
    Route::get('/sync', [LessonOrderController::class, 'sync'])->name('sync')->can('create:orders');
    // Route::get('/{lessonOrder}', [LessonOrderController::class, 'show'])->name('show')->can('view:orders');
    // Route::get('/{lessonOrder}/edit', [LessonOrderController::class, 'edit'])->name('edit')->can('view:orders');
    // Route::put('/{lessonOrder}', [LessonOrderController::class, 'update'])->name('update')->can('view:orders');
});

Route::prefix('payment')->name('payment.')->group(function () {
    Route::get('/', [PayPalController::class, 'index'])->name('index');
    Route::get('/step', [PayPalController::class, 'step'])->name('step');
    Route::get('/camp', [PayPalController::class, 'camp'])->name('camp');
});
