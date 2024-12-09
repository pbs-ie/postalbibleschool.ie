<?php

use App\Http\Controllers\ContactController;
use App\Http\Controllers\IndividualLessonRequestController;
use App\Http\Controllers\GroupLessonRequestController;
// use App\Http\Controllers\AssemblyController;
use App\Http\Controllers\AssemblyVideoController;
use App\Http\Controllers\BonusVideoController;
use App\Http\Controllers\SchoolController;
use App\Http\Controllers\PayPalController;
use App\Http\Controllers\Setting\ITeamSettingController;
use App\Http\Controllers\Setting\CampSettingController;
use App\Http\Controllers\Setting\LessonSettingController;
use App\Http\Controllers\Setting\StepSettingController;
use App\Http\Controllers\SunscoolApiController;
use App\Http\Controllers\StepEventController;
use App\Http\Controllers\ClassroomController;
use App\Http\Controllers\StudentController;
use App\Models\AssemblyVideo;
use App\Models\Classroom;
use App\Models\Curriculum;
use App\Http\Controllers\StepPastController;
use App\Models\DownloadsList;
use App\Models\FmSchool;
use App\Settings\ITeamSettings;
use App\Settings\CampSettings;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Gate;
use App\Http\Controllers\CurriculumController;
use Illuminate\Support\Str;
use Illuminate\Support\Carbon;
use App\Services\ClassroomService;

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
        'videoList' => AssemblyVideo::latest()->get(AssemblyVideo::columnsAsCamel),
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

// ************** SETTINGS ********************

Route::prefix('settings')->name('settings.')->middleware(['auth', 'can:create:events'])->group(function () {
    Route::get('/', function () {
        return redirect()->route('settings.step.index');
    })->name('index');
    Route::controller(StepSettingController::class)->name('step.')->prefix('step')->group(function () {
        Route::get('/', 'index')->name('index');
        Route::post('update', 'update')->name('update');
        Route::delete('destroy', 'destroyFile')->name('destroyFile');
    });
    Route::controller(ITeamSettingController::class)->name('iteam.')->prefix('iteam')->group(function () {
        Route::get('/', 'index')->name('index');
        Route::post('update', 'update')->name('update');
    });
    Route::controller(CampSettingController::class)->name('camp.')->prefix('camp')->group(function () {
        Route::get('/', 'index')->name('index');
        Route::post('update', 'update')->name('update');
        Route::post('reunion/update', 'updateReunion')->name('reunion.update');
        Route::post('payment/update', 'updatePayment')->name('payment.update');
    });
    Route::controller(SunscoolApiController::class)->name('sunscool.')->prefix('sunscool')->group(function () {
        Route::get('/', 'index')->name('index');
        Route::post('/unmark', 'markUnprocessed')->name('unprocessed.mark');
        Route::get('/{schoolId}', 'classes')->name('classes');
        Route::post('/{schoolId}', 'process')->name('process');
        Route::post('/', 'store')->name('store');
    });
    Route::controller(LessonSettingController::class)->name('lesson.')->prefix('lesson')->group(function () {
        Route::get('/', 'index')->name('index');
        Route::post('update', 'update')->name('update');
    });
});
// ************** END SETTINGS ********************

