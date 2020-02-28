<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::group([
    'middleware' => 'api',
    'namespace' => '\App\Http\Controllers',
], function ($router){
	Route::post('login', 'Auth\AuthController@login')->name('login');
});

Route::group(['middleware' => 'jwt.auth'], function ($router){
	Route::post('/logout', 'Auth\AuthController@logout');
	Route::get('/contacts', 'ChatController@contacts')->name('contacts');
	Route::get('/userMessage/{id}', 'ChatController@userMessages')->name('userMessage');
	Route::post('/sendMessage', 'ChatController@sendMessage')->name('sendMessage');
});

