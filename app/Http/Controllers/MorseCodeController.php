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
            '1_char' => [],
            '2_char' => [],
            '3_char' => [],
            '4_char' => [],
            '5_char' => [],
            '6_char' => [],
        ];

        foreach ($morse_codes as $morse_code) {
            $morse_code_length = strlen($morse_code->morse);

            $morse_codes_array["{$morse_code_length}_char"][$morse_code->letter] = $morse_code->morse;
        }

        return view('welcome');
    }
}
