<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PaymentRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'order_id' => 'required|exists:orders,id',
            'amount' => 'required|numeric|min:0.01',
            'payment_method' => 'required|string',
            'transaction_id' => 'nullable|string',
            'status' => 'required|string',
            'currency' => 'sometimes|string|size:3',
            'payment_details' => 'nullable|array',
        ];
    }

    public function messages()
    {
        return [
            'order_id.required' => 'The order ID is required.',
            'order_id.exists' => 'The selected order does not exist.',
            'amount.required' => 'The amount is required.',
            'amount.numeric' => 'The amount must be a number.',
            'amount.min' => 'The amount must be at least 0.01.',
            'payment_method.required' => 'The payment method is required.',
            'payment_method.string' => 'The payment method must be a string.',
            'transaction_id.string' => 'The transaction ID must be a string.',
            'status.required' => 'The status is required.',
            'status.string' => 'The status must be a string.',
            'currency.string' => 'The currency must be a string.',
            'currency.size' => 'The currency must be exactly 3 characters.',
            'payment_details.array' => 'Payment details must be in the correct format.',
        ];
    }
}