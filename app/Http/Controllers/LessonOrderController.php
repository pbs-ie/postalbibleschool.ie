<?php

namespace App\Http\Controllers;

use App\Http\Middleware\CheckIfAdmin;
use App\Models\LessonOrder;
use Illuminate\Http\Request;
use Inertia\Inertia;


class LessonOrderController extends Controller
{

    /**
     * Create the controller instance.
     */
    // public function __construct()
    // {
    //     $this->authorizeResource(LessonOrder::class, null);
    // }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        if ($this->checkIfAdmin()) {
            return Inertia::render('LessonOrder/Index', [
                'lessonOrders' => LessonOrder::all()
            ]);
        } else {
            $userLesson = $this->getCurrentUserOrder();
            if (!isset($userLesson)) {
                return abort(403);
            }
            return redirect()->route('orders.show', $userLesson->id);
        }
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return Inertia::render('LessonOrder/Create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'schoolName' => ['required', 'max:50', 'min:3'],
            'email' => ['required', 'unique:lesson_orders', 'email'],
            'level0Order' => ['numeric', 'max_digits:3'],
            'level1Order' => ['numeric', 'max_digits:3'],
            'level2Order' => ['numeric', 'max_digits:3'],
            'level3Order' => ['numeric', 'max_digits:3'],
            'level4Order' => ['numeric', 'max_digits:3'],
            'tlpOrder' => ['numeric', 'max_digits:3']
        ]);

        LessonOrder::create($validated);

        // Redirect the user
        return redirect('/orders')->with('success', "New order for school created successfully");
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\LessonOrder  $lessonOrder
     * @return \Illuminate\Http\Response
     */
    public function show(LessonOrder $lessonOrder)
    {
        if ($this->checkIfAdmin())
            return Inertia::render('LessonOrder/Show', [
                'isAdmin' => $this->checkIfAdmin(),
                'lessonOrder' => $lessonOrder
            ]);
        if ($this->getCurrentUserOrder()->id !== $lessonOrder->id) {
            return abort(404);
        }

        return Inertia::render('LessonOrder/Show', [
            'isAdmin' => $this->checkIfAdmin(),
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
        return Inertia::render('LessonOrder/Edit', [
            'lessonOrder' => $lessonOrder,
            'isAdmin' => $this->checkIfAdmin()
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
        if ($this->checkIfAdmin()) {
            $validated = $request->validate([
                'schoolName' => ['required', 'max:50', 'min:3'],
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

        $lessonOrder->updateOrFail($validated);

        // Redirect the user
        return redirect('/orders')->with('success', "Updated order for school successfully");
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\LessonOrder  $lessonOrder
     * @return \Illuminate\Http\Response
     */
    public function destroy(LessonOrder $lessonOrder)
    {
        $lessonOrder->delete();
        return redirect('/orders')->with('success', "School entry deleted successfully");
    }

    function checkIfAdmin()
    {
        return (auth()?->user()?->email === "info@postalbibleschool.ie");
    }

    function getCurrentUserOrder()
    {
        return LessonOrder::where('email', auth()->user()->email)->get()?->first();
    }
}