<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class VariationOptionRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'name' => 'required|string|max:255',
            'price_modifier' => 'required|numeric',
            'sku_suffix' => 'nullable|string|max:255',
        ];
    }

    public function messages()
    {
        return [
            'name.required' => 'The option name is required.',
            'name.string' => 'The option name must be a string.',
            'name.max' => 'The option name may not be greater than 255 characters.',
            'price_modifier.required' => 'The price modifier is required.',
            'price_modifier.numeric' => 'The price modifier must be a number.',
            'sku_suffix.string' => 'The SKU suffix must be a string.',
            'sku_suffix.max' => 'The SKU suffix may not be greater than 255 characters.',
        ];
    }
}