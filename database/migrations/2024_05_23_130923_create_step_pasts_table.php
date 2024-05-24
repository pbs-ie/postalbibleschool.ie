<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('step_pasts', function (Blueprint $table) {
            $table->id();
            $table->string('date');
            $table->longText('description');
            $table->string('title');
            $table->boolean('showDetails');
            $table->string('imageLink')->nullable();
            $table->string('routename')->unique()->nullable();
            $table->json('videoContent')->nullable();
            $table->json('fileContent')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('step_pasts');
    }
};
