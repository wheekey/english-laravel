<?php

namespace App\Http\Controllers;

use App\Services\GameService;
use Illuminate\Support\Facades\Request;
use Inertia\Inertia;

class GameController extends Controller
{

    public function __construct(private GameService $gameService)
    {
    }

    public function __invoke()
    {
        return Inertia::render('Game/Index');
    }

    public function getWords()
    {
        /*return json_encode([
            'words' => [
                [
                    'id' => '0',
                    'content' => 'He'
                ],
                [
                    'id' => '1',
                    'content' => 'playing'
                ],
                [
                    'id' => '2',
                    'content' => 'is'
                ],
                [
                    'id' => '3',
                    'content' => 'football'
                ],
                ],
            'rightWords' => ['He', 'is', 'playing', 'football']
        ] );*/
    }

    public function isRight()
    {

        return ['isRight' => $this->gameService->isRightAnswer(Request::all())];
    }

}
