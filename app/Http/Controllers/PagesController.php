<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Str;

class PagesController extends Controller
{
    private $all_names = [
        'Canelo Alvarez',
        'Naoya Inoue',
        'Terence Crawford',
        'Oleksandr Usyk',
        'Errol Spence',
        'Tyson Fury',
        'Teofimo Lopez',
        'Manny Pacquiao',
        'Kazuto Ioka',
        'Gennadiy Golovkin',
        'Juan Estrada',
        'Vasyl Lomachenko',
        'Gervonta Davis',
        'Anthony Joshua',
        'Mikey Garcia',
        'Jose Ramirez',
        'Roman Gonzalez',
        'Shawn Porter',
        'Leo Santa Cruz',
        'Kosei Tanaka'
    ];

    public function firstChallenge () {
        $teams = [];

        for($i = 0; $i < 4; $i++) {
            $seed = array_rand($this->all_names);
            $name = $this->all_names[$seed];
            $key = Str::slug($name);

            $teams[$key] = [
                'name'  => $name,
                'seed'  => $seed,
                'key'   => $key
            ];
        }

        return view('first_challenge', [ 'teams' => $teams ]);
    }
}
