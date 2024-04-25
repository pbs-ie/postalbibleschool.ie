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
        Schema::table('classrooms', function (Blueprint $table) {
            $table->integer("level_0_order")->unsigned();
            $table->integer("level_1_order")->unsigned();
            $table->integer("level_2_order")->unsigned();
            $table->integer("level_3_order")->unsigned();
            $table->integer("level_4_order")->unsigned();
            $table->integer("tlp_order")->unsigned();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('classrooms', function (Blueprint $table) {
            $table->dropColumn(["level_0_order", "level_1_order", "level_2_order", "level_3_order", "level_4_order", "tlp_order"]);
        });
    }
};
