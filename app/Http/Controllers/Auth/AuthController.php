<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\User;
use JWTAuth;
use Validator;
use Hash;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required'
        ]);
        if($validator->fails()){
            return response()->json(['error' => true, 'message' => $validator->messages()]);
        }
        $credentials = $request->only('email', 'password');
        $user = User::where(['email' => $credentials['email']])->first();
        if(!$user){
            return response()->json(['error' => true, 'message' => 'Invalid login details']);
        }
        if(Hash::check($credentials['password'], $user->password)){
            $token = JWTAuth::attempt($credentials);
            return response()->json(['success' => true, 'token' => $token,'user'=>$user]);
        }else{
            return response()->json(['error' => true, 'message' => 'Invalid login details']);
        }

    }

    public function logout(Request $request)
    {
        auth()->logout();
        return response()->json(['message' => 'Successfully logged out']);
    }
}
