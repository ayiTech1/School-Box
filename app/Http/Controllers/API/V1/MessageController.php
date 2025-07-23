<?php

namespace App\Http\Controllers\API\V1;

use App\Models\Message;
use App\Http\Requests\MessageRequest;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    public function index()
    {
        $messages = Message::with(['sender', 'receiver'])->paginate(20);
        return response()->json($messages);
    }

    public function store(MessageRequest $request)
    {
        $message = Message::create($request->validated());
        return response()->json($message, 201);
    }

    public function show(Message $message)
    {
        return response()->json($message);
    }

    public function update(MessageRequest $request, Message $message)
    {
        $message->update($request->validated());
        return response()->json($message);
    }

    public function destroy(Message $message)
    {
        $message->delete();
        return response()->json(null, 204);
    }
}