Route::prefix('events')->name('events.')->group(function () {
    Route::get('/prizegivings', function (Request $request) {
        return Inertia::render('Events/Prizegivings', [
            'queryParams' => $request->query(),
        ]);
    })->name('prizegivings');
    Route::get('/shed', function () {
        return Inertia::render('Events/Shed');
    })->name('shed');

    Route::prefix('camp')->name('camp.')->group(function () {
        Route::get('/', function (CampSettings $campSettings) {
            return Inertia::render('Events/Camp/Home', [
                'campSettings' => $campSettings
            ]);
        })->name('index');
        // Signup form has /signup for reunion so temporarily redirecting to the same for now
        Route::get('/signup', function (CampSettings $settings) {
            if ($settings->isActive) {
                return Inertia::render('Events/Camp/CampSignup', [
                    'campSettings' => $settings
                ]);

            } else if ($settings->reunionIsActive) {
                return redirect()->route('events.camp.reunion');
            }
            return redirect()->route('home');
        })->name('signup');
        Route::get('/reunion', function (CampSettings $campSettings) {
            return Inertia::render('Events/Camp/ReunionSignup', [
                'campSettings' => $campSettings
            ]);
        })->name('reunion');
    });

    Route::get('/iteam', function (ITeamSettings $iteamSettings) {
        return Inertia::render('Events/ITeam', [
            'iteamSettings' => $iteamSettings
        ]);
    })->name('iteam');

    Route::prefix('step')->controller(StepEventController::class)->name('step.')->group(function () {
        Route::get('/', 'index')->name('index');

        Route::get('/signup', 'signup')->name('signup');

        Route::get('/schedule', 'schedule')->name('schedule');

        Route::prefix('past')->name('past.')->controller(StepPastController::class)->group(function () {
            Route::middleware(['auth', 'can:create:events'])->group(function () {
                Route::post('/', 'store')->name('store');
                Route::get('/admin', 'admin')->name('admin');
                Route::get('/create', 'create')->name('create');
                Route::get('/{event}/edit', 'edit')->name('edit');
                // Using POST instead of PUT because of known PHP issue with multipart/form-data - https://stackoverflow.com/questions/47676134/laravel-request-all-is-empty-using-multipart-form-data
                Route::post('/{event}', 'update')->name('update');
                Route::delete('/{event}', 'destroy')->name('destroy');
            });
            Route::get('/', 'index')->name('gallery');
            Route::get('/{event}', 'show')->name('show');
        });
    });
});

Route::get('/about', function () {
    return Inertia::render('About');
})->name('about');


Route::prefix('assembly')->name('assembly.')->group(function () {
    Route::prefix('bonus')->controller(BonusVideoController::class)->name('bonus.')->middleware(['auth'])->group(function () {
        Route::get('/', 'index')->name('index')->can('view:assembly');
        Route::post('/', 'store')->name('store')->can('create:assembly');
        Route::get('/admin', 'admin')->name('admin')->can('create:assembly');
        Route::get('/create', 'create')->name('create')->can('create:assembly');
        Route::get('/{id}', 'show')->name('show')->withoutMiddleware(['auth']);
        Route::get('/{id}/edit', 'edit')->name('edit')->can('create:assembly');
        // Using POST instead of PUT because of known PHP issue with multipart/form-data - https://stackoverflow.com/questions/47676134/laravel-request-all-is-empty-using-multipart-form-data
        Route::post('/{id}', 'update')->name('update')->middleware(['auth'])->can('create:assembly');
        Route::delete('/{id}', 'destroy')->name('destroy')->can('create:assembly');
    });

    Route::controller(AssemblyVideoController::class)->middleware(['auth', 'can:create:assembly'])->group(function () {
        Route::post('/', 'store')->name('store');
        Route::get('/admin', 'admin')->name('admin');
        Route::get('/create', 'create')->name('create');
        Route::get('/{id}/edit', 'edit')->name('edit');
        // Using POST instead of PUT because of known PHP issue with multipart/form-data - https://stackoverflow.com/questions/47676134/laravel-request-all-is-empty-using-multipart-form-data
        Route::post('/{video}', 'update')->name('update');
        Route::delete('/{video}', 'destroy')->name('destroy');
    });

    Route::controller(AssemblyVideoController::class)->group(function () {
        Route::get('/', 'index')->name('index');
        Route::get('/{id}', 'show')->name('show');
    });
});


Route::get('/dashboard', function () {
    $classroomList = Classroom::current();
    return Inertia::render('Dashboard', [
        'classrooms' => fn() => $classroomList,
        'canManageCurriculum' => Gate::allows('create:curriculum'),
        'curriculumList' => fn() => Curriculum::current(),
        'projectedOrders' => fn() => (new ClassroomService)->getProjectedMonthlyOrders(auth()->user()->email)
    ]);
})->middleware(['auth'])->name('dashboard')->can('view:dashboard');

