<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class NotificationRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'user_id' => 'required|exists:users,id',
            'sender_id' => 'nullable|exists:users,id',
            'type' => 'required|string|max:255',
            'title' => 'required|string|max:255',
            'body' => 'required|string',
            'data' => 'nullable|array',
            'is_read' => 'boolean',
            'read_at' => 'nullable|date',
        ];
    }
}
