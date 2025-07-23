<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class InventoryRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'product_id' => 'required|exists:products,id',
            'sku' => 'required|string|unique:inventories,sku',
            'quantity' => 'required|integer|min:0',
            'low_stock_threshold' => 'nullable|integer|min:0',
        ];
    }

    public function messages()
    {
        return [
            'product_id.required' => 'Product is required.',
            'product_id.exists' => 'Product does not exist.',
            'sku.required' => 'SKU is required.',
            'sku.unique' => 'SKU must be unique.',
            'quantity.required' => 'Quantity is required.',
        ];
    }
}
