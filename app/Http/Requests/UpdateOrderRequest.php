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
            'status' => 'sometimes|required|string|in:pending,processing,completed,cancelled',
            'notes' => 'nullable|string',
            'shipping_method' => 'nullable|string',
            'shipping_amount' => 'sometimes|numeric|min:0',
            'discount_amount' => 'sometimes|numeric|min:0',
            'tax_amount' => 'sometimes|numeric|min:0',
            'total' => 'sometimes|numeric|min:0',
        ];
    }

    public function messages()
    {
        return [
            'status.required' => 'The status field is required.',
            'status.in' => 'The selected status is invalid.',
            'notes.string' => 'The notes must be a string.',
            'shipping_method.string' => 'The shipping method must be a string.',
            'shipping_amount.numeric' => 'The shipping amount must be a number.',
            'shipping_amount.min' => 'The shipping amount must be at least 0.',
            'discount_amount.numeric' => 'The discount amount must be a number.',
            'discount_amount.min' => 'The discount amount must be at least 0.',
            'tax_amount.numeric' => 'The tax amount must be a number.',
            'tax_amount.min' => 'The tax amount must be at least 0.',
            'total.numeric' => 'The total must be a number.',
            'total.min' => 'The total must be at least 0.',
        ];
    }
}