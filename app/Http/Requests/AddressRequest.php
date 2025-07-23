<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AddressRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'user_id' => 'required|exists:users,id',
            'type' => 'required|in:billing,shipping',
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'school_name' => 'nullable|string|max:255',
            'house_name' => 'nullable|string|max:255',
            'course' => 'required|string|max:255',
            'region' => 'required|string|max:255',
            'phone' => 'required|string|max:20',
            'is_default' => 'boolean',
        ];
    }
}
