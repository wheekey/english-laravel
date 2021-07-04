<?php


namespace App\Services;


use App\Models\Game;

class GameService
{


    /**
     * GameService constructor.
     */
    public function __construct(private Game $game)
    {
    }

    public function isRightAnswer(int $gameId, array $words): bool
    {
        $rrr = $this->game::find($gameId)->phrase;
        $rrr2 = implode(' ', array_column($words, 'content'));

        return $this->game::find($gameId)->phrase === implode(' ', array_column($words, 'content'));
    }
}
