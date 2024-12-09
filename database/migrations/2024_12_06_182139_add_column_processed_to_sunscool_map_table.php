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
        Schema::table('sunscool_map', function (Blueprint $table) {
            $table->boolean('is_processed')->default(false);
            $table->unsignedMediumInteger('progress')->nullable();
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
            $table->dropColumn('is_processed');
            $table->dropColumn('progress');
        });
    }
};
