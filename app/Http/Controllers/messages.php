<?php

namespace App\Http\Controllers;

use App\Events\message;
use Illuminate\Http\Request;

class messages extends Controller
{
    public function readMessage(Request $request)
    {
        $event =  event(new message($request->input("username"), $request->input("message")));
        return response()->json([
            "message" => $request->input("message"),
        ]);
    }
}
