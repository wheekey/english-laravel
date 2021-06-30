<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\User;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Facades\Validator;
use Exception;
use Illuminate\Support\Facades\Auth;

class SocialGithubController extends Controller
{
    public function githubRedirect()
    {
        return Socialite::driver('github')->redirect();
    }

    public function loginWithGithub()
    {
        try {

            $user = Socialite::driver('github')->user();
            $isUser = User::where('github_id', $user->id)->first();

            if($isUser){
                Auth::login($isUser);
                return redirect('/dashboard');
            }else{
                $createUser = User::create([
                    'name' => $user->name,
                    'email' => $user->email,
                    'github_id' => $user->id,
                    'password' => encrypt('Wandex1')
                ]);

                Auth::login($createUser);
                return redirect('/dashboard');
            }

        } catch (Exception $exception) {
            dd($exception->getMessage());
        }
    }
}
