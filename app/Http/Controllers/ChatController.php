<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use App\Message;

class ChatController extends Controller
{
    public function contacts(){
    	$users = User::where('id','!=',auth()->user()->id)->get();
    	return response()->json(['result'=>$users]);
    }

    public function userMessages($id){
		$messages = Message::where(function($q) use ($id){
			$q->where('from',auth()->user()->id)
				->where('to',$id);
		})
		->orWhere(function($q) use ($id){
			$q->where('from',$id)
				->where('to',auth()->user()->id);
		})->get();
    	return response()->json(['result'=>$messages]);
    }

    public function sendMessage(Request $request){
    	$message = Message::create([
    		'from' => auth()->user()->id,
    		'to' => $request->contact_id,
    		'text' => $request->text
    	]);
    	
    	return response()->json(['success'=> true]);
    }
}