Route::get('/profile', function () {
    $schoolDetails = FmSchool::where('email', auth()->user()->email)->first();
    if (is_null($schoolDetails)) {
        abort(404);
    }
    return Inertia::render('Profile', [
        'schoolDetails' => fn() => $schoolDetails,
    ]);
})->middleware(['auth'])->name('profile')->can('admin-cannot');
// TODO: Revealed route with Digital lessons features 
// Route::prefix('students')->name('students.')->middleware(['auth'])->group(function () {
//     Route::get('/', [StudentController::class, 'index'])->name('index');
//     Route::get('/all', [StudentController::class, 'getAllStudents'])->name('all');
// });


Route::prefix('classroom')->name('classroom.')->middleware(['auth'])->group(function () {
    // Route::prefix('students')->name('students.')->group(function () {
    //     Route::post('/add', [StudentController::class, 'addStudentsToClassroom'])->name('store');
    //     Route::post('/remove', [StudentController::class, 'removeStudentsFromClassroom'])->name('destroy');
    // });
    Route::controller(ClassroomController::class)->group(function () {
        Route::post('curriculum/store', 'curriculumStore')->name('curriculum.store');
        Route::get('/', 'index')->name('index');
        Route::post('/', 'store')->name('store');
        Route::get('/create', 'create')->name('create');
        // Route::get('/{classroom}', 'show')->name('show');
        Route::get('/{classroom}/edit', 'edit')->name('edit');
        Route::post('/{classroom}', 'update')->name('update');
        Route::delete('/{classroom}', 'destroy')->name('destroy');
    });
});

Route::prefix('curriculum')->name('curriculum.')->middleware(['auth'])->group(function () {
    Route::get('/', [CurriculumController::class, 'index'])->name('index')->can('view:curriculum');
    Route::post('/', [CurriculumController::class, 'store'])->name('store')->can('create:curriculum');
    Route::get('/sync', [CurriculumController::class, 'updateCurriculumTable'])->name('sync')->can('create:curriculum');
    Route::get('/create', [CurriculumController::class, 'create'])->name('create')->can('create:curriculum');
    Route::get('/{curriculum}', [CurriculumController::class, 'show'])->name('show')->can('view:curriculum');
    Route::get('/{curriculum}/edit', [CurriculumController::class, 'edit'])->name('edit')->can('create:curriculum');
    Route::put('/{curriculum}', [CurriculumController::class, 'update'])->name('update')->can('create:curriculum');
    Route::delete('/{curriculum}', [CurriculumController::class, 'destroy'])->name('destroy')->can('create:curriculum');
});
Route::prefix('schools')->name('schools.')->controller(SchoolController::class)->middleware(['auth', 'can:create:orders'])->group(function () {
    Route::get('/projections/{month?}', 'index')->name('index');
    Route::get('/download/school/{schoolId}', 'exportStudentsList')->name('exportStudentsList');
    Route::get('/download/{month}', 'export')->name('export');
    Route::get('/{schoolDetails}/students', 'students')->name('students');
    Route::get('/{schoolDetails}/students/refresh', 'studentsRefresh')->name('studentsRefresh');
    Route::get('/sync', 'sync')->name('sync');
    Route::post('/push', 'push')->name('push');
    Route::get('/createdefaultclassrooms', 'createDefaultClassrooms')->name('createdefaultclassrooms');
    Route::get('/{schoolDetails}', 'show')->name('show');
    // Route::put('/{schoolDetails}', 'update')->name('update');
});

// ************* PAYMENT ROUTES *****************
Route::prefix('payment')->name('payment.')->group(function () {
    Route::get('/', [PayPalController::class, 'index'])->name('index');
    Route::get('/step', [PayPalController::class, 'step'])->name('step');
    Route::get('/camp', [PayPalController::class, 'camp'])->name('camp');
});

Route::get('/download/{file}', function ($file) {
    $filename = Str::kebab(Carbon::now()->format('YmdHi') . ' Postal Bible School download.' . Str::afterLast($file, '.'));
    $headers = [
        'Content-Type' => 'application/pdf',
    ];
    return response()->download(public_path('storage/' . $file), $filename, $headers);
})->where('file', '.*')->name('assets.download');

Route::get('/assets/{file}', function ($file) {
    return response()->file(public_path('storage/' . $file));
})->where('file', '.*')->name('assets.show');

Route::get('/images/{file}', function ($image) {
    return response()->file(Storage::url($image));
})->name('images.show');