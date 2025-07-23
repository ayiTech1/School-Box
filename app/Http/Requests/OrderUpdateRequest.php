<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateOrderRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'user_id' => 'nullable|exists:users,id',
            'order_number' => [
                'required',
                'string',
                Rule::unique('orders', 'order_number')->ignore($this->route('order'))
            ],
            'status' => 'required|string',
            'sub_total' => 'required|numeric|min:0',
            'discount_amount' => 'nullable|numeric|min:0',
            'tax_amount' => 'nullable|numeric|min:0',
            'shipping_amount' => 'nullable|numeric|min:0',
            'total' => 'required|numeric|min:0',
            'notes' => 'nullable|string',
            'shipping_method' => 'nullable|string',
            'payment_method' => 'required|string',
            'billing_address_id' => 'nullable|exists:addresses,id',
            'shipping_address_id' => 'nullable|exists:addresses,id',
            'coupon_code' => 'nullable|string',
        ];
    }

    public function messages()
    {
        return [
            'order_number.required' => 'The order number is required.',
            'order_number.unique' => 'This order number is already in use.',
            'status.required' => 'The status is required.',
            'sub_total.required' => 'The subtotal is required.',
            'total.required' => 'The total is required.',
            'payment_method.required' => 'The payment method is required.',
            'user_id.exists' => 'The selected user does not exist.',
            'billing_address_id.exists' => 'The selected billing address does not exist.',
            'shipping_address_id.exists' => 'The selected shipping address does not exist.',
        ];
    }
}
