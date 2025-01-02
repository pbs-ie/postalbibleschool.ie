<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('bonus_videos', function (Blueprint $table) {
            $table->string('download_link')->nullable()->after('external_url');
            $table->string('download_title')->nullable()->after('download_link');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('bonus_videos', function (Blueprint $table) {
            $table->dropColumn('download_link');
            $table->dropColumn('download_title');
        });
    }
};
