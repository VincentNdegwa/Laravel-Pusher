<?php

namespace App\Http\Controllers;

use App\Events\message;
use Illuminate\Http\Request;

class messages extends Controller
{
    public function readMessage(Request $request)
    {
        broadcast(new message($request->input("username"), $request->input("message")));

        return response()->json([
            "status" => "message received",
            "message" => $request->input("message")
        ]);
    }
}
