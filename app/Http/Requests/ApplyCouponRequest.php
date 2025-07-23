<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ApplyCouponRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'code' => 'required|string',
        ];
    }

    public function messages()
    {
        return [
            'code.required' => 'Please enter a coupon code.',
            'code.string' => 'Coupon code must be a string.',
        ];
    }
}