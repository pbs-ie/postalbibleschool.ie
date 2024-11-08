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
        Schema::create('lesson_orders', function (Blueprint $table) {
            $table->id();
            $table->string('email')->unique();
            $table->timestamps();
            $table->string('schoolName');
            $table->smallInteger('level0Order');
            $table->smallInteger('level1Order');
            $table->smallInteger('level2Order');
            $table->smallInteger('level3Order');
            $table->smallInteger('level4Order');
            $table->smallInteger('tlpOrder');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('lesson_orders');
    }
};
