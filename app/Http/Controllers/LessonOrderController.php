<?php

namespace App\Http\Controllers;

use App\Models\LessonOrder;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Mail\OrderChanged;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Gate;
use App\Http\Controllers\FilemakerController;
use App\Models\FmLessonOrder;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;
use stdClass;


class LessonOrderController extends Controller
{

    function getCurrentUserOrder()
    {
        return FmLessonOrder::where('email', auth()->user()->email)->get()?->first();
    }

    function isCurrentOrderUser(FmLessonOrder $lessonOrder)
    {
        $isAdmin = Gate::check('create:orders');
        return !$isAdmin && ($this->getCurrentUserOrder()?->id !== $lessonOrder?->id);
    }

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
    private function getRules()
    {
        return [
            'fmRecordId' => ['nullable'],
            'email' => ['email', 'nullable'],
            'schoolName' => ['required', 'max:50', 'min:3'],
            'schoolType' => ['nullable', 'string', 'max:50'],
            'level0Order' => ['numeric', 'max_digits:3'],
            'level1Order' => ['numeric', 'max_digits:3'],
            'level2Order' => ['numeric', 'max_digits:3'],
            'level3Order' => ['numeric', 'max_digits:3'],
            'level4Order' => ['numeric', 'max_digits:3'],
            'tlpOrder' => ['numeric', 'max_digits:3'],
            'goingDeeperOrder' => ['numeric', 'max_digits:3'],
            'gleanersOrder' => ['numeric', 'max_digits:3'],
        ];
    }
    public function populateOrdersFromFilemaker()
    {
        $fmLessonOrders = collect((new FilemakerController())->getLessonOrders());
        $mapValues = $this->getFmOrderRecordsMap();
        $mappedOrders = $fmLessonOrders->map(function ($item, $key) use ($mapValues) {
            $fieldData = $item->fieldData;
            $returnObject = (object) array (
                'fmRecordId' => $item->recordId,
                'schoolName' => trim($fieldData->{$mapValues['schoolName']}),
                'email' => trim($fieldData->{$mapValues['email']}),
                'schoolType' => trim($fieldData->{$mapValues['schoolType']}),
                'level0Order' => trim($fieldData->{$mapValues['level0Order']}) ?: 0,
                'level1Order' => trim($fieldData->{$mapValues['level1Order']}) ?: 0,
                'level2Order' => trim($fieldData->{$mapValues['level2Order']}) ?: 0,
                'level3Order' => trim($fieldData->{$mapValues['level3Order']}) ?: 0,
                'level4Order' => trim($fieldData->{$mapValues['level4Order']}) ?: 0,
                'goingDeeperOrder' => trim($fieldData->{$mapValues['goingDeeperOrder']}) ?: 0,
                "gleanersOrder" => trim($fieldData->{$mapValues["gleanersOrder"]}) ?: 0,
                'tlpOrder' => trim($fieldData->{$mapValues['tlpOrder']}) ?: 0
            );
            return $returnObject;
        });
        $lessonOrders = json_decode(json_encode($mappedOrders->toArray()), true);
        $safeValues = [];
        foreach ($lessonOrders as $value) {
            $validator = Validator::make($value, $this->getRules());
            if ($validator->fails()) {
                $validator->errors()->add("Name of School", $value['schoolName']);
                dd($validator->errors());
            }
            $validatedValues = $validator->validated();
            $validatedValues['created_at'] = Carbon::now();
            array_push($safeValues, $validatedValues);
        }
        // First removing all rows of the table
        FmLessonOrder::truncate();
        // Populating with the new values from FM
        DB::table('fm_lesson_orders')->insert($safeValues);
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
            $lessonOrders = FmLessonOrder::all();
            return Inertia::render('LessonOrder/Index', [
                'lessonOrders' => $lessonOrders,
                'getAllOrdersCall' => '/api/lesson/orders/'
            ]);
        } else {
            $userLesson = $this->getCurrentUserOrder();
            if (!isset($userLesson)) {
                return Inertia::render('LessonOrder/NotFound');
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
        $isAdmin = Gate::check('create:orders');
        if ($this->isCurrentOrderUser($lessonOrder)) {
            return abort(404);
        }

        return Inertia::render('LessonOrder/Show', [
            'isAdmin' => $isAdmin,
            'lessonOrder' => $lessonOrder
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

        return Inertia::render('LessonOrder/Edit', [
            'lessonOrder' => $lessonOrder,
            'isAdmin' => $isAdmin
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
            Mail::to(config('mail.admin.address'))->send(new OrderChanged($oldOrder, $lessonOrder));
        }

        // Redirect the user
        $request->session()->flash('success', "Updated order for school successfully");
        return redirect(route('orders.index'));
    }

    /**
     * Pull from the Filemaker database to Laravel
     * 
     * @return \Illuminate\Http\RedirectResponse
     */
    public function sync()
    {
        $this->populateOrdersFromFilemaker();
        return redirect(route('orders.index'))->with('success', "Table data synchronised");
    }

}
