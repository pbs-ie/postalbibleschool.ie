<?php

namespace App\Http\Controllers;

use App\Models\Classroom;
use App\Services\LessonOrderService;
use App\Models\LessonOrder;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Mail\OrderChanged;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Gate;
use App\Models\FmLessonOrder;
use Illuminate\Support\Carbon;
use DB;


class LessonOrderController extends Controller
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
        return FmLessonOrder::where('email', auth()->user()->email)->get()?->first();
    }

    function isCurrentOrderUser(FmLessonOrder $lessonOrder)
    {
        $isAdmin = Gate::check('create:orders');
        return !$isAdmin && ($this->getCurrentUserOrder()?->id !== $lessonOrder?->id);
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
     * Display a listing of the resource.
     *
     * @param \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse|\Inertia\Response
     */
    public function index(Request $request)
    {
        $isAdmin = Gate::check('create:orders');
        if ($isAdmin) {
            $lessonOrders = FmLessonOrder::where('schoolType', '<>', 'G')->get();
            return Inertia::render('SchoolOrder/Index', [
                'lessonOrders' => $lessonOrders,
            ]);
        } else {
            $userLesson = $this->getCurrentUserOrder();
            if (!isset($userLesson)) {
                return Inertia::render('SchoolOrder/NotFound');
            }
            $request->session()->reflash();
            return redirect(route('orders.show', $userLesson->id));
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\FmLessonOrder  $lessonOrder
     * @return \Inertia\Response
     */
    public function show(FmLessonOrder $lessonOrder)
    {
        if ($this->isCurrentOrderUser($lessonOrder)) {
            return abort(404);
        }

        $classroomOrder = Classroom::where('email', $lessonOrder->email)->first(
            [
                DB::raw('SUM(level_0_order) as level_0_order_total'),
                DB::raw('SUM(level_1_order) as level_1_order_total'),
                DB::raw('SUM(level_2_order) as level_2_order_total'),
                DB::raw('SUM(level_3_order) as level_3_order_total'),
                DB::raw('SUM(level_4_order) as level_4_order_total'),
                DB::raw('SUM(tlp_order) as tlp_order_total'),
            ]
        );
        return Inertia::render('SchoolOrder/Show', [
            'lessonOrder' => $lessonOrder,
            'schoolsList' => fn() => FmLessonOrder::where('schoolType', '<>', 'G')->get(['id', 'schoolName'])->map->only(['id', 'schoolName']),
            'classroomOrder' => fn() => $classroomOrder
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\FmLessonOrder  $lessonOrder
     * @return \Inertia\Response
     */
    public function edit(FmLessonOrder $lessonOrder)
    {
        $isAdmin = Gate::check('create:orders');
        if ($this->isCurrentOrderUser($lessonOrder)) {
            return abort(404);
        }

        $classroomOrder = Classroom::where('email', $lessonOrder->email)->first(
            [
                DB::raw('SUM(level_0_order) as level_0_order_total'),
                DB::raw('SUM(level_1_order) as level_1_order_total'),
                DB::raw('SUM(level_2_order) as level_2_order_total'),
                DB::raw('SUM(level_3_order) as level_3_order_total'),
                DB::raw('SUM(level_4_order) as level_4_order_total'),
                DB::raw('SUM(tlp_order) as tlp_order_total'),
            ]
        );
        return Inertia::render('SchoolOrder/Edit', [
            'lessonOrder' => $lessonOrder,
            'classroomOrder' => fn() => $classroomOrder
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\FmLessonOrder  $lessonOrder
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(Request $request, FmLessonOrder $lessonOrder)
    {
        $isAdmin = Gate::check('create:orders');
        if ($this->isCurrentOrderUser($lessonOrder)) {
            return abort(404);
        }

        // if ($isAdmin) {
        //     $validated = $request->validate($this->getRules());
        // } else {
        $validated = $request->validate([
            'level0Order' => ['numeric', 'max_digits:3'],
            'level1Order' => ['numeric', 'max_digits:3'],
            'level2Order' => ['numeric', 'max_digits:3'],
            'level3Order' => ['numeric', 'max_digits:3'],
            'level4Order' => ['numeric', 'max_digits:3'],
            'tlpOrder' => ['numeric', 'max_digits:3'],
            'goingDeeperOrder' => ['numeric', 'max_digits:3'],
            'gleanersOrder' => ['numeric', 'max_digits:3']
        ]);
        // };

        $oldOrder = $lessonOrder->replicate();

        $lessonOrder->fill($validated);

        if ($lessonOrder->isDirty(['level0Order', 'level1Order', 'level2Order', 'level3Order', 'level4Order', 'tlpOrder'])) {
            $updatedRecord = (object) $validated;
            $isUpdated = $this->updateFilemakerOrder($lessonOrder['fmRecordId'], $updatedRecord);
            if ($isUpdated) {
                $lessonOrder->updated_at = Carbon::now();
                $lessonOrder->save();
                $lessonOrder->refresh();
            }
            // Send mail to admin
            // Mail::to(config('mail.admin.address'))->send(new OrderChanged($oldOrder, $lessonOrder));
        }

        // Redirect back
        return redirect()->route('orders.show', $lessonOrder->id)->with('success', "Updated order for school successfully");
    }

    /**
     * Pull from the Filemaker database to Laravel
     * 
     * @return \Illuminate\Http\RedirectResponse
     */
    public function sync()
    {
        try {
            (new LessonOrderService)->populateOrdersFromFilemaker();
        } catch (\Exception $e) {
            return redirect(route('orders.index'))->with('failure', "Could not synchronise data");
        }
        return redirect(route('orders.index'))->with('success', "Table data synchronised");
    }

}
