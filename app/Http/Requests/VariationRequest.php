<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class VariationRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'name' => 'required|string|max:255',
            'is_required' => 'boolean',
        ];
    }

    public function messages()
    {
        return [
            'name.required' => 'The variation name is required.',
            'name.string' => 'The variation name must be a string.',
            'name.max' => 'The variation name may not be greater than 255 characters.',
            'is_required.boolean' => 'The required status must be true or false.',
        ];
    }
}