<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BrandRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'name' => 'required|string|max:255|unique:brands,name,' . $this->route('brand'),
            'slug' => 'required|string|max:255|unique:brands,slug,' . $this->route('brand'),
            'description' => 'nullable|string',
            'logo' => 'nullable|string|max:255',
            'status' => 'boolean',
        ];
    }
}
