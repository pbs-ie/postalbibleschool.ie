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
        Schema::create('fm_students', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->bigInteger('fm_student_id')->unsigned();
            $table->string('first_name');
            $table->string('last_name');
            $table->string('grade');
            $table->string('area_code');
            $table->bigInteger('classroom_id')->unsigned()->nullable();
            $table->foreign('classroom_id')->references('id')->on('classrooms');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('fm_students');
    }
};
