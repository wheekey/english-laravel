<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Game extends Model
{
    use HasFactory;

    public function splitWords()
    {
        $result = [];
        $words = explode(" ", $this->phrase);

        foreach ($words as $index => $word){
            $result[] = [
                'id' => strval($index),
                'content' => $word
            ];
        }
        shuffle($result);

        return $result;
    }


}
