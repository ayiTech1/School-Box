<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SyncProductCategoriesRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'categories' => 'required|array',
            'categories.*' => 'exists:categories,id',
        ];
    }

    public function messages()
    {
        return [
            'categories.required' => 'At least one category is required.',
            'categories.array' => 'Categories must be an array.',
            'categories.*.exists' => 'One or more selected categories are invalid.',
        ];
    }
}