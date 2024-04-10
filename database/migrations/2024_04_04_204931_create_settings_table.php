<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\Setting;

return new class extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('settings', function (Blueprint $table) {
            $table->string('key')->primary();
            $table->string('label');
            $table->text('value')->nullable();
            $table->string('type');
            $table->timestamps();
        });

        Setting::create([
            'key' => 'shed_upcoming_card',
            'label' => 'SHED Upcoming Card',
            'value' => "1",
            'type' => 'boolean',
        ]);
        Setting::create([
            'key' => 'prizegivings_upcoming_card',
            'label' => 'SHED Upcoming Card',
            'value' => "1",
            'type' => 'boolean',
        ]);
        Setting::create([
            'key' => 'step_upcoming_card',
            'label' => 'SHED Upcoming Card',
            'value' => "1",
            'type' => 'boolean',
        ]);
        Setting::create([
            'key' => 'camp_upcoming_card',
            'label' => 'SHED Upcoming Card',
            'value' => "1",
            'type' => 'boolean',
        ]);
        Setting::create([
            'key' => 'iteam_upcoming_card',
            'label' => 'SHED Upcoming Card',
            'value' => "1",
            'type' => 'boolean',
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('settings');
    }
};
