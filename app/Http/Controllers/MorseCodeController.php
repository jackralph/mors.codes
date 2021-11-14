<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\MorseCode;

class MorseCodeController extends Controller
{
    public function index()
    {
        $morse_codes = MorseCode::all();

        $morse_codes_array = [];

        foreach ($morse_codes as $morse_code) {
            $morse_codes_array[$morse_code->letter] = $morse_code->morse;
        }

        return view('welcome', [
            'morse_codes' => $morse_codes_array
        ]);
    }
}
