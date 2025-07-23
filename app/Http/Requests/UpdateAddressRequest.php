<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateAddressRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'type' => 'sometimes|required|in:billing,shipping',
            'first_name' => 'sometimes|required|string|max:255',
            'last_name' => 'sometimes|required|string|max:255',
            'compus_name' => 'nullable|string|max:255',
            'hall_name' => 'sometimes|required|string|max:255',
            'room_numer' => 'nullable|string|max:50',
            'region' => 'sometimes|required|string|max:255',
            'phone' => 'sometimes|required|string|max:20',
            'is_default' => 'sometimes|boolean',
        ];
    }

    public function messages()
    {
        return [
            'type.required' => 'The address type is required.',
            'type.in' => 'The address type must be either billing or shipping.',
            'first_name.required' => 'The first name is required.',
            'first_name.string' => 'The first name must be a string.',
            'first_name.max' => 'The first name may not be greater than 255 characters.',
            'last_name.required' => 'The last name is required.',
            'last_name.string' => 'The last name must be a string.',
            'last_name.max' => 'The last name may not be greater than 255 characters.',
            'compus_name.string' => 'The campus name must be a string.',
            'compus_name.max' => 'The campus name may not be greater than 255 characters.',
            'hall_name.required' => 'The hall name is required.',
            'hall_name.string' => 'The hall name must be a string.',
            'hall_name.max' => 'The hall name may not be greater than 255 characters.',
            'room_numer.string' => 'The room number must be a string.',
            'room_numer.max' => 'The room number may not be greater than 50 characters.',
            'region.required' => 'The region is required.',
            'region.string' => 'The region must be a string.',
            'region.max' => 'The region may not be greater than 255 characters.',
            'phone.required' => 'The phone number is required.',
            'phone.string' => 'The phone number must be a string.',
            'phone.max' => 'The phone number may not be greater than 20 characters.',
            'is_default.boolean' => 'The default status must be true or false.',
        ];
    }
}