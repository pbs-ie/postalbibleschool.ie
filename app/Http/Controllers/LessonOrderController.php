<?php

namespace App\Http\Controllers;

use App\Models\Classroom;
use App\Models\Curriculum;
use App\Services\ClassroomService;
use App\Services\LessonOrderService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Gate;
use App\Models\FmLessonOrder;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Log;


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
     * @return \Inertia\Response
     */
    public function index(Request $request)
    {
        $lessonOrders = FmLessonOrder::where('schoolType', '<>', 'G')->get();
        return Inertia::render('SchoolOrder/Index', [
            'lessonOrders' => $lessonOrders
        ]);
    }

    /**
     * Show list of schools with projections per $month
     * 
     * @param \Illuminate\Http\Request $request
     * @param string $month
     * @return \Inertia\Response|\Illuminate\Http\RedirectResponse
     */
    public function projections($month = "sep")
    {
        if (!in_array($month, ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'sep', 'oct', 'nov', 'dec'])) {
            return redirect()->route('orders.index')->with('failure', 'Incorrect month value');
        }
        $lessonOrders = FmLessonOrder::where('schoolType', '<>', 'G')->get();
        $projectedOrders = $lessonOrders->map(function ($order, $key) use ($month) {
            return (new ClassroomService)->getProjectedOrdersByMonth($order, $month);
        });
        return Inertia::render('SchoolOrder/Projections', [
            'projectedOrders' => fn() => $projectedOrders,
            'currentMonth' => $month
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\FmLessonOrder  $lessonOrder
     * @return \Inertia\Response | void
     */
    public function show(FmLessonOrder $lessonOrder)
    {
        if ($this->isCurrentOrderUser($lessonOrder)) {
            return abort(404);
        }

        $projectedOrders = (new ClassroomService)->getProjectedMonthlyOrders($lessonOrder->email);

        return Inertia::render('SchoolOrder/Show', [
            'lessonOrder' => $lessonOrder,
            'schoolsList' => fn() => FmLessonOrder::where('schoolType', '<>', 'G')->get(['id', 'schoolName'])->map->only(['id', 'schoolName']),
            'classrooms' => fn() => Classroom::where('email', $lessonOrder->email)->get(),
            'curricula' => fn() => Curriculum::all(),
            'projectedOrders' => fn() => $projectedOrders
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\FmLessonOrder  $lessonOrder
     * @return \Inertia\Response | void
     */
    public function edit(FmLessonOrder $lessonOrder)
    {
        if ($this->isCurrentOrderUser($lessonOrder)) {
            return abort(404);
        }

        $projectedOrders = (new ClassroomService)->getProjectedMonthlyOrders($lessonOrder->email);

        return Inertia::render('SchoolOrder/Edit', [
            'lessonOrder' => $lessonOrder,
            'classrooms' => fn() => Classroom::where('email', $lessonOrder->email)->get(),
            'curricula' => fn() => Curriculum::all(),
            'projectedOrders' => fn() => $projectedOrders
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\FmLessonOrder  $lessonOrder
     * @return \Illuminate\Http\RedirectResponse | void
     */
    public function update(Request $request, FmLessonOrder $lessonOrder)
    {
        $isAdmin = Gate::check('create:orders');
        if ($this->isCurrentOrderUser($lessonOrder)) {
            return abort(404);
        }

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

        $lessonOrder->fill($validated);

        if ($lessonOrder->isDirty(['level0Order', 'level1Order', 'level2Order', 'level3Order', 'level4Order', 'tlpOrder'])) {
            $updatedRecord = (object) $validated;
            $isUpdated = $this->updateFilemakerOrder($lessonOrder['fmRecordId'], $updatedRecord);
            if ($isUpdated) {
                $lessonOrder->updated_at = Carbon::now();
                $lessonOrder->save();
                $lessonOrder->refresh();
            }
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
            Log::error($e);
            return redirect(route('orders.index'))->with('failure', "Could not synchronise data");
        }
        return redirect(route('orders.index'))->with('success', "Table data synchronised");
    }

}
