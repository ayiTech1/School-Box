<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class OrderRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'user_id' => 'nullable|exists:users,id',
            'status' => 'required|string|in:pending,processing,completed,cancelled',
            'sub_total' => 'required|numeric|min:0',
            'discount_amount' => 'required|numeric|min:0',
            'tax_amount' => 'required|numeric|min:0',
            'shipping_amount' => 'required|numeric|min:0',
            'total' => 'required|numeric|min:0',
            'notes' => 'nullable|string',
            'shipping_method' => 'nullable|string',
            'payment_method' => 'required|string',
            'billing_address_id' => 'nullable|exists:addresses,id',
            'shipping_address_id' => 'nullable|exists:addresses,id',
            'coupon_code' => 'nullable|string',
            'items' => 'required|array',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1',
            'items.*.price' => 'required|numeric|min:0',
            'items.*.options' => 'nullable|array',
        ];
    }

    public function messages()
    {
        return [
            'user_id.exists' => 'The selected user does not exist.',
            'status.required' => 'The status field is required.',
            'status.in' => 'The selected status is invalid.',
            'sub_total.required' => 'The subtotal is required.',
            'sub_total.numeric' => 'The subtotal must be a number.',
            'sub_total.min' => 'The subtotal must be at least 0.',
            'discount_amount.required' => 'The discount amount is required.',
            'discount_amount.numeric' => 'The discount amount must be a number.',
            'discount_amount.min' => 'The discount amount must be at least 0.',
            'tax_amount.required' => 'The tax amount is required.',
            'tax_amount.numeric' => 'The tax amount must be a number.',
            'tax_amount.min' => 'The tax amount must be at least 0.',
            'shipping_amount.required' => 'The shipping amount is required.',
            'shipping_amount.numeric' => 'The shipping amount must be a number.',
            'shipping_amount.min' => 'The shipping amount must be at least 0.',
            'total.required' => 'The total is required.',
            'total.numeric' => 'The total must be a number.',
            'total.min' => 'The total must be at least 0.',
            'notes.string' => 'The notes must be a string.',
            'shipping_method.string' => 'The shipping method must be a string.',
            'payment_method.required' => 'The payment method is required.',
            'payment_method.string' => 'The payment method must be a string.',
            'billing_address_id.exists' => 'The selected billing address does not exist.',
            'shipping_address_id.exists' => 'The selected shipping address does not exist.',
            'coupon_code.string' => 'The coupon code must be a string.',
            'items.required' => 'At least one order item is required.',
            'items.array' => 'The items must be an array.',
            'items.*.product_id.required' => 'Each item must have a product.',
            'items.*.product_id.exists' => 'One or more selected products do not exist.',
            'items.*.quantity.required' => 'Each item must have a quantity.',
            'items.*.quantity.integer' => 'Quantity must be a whole number.',
            'items.*.quantity.min' => 'Quantity must be at least 1.',
            'items.*.price.required' => 'Each item must have a price.',
            'items.*.price.numeric' => 'Price must be a number.',
            'items.*.price.min' => 'Price must be at least 0.',
            'items.*.options.array' => 'Options must be in the correct format.',
        ];
    }
}