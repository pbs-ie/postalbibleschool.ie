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
        Schema::table('step_events', function (Blueprint $table) {
            $table->string('speaker')->nullable();
            $table->renameColumn('title', 'topic');
            $table->renameColumn('date', 'startDate');
            $table->string('endDate');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('step_events', function (Blueprint $table) {
            $table->dropColumn('speaker');
            $table->renameColumn('topic', 'title');
            $table->renameColumn('startDate', 'date');
            $table->dropColumn('endDate');
        });
    }
};
