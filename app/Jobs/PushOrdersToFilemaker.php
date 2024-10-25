<?php

namespace App\Jobs;

use App\Services\LessonOrderService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class PushOrdersToFilemaker implements ShouldQueue, ShouldBeUnique
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $projectedOrders;

    /**
     * Create a new job instance.
     *
     * @param mixed $projectedOrders
     * @return void
     */
    public function __construct($projectedOrders)
    {
        $this->projectedOrders = $projectedOrders;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle(LessonOrderService $lessonOrderService)
    {
        $lessonOrderService->pushOrdersToFilemaker($this->projectedOrders);
    }
}
