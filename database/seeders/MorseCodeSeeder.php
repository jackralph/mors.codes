<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\MorseCode;
use File;

class MorseCodeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $morse_code_json = File::get('database/data/morse-code.json');
        $morse_code = json_decode($morse_code_json);

        foreach ($morse_code as $letter => $morse) {
            MorseCode::create([
                'letter' => $letter,
                'morse' => $morse
            ]);
        }
    }
}
