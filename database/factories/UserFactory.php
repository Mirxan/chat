<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\User;
use App\Message;
use Faker\Generator as Faker;
use Illuminate\Support\Str;

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| This directory should contain each of the model factory definitions for
| your application. Factories provide a convenient way to generate new
| model instances for testing / seeding your application's database.
|
*/

$factory->define(User::class, function (Faker $faker) {
	static $password;
    return [
        'name' => $faker->name,
        'phone' => $faker->phoneNumber,
        'email' => $faker->unique()->safeEmail,
        'profile_image' => 'http://via.placeholder.com/150x150',
        'email_verified_at' => now(),
        'password' => $password ?? Hash::make('secret'), // password
        'remember_token' => Str::random(15),
    ];
});

$factory->define(Message::class, function (Faker $faker) {
	static $password;
    do {
    	$from = rand(1,15);
    	$to = rand(1,15);
    } while ($from === $to);

    return [
    	'from'=>$from,
    	'to'=>$to,
    	'text'=>$faker->sentence,
    ];
});
