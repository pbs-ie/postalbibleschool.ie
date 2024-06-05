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
        Schema::create('curricula', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('name');
            $table->string('email')->nullable();
            $table->string('jan_lesson')->nullable();
            $table->string('feb_lesson')->nullable();
            $table->string('mar_lesson')->nullable();
            $table->string('apr_lesson')->nullable();
            $table->string('may_lesson')->nullable();
            $table->string('jun_lesson')->nullable();
            $table->string('jul_lesson')->nullable();
            $table->string('aug_lesson')->nullable();
            $table->string('sep_lesson')->nullable();
            $table->string('oct_lesson')->nullable();
            $table->string('nov_lesson')->nullable();
            $table->string('dec_lesson')->nullable();
            $table->string('curriculum_type')->nullable();
            $table->string('grade')->nullable();
        });

        DB::table('curricula')->insert([
            array(
                'name' => 'Paper Only',
                'curriculum_type' => 'paper',
                'jan_lesson' => 'paper',
                'feb_lesson' => 'paper',
                'mar_lesson' => 'paper',
                'apr_lesson' => 'paper',
                'may_lesson' => 'paper',
                'jun_lesson' => 'paper',
                'jul_lesson' => 'paper',
                'aug_lesson' => 'paper',
                'sep_lesson' => 'paper',
                'oct_lesson' => 'paper',
                'nov_lesson' => 'paper',
                'dec_lesson' => 'paper'
            )
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('curricula');
    }
};
