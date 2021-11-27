<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MorseCodeController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', [MorseCodeController::class, 'index']);

Route::get('/challenge', [MorseCodeController::class, 'getChallenge']);
