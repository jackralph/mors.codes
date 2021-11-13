<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\MorseCode;

class MorseCodeController extends Controller
{
    public function index()
    {
        $morse_codes = MorseCode::all();

        $morse_codes_array = [
            'oneChar' => [],
            'twoChar' => [],
            'threeChar' => [],
            'fourChar' => [],
            'fiveChar' => [],
            'sixChar' => [],
        ];

        $morse_codes_length_array = [
            1 => 'one',
            2 => 'two',
            3 => 'three',
            4 => 'four',
            5 => 'five',
            6 => 'six'
        ];

        foreach ($morse_codes as $morse_code) {
            $morse_code_length = $morse_codes_length_array[strlen($morse_code->morse)];

            array_push($morse_codes_array["{$morse_code_length}Char"], [
                'letter' => $morse_code->letter,
                'morse' => $morse_code->morse
            ]);
        }

        return view('welcome', [
            'morse_codes' => $morse_codes_array
        ]);
    }
}
