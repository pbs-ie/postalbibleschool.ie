<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('fm_lesson_orders', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('fmRecordId')->unique();
            $table->string('email')->nullable();
            $table->string('schoolName');
            $table->string('schoolType');
            $table->smallInteger('level0Order')->default(0);
            $table->smallInteger('level1Order')->default(0);
            $table->smallInteger('level2Order')->default(0);
            $table->smallInteger('level3Order')->default(0);
            $table->smallInteger('level4Order')->default(0);
            $table->smallInteger('tlpOrder')->default(0);
            $table->smallInteger('goingDeeperOrder')->default(0);
            $table->smallInteger('gleanersOrder')->default(0);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('fm_lesson_orders');
    }
};
