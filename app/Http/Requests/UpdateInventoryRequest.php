<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateInventoryRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'sku' => 'sometimes|string|unique:inventories,sku,' . $this->inventory->id,
            'quantity' => 'sometimes|integer|min:0',
            'low_stock_threshold' => 'nullable|integer|min:0',
        ];
    }

    public function messages()
    {
        return [
            'sku.string' => 'The SKU must be a string.',
            'sku.unique' => 'This SKU is already in use.',
            'quantity.integer' => 'The quantity must be an integer.',
            'quantity.min' => 'The quantity must be at least 0.',
            'low_stock_threshold.integer' => 'The low stock threshold must be an integer.',
            'low_stock_threshold.min' => 'The low stock threshold must be at least 0.',
        ];
    }
}