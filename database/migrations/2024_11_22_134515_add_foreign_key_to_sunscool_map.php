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
        Schema::table('sunscool_map', function (Blueprint $table) {
            $table->unsignedBigInteger('fm_student_id');
            $table->foreign('fm_student_id')->references('fm_student_id')->on('fm_students');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('sunscool_map', function (Blueprint $table) {
            $table->dropForeign(['fm_student_id']);
        });
    }
};
