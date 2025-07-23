<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ShippingRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'order_id' => 'required|exists:orders,id',
            'address_id' => 'nullable|exists:addresses,id',
            'method' => 'required|string|max:255',
            'carrier' => 'nullable|string|max:255',
            'tracking_number' => 'nullable|string|max:255',
            'cost' => 'required|numeric',
            'status' => 'string|max:255',
            'estimated_delivery' => 'nullable|date',
            'shipped_at' => 'nullable|date',
            'delivered_at' => 'nullable|date',
        ];
    }
}
