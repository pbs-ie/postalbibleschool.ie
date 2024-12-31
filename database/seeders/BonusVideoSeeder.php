<?php

namespace Database\Seeders;

use App\Models\BonusVideo;
use Illuminate\Database\Seeder;

class BonusVideoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        BonusVideo::on()->truncate();
        BonusVideo::factory()
            ->count(10)
            ->create();
    }
}
