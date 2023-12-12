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
use stdClass;


class LessonOrderController extends Controller
{
    private function getRules()
    {
        return [
            'fmRecordId' => ['nullable'],
            'schoolName' => ['required', 'max:50', 'min:3'],
            'schoolType' => ['nullable', 'string', 'max:50'],
            'level0Order' => ['numeric', 'max_digits:3'],
            'level1Order' => ['numeric', 'max_digits:3'],
            'level2Order' => ['numeric', 'max_digits:3'],
            'level3Order' => ['numeric', 'max_digits:3'],
            'level4Order' => ['numeric', 'max_digits:3'],
            'tlpOrder' => ['numeric', 'max_digits:3'],
            'goingDeeperOrder'=> ['numeric', 'max_digits:3'],
            'gleanersOrder'=> ['numeric', 'max_digits:3'],
        ];
    }
    private function populateOrdersFromFilemaker() 
    {
        $fmLessonOrders = collect((new FilemakerController())->getLessonOrders());
        $mappedOrders = $fmLessonOrders->map(function($item, $key) {
            $fieldData = $item->fieldData;
            $returnObject = (object) array(
                'fmRecordId' => $item->recordId,
                'schoolName' => trim($fieldData->{"Area"}),
                'schoolType' => trim($fieldData->{"Dispatch Code"}),
                'level0Order' => trim($fieldData->{"L0 Ord"}) ?: 0,
                'level1Order' => trim($fieldData->{"L1 Ord"}) ?: 0,
                'level2Order' => trim($fieldData->{"L2 Ord"}) ?: 0,
                'level3Order' => trim($fieldData->{"L3 Ord"}) ?: 0,
                'level4Order' => trim($fieldData->{"L4 Ord"}) ?: 0,
                'goingDeeperOrder' => trim($fieldData->{"NL Ord"}) ?: 0,
                "gleanersOrder" => trim($fieldData->{"Adv Ord"}) ?: 0,
                'tlpOrder' => trim($fieldData->{"TLP Ord"}) ?: 0
            );
            return $returnObject;
        });
        $lessonOrders = json_decode(json_encode($mappedOrders->toArray()), true);
        $safeValues = [];
        foreach($lessonOrders as $value) {
            $validator = Validator::make($value, $this->getRules());
            if($validator->fails()) {
                $validator->errors()->add("Name of School", $value['schoolName']);
                dd($validator->errors());
            }
            array_push($safeValues, $validator->validated());
        }
        // First removing all rows of the table
        FmLessonOrder::truncate();
        // Populating with the new values from FM
        DB::table('fm_lesson_orders')->insert($safeValues);
    }
    
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
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
                return Inertia::render('LessonOrder/NotFound', [], 404);
            }
            return redirect()->route('orders.show', $userLesson->id);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\LessonOrder  $lessonOrder
     * @return \Illuminate\Http\Response
     */
    public function show(LessonOrder $lessonOrder)
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
     * @param  \App\Models\LessonOrder  $lessonOrder
     * @return \Illuminate\Http\Response
     */
    public function edit(LessonOrder $lessonOrder)
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
     * @param  \App\Models\LessonOrder  $lessonOrder
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, LessonOrder $lessonOrder)
    {
        $isAdmin = Gate::check('create:orders');
        if ($this->isCurrentOrderUser($lessonOrder)) {
            return abort(404);
        }

        if ($isAdmin) {
            $validated = $request->validate([
                'schoolName' => ['required', 'max:50', 'min:3'],
                'schoolType' => ['nullable', 'string', 'max:50', 'min:3'],
                'email' => ['required', 'email'],
                'level0Order' => ['numeric'],
                'level1Order' => ['numeric'],
                'level2Order' => ['numeric'],
                'level3Order' => ['numeric'],
                'level4Order' => ['numeric'],
                'tlpOrder' => ['numeric']
            ]);
        } else {
            $validated = $request->validate([
                'level0Order' => ['numeric', 'max_digits:3'],
                'level1Order' => ['numeric', 'max_digits:3'],
                'level2Order' => ['numeric', 'max_digits:3'],
                'level3Order' => ['numeric', 'max_digits:3'],
                'level4Order' => ['numeric', 'max_digits:3'],
                'tlpOrder' => ['numeric', 'max_digits:3']
            ]);
        }

        $orderNumbersChanged = false;
        $oldOrder = $lessonOrder->replicate();

        $lessonOrder->fill($validated);

        if ($lessonOrder->isDirty(['level0Order', 'level1Order', 'level2Order', 'level3Order', 'level4Order', 'tlpOrder'])) {
            $orderNumbersChanged = true;
        }

        $lessonOrder->save();
        $lessonOrder->refresh();

        if ($orderNumbersChanged) {
            // Send mail to admin
            Mail::to(config('mail.admin.address'))->send(new OrderChanged($oldOrder, $lessonOrder));
        }

        // Redirect the user
        return redirect('/orders')->with('success', "Updated order for school successfully");
    }

    /**
     * Syncronise the Laravel database with Filemaker
     */
    public function sync() {
        $this->populateOrdersFromFilemaker();
        return redirect(route('orders.index'))->with('success', "Table synchronized");
    }

    function getCurrentUserOrder()
    {
        return LessonOrder::where('email', auth()->user()->email)->get()?->first();
    }

    function isCurrentOrderUser(LessonOrder $lessonOrder) {
        $isAdmin = Gate::check('create:orders');
        return !$isAdmin && ($this->getCurrentUserOrder()?->id !== $lessonOrder?->id);
    }
}
