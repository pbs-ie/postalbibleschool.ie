<?php

use Spatie\LaravelSettings\Migrations\SettingsBlueprint;
use Spatie\LaravelSettings\Migrations\SettingsMigration;

return new class extends SettingsMigration {
    public function up(): void
    {
        $this->migrator->inGroup('camp', function (SettingsBlueprint $blueprint): void {
            $blueprint->add('dates', "13th to 20th July, 2024");
            $blueprint->add('year', '2024');
            $blueprint->add('embedLink', "https://docs.google.com/forms/d/e/1FAIpQLSdEmA2nUyNVz6Lzb5RxUctJLt3bOBPHp1PG7O-RoP3OCWnCVg/viewform");
            $blueprint->add('isActive', true);
            $blueprint->add('reunionDates', "2nd to 4th October, 2024");
            $blueprint->add('reunionIsActive', true);
            $blueprint->add('reunionFormEmbedLink', 'https://docs.google.com/forms/d/e/1FAIpQLSfnEcphksxb_7x9BHYUTwrRxnSdzJ88qEGiO8mShYiZkC2R4w/viewform?usp=sf_link');
            $blueprint->add('paymentDescription', "You can pay for Summer Camp 2024 to Postal Bible School here");
            $blueprint->add('paymentPrices', ['150', '170']);
        });
    }
    public function down(): void
    {
        $this->migrator->delete('camp.dates');
        $this->migrator->delete('camp.year');
        $this->migrator->delete('camp.embedLink');
        $this->migrator->delete('camp.isActive');
        $this->migrator->delete('camp.reunionDates');
        $this->migrator->delete('camp.reunionIsActive');
        $this->migrator->delete('camp.reunionFormEmbedLink');
        $this->migrator->delete('camp.paymentDescription');
        $this->migrator->delete('camp.paymentPrices');
    }
};
