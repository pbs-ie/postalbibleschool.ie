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
        Schema::table('fm_students', function (Blueprint $table) {
            $table->dropForeign(['classroom_id']);
            $table->bigInteger('classroom_id')->unsigned()->nullable()->change();
            $table->foreign('classroom_id')->references('id')->on('classrooms')->nullOnDelete()->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('fm_students', function (Blueprint $table) {
            $table->dropForeign(['classroom_id']);
            $table->bigInteger('classroom_id')->unsigned()->nullable()->change();
            $table->foreign('classroom_id')->references('id')->on('classrooms')->restrictOnDelete()->change();
        });
    }
};
