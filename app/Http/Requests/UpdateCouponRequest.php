<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateCouponRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'description' => 'nullable|string',
            'discount_type' => 'sometimes|in:fixed,percentage',
            'discount_value' => 'sometimes|numeric|min:0',
            'min_order_amount' => 'nullable|numeric|min:0',
            'max_uses' => 'nullable|integer|min:1',
            'max_uses_per_user' => 'nullable|integer|min:1',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'is_active' => 'sometimes|boolean',
        ];
    }

    public function messages()
    {
        return [
            'description.string' => 'The description must be a string.',
            'discount_type.in' => 'The discount type must be either fixed or percentage.',
            'discount_value.numeric' => 'The discount value must be a number.',
            'discount_value.min' => 'The discount value must be at least 0.',
            'min_order_amount.numeric' => 'The minimum order amount must be a number.',
            'min_order_amount.min' => 'The minimum order amount must be at least 0.',
            'max_uses.integer' => 'The maximum uses must be an integer.',
            'max_uses.min' => 'The maximum uses must be at least 1.',
            'max_uses_per_user.integer' => 'The maximum uses per user must be an integer.',
            'max_uses_per_user.min' => 'The maximum uses per user must be at least 1.',
            'start_date.date' => 'The start date must be a valid date.',
            'end_date.date' => 'The end date must be a valid date.',
            'end_date.after_or_equal' => 'The end date must be after or equal to the start date.',
            'is_active.boolean' => 'The active status must be true or false.',
        ];
    }
}