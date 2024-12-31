<?php

namespace Database\Factories;

use App\Models\BonusVideo;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\BonusVideo>
 */
class BonusVideoFactory extends Factory
{
    protected $model = BonusVideo::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $titleWord = fake()->word();

        return [
            'title' => $titleWord,
            'category' => fake()->randomElement(['bbooks', 'bbw']),
            'imageLink' => 'https://picsum.photos/1600/900?random='.fake()->randomNumber(3),
            'videoTitle' => $titleWord,
            'externalUrl' => 'https://player.vimeo.com/video/868838499?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
            'duration' => fake()->time('i').' min',
        ];
    }
}
