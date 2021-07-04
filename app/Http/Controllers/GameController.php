<?php

namespace App\Http\Controllers;

use App\Models\Game;
use App\Services\GameService;
use Illuminate\Support\Facades\Request;
use Inertia\Inertia;

class GameController extends Controller
{

    public function __construct(private GameService $gameService, private Game $game)
    {
    }

    public function __invoke()
    {
        return Inertia::render('Game/Index');
    }

    public function getWords()
    {
        /* @var $game Game*/
        $game = $this->game::inRandomOrder()->limit(1)->get()[0];

        return json_encode([
            'words' => $game->splitWords(),
            'gameId' => $game->id,
            'imageUrl' => $game->image
        ] );
    }

    public function isRight()
    {
        $params = Request::all();
        return ['isRight' => $this->gameService->isRightAnswer($params['gameId'], $params['words'])];
        //return ['isRight' => false];
    }

}
