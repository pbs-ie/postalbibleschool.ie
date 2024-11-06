<?php

namespace App\Http\Controllers;

use App\Models\Classroom;
use App\Models\Curriculum;
use App\Services\ClassroomService;
use App\Services\SchoolService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Gate;
use App\Models\FmSchoolDetails;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Log;
use App\Jobs\PushOrdersToFilemaker;


class SchoolController extends Controller
{
    private function getFmOrderRecordsMap()
    {
        return [
            'fmRecordId' => 'recordId',
            'email' => 'Contact Email',
            'schoolName' => 'Area',
            'schoolType' => 'Dispatch Code',
            'level0Order' => 'L0 Ord',
            'level1Order' => 'L1 Ord',
            'level2Order' => 'L2 Ord',
            'level3Order' => 'L3 Ord',
            'level4Order' => 'L4 Ord',
            'tlpOrder' => 'TLP Ord',
            'goingDeeperOrder' => 'NL Ord',
            'gleanersOrder' => 'Adv Ord'
        ];
    }
    function getCurrentUserOrder()
    {
        return FmSchoolDetails::where('email', auth()->user()->email)->get()?->first();
    }

    function isCurrentOrderUser(FmSchoolDetails $schoolDetails)
    {
        $isAdmin = Gate::check('create:orders');
        return !$isAdmin && ($this->getCurrentUserOrder()?->id !== $schoolDetails?->id);
    }


    private function updateFilemakerOrder(int $recordId, $changedRecord)
    {
        $mapValues = $this->getFmOrderRecordsMap();
        $keys = array_keys((array) $changedRecord);
        for ($i = 0; $i < count($keys); $i++) {
            $currentKey = $keys[$i];
            $changedRecord->{$mapValues[$currentKey]} = $changedRecord->$currentKey;
            unset($changedRecord->$currentKey);
        }
        return (new FilemakerController())->updateLessonOrders($recordId, $changedRecord);
    }

    /**
     * Show list of schools with projections per $month
     *
     * @param string $month
     * @return \Inertia\Response|\Illuminate\Http\RedirectResponse
     */
    public function index($month = "sep")
    {
        if (!in_array($month, ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'sep', 'oct', 'nov', 'dec'])) {
            return redirect()->route('orders.index')->with('failure', 'Incorrect month value');
        }
        $schoolDetails = FmSchoolDetails::getActiveOrders()->get()->sortBy([
            ['schoolType', 'asc'],
            ['schoolName', 'asc']
        ])->values();
        // @param mixed $projectedOrders list of all schools with their projected orders filtered by month
        $projectedOrders = (new ClassroomService())->getProjectedOrdersByMonth($schoolDetails, $month);

        return Inertia::render('SchoolOrder/Index', [
            'projectedOrders' => fn() => $projectedOrders,
            'currentMonth' => $month
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\FmSchoolDetails  $schoolDetails
     * @return \Inertia\Response | void
     */
    public function show(FmSchoolDetails $schoolDetails)
    {
        if ($this->isCurrentOrderUser($schoolDetails)) {
            return abort(404);
        }

        $projectedOrders = (new ClassroomService)->getProjectedMonthlyOrders($schoolDetails->email);
        $activeSchools = FmSchoolDetails::getActiveOrders()->get(['id', 'schoolName'])->map->only(['id', 'schoolName']);
        $classrooms = Classroom::with('curriculum')->where('email', $schoolDetails->email)->get();
        return Inertia::render('SchoolOrder/Show', [
            'schoolDetails' => $schoolDetails,
            'schoolsList' => fn() => $activeSchools,
            'classrooms' => fn() => $classrooms,
            'curricula' => fn() => Curriculum::all(),
            'projectedOrders' => fn() => $projectedOrders
        ]);
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\FmSchoolDetails  $schoolDetails
     * @return \Illuminate\Http\RedirectResponse | void
     */
    // public function update(Request $request, FmSchoolDetails $schoolDetails)
    // {
    //     $isAdmin = Gate::check('create:orders');
    //     if ($this->isCurrentOrderUser($schoolDetails)) {
    //         return abort(404);
    //     }

    //     $validated = $request->validate([
    //         'level0Order' => ['numeric', 'max_digits:3'],
    //         'level1Order' => ['numeric', 'max_digits:3'],
    //         'level2Order' => ['numeric', 'max_digits:3'],
    //         'level3Order' => ['numeric', 'max_digits:3'],
    //         'level4Order' => ['numeric', 'max_digits:3'],
    //         'tlpOrder' => ['numeric', 'max_digits:3'],
    //         'goingDeeperOrder' => ['numeric', 'max_digits:3'],
    //         'gleanersOrder' => ['numeric', 'max_digits:3']
    //     ]);
    //     // };

    //     $schoolDetails->fill($validated);

    //     if ($schoolDetails->isDirty(['level0Order', 'level1Order', 'level2Order', 'level3Order', 'level4Order', 'tlpOrder'])) {
    //         $updatedRecord = (object) $validated;
    //         $isUpdated = $this->updateFilemakerOrder($schoolDetails['fmRecordId'], $updatedRecord);
    //         if ($isUpdated) {
    //             $schoolDetails->updated_at = Carbon::now();
    //             $schoolDetails->save();
    //             $schoolDetails->refresh();
    //         }
    //     }

    //     // Redirect back
    //     return redirect()->route('orders.show', $schoolDetails->id)->with('success', "Updated order for school successfully");
    // }

    /**
     * Pull from the Filemaker database to Laravel
     * 
     * @return \Illuminate\Http\RedirectResponse
     */
    public function sync()
    {
        try {
            $schoolService = new SchoolService();
            $schoolService->populateOrdersFromFilemaker();
            $schoolService->createDefaultClassroooms();
        } catch (\Exception $e) {
            Log::error($e);
            return redirect(route('orders.index'))->with('failure', "Could not synchronise data");
        }
        return redirect(route('orders.index'))->with('success', "Table data synchronised");
    }

    /**
     * Push snapshot to Filemaker database
     * 
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function push(Request $request)
    {
        $schoolDetails = FmSchoolDetails::getActiveOrders()->get();
        // @param mixed $projectedOrders list of all schools with their projected orders filtered by month
        $projectedOrders = (new ClassroomService())->getProjectedOrdersByMonth($schoolDetails, $request->month);
        try {
            // PushOrdersToFilemaker::dispatch($projectedOrders);
            (new SchoolService)->pushOrdersToFilemaker($projectedOrders);
        } catch (\Exception $e) {
            Log::error($e);
            return redirect()->back()->with('failure', "Could not push to database");
        }
        return redirect()->back()->with('success', "Table data synchronised");
    }

    /**
     * Create default classrooms for school emails that do not have an associated classroom
     * 
     * @return \Illuminate\Http\RedirectResponse
     */
    public function createDefaultClassrooms()
    {
        try {
            (new SchoolService)->createDefaultClassroooms();
        } catch (\Exception $e) {
            Log::error($e);
            return redirect(route('orders.index'))->with('failure', "Could not create default classrooms. Check error logs");
        }
        return redirect(route('orders.index'))->with('success', "Default classrooms created");
    }

}
