<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateProductRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'name' => 'required|string|max:255',
            'slug' => [
                'required',
                'string',
                'max:255',
                Rule::unique('products')->ignore($this->product)
            ],
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'compare_price' => 'nullable|numeric|min:0',
            'cost_per_item' => 'nullable|numeric|min:0',
            'sku' => [
                'nullable',
                'string',
                'max:255',
                Rule::unique('products')->ignore($this->product)
            ],
            'barcode' => 'nullable|string|max:255',
            'quantity' => 'required|integer|min:0',
            'security_stock' => 'required|integer|min:0',
            'is_visible' => 'boolean',
            'published_at' => 'nullable|date',
            'seo_title' => 'nullable|string|max:255',
            'seo_description' => 'nullable|string|max:500',
            'weight' => 'nullable|numeric|min:0',
            'height' => 'nullable|numeric|min:0',
            'width' => 'nullable|numeric|min:0',
            'length' => 'nullable|numeric|min:0',
            'categories' => 'nullable|array',
            'categories.*' => 'exists:categories,id',
            'images' => 'nullable|array',
            'images.*' => 'image|max:2048',
        ];
    }

    public function messages()
    {
        return [
            'name.required' => 'The product name is required.',
            'name.string' => 'The product name must be a string.',
            'name.max' => 'The product name may not be greater than 255 characters.',
            'slug.required' => 'The slug is required.',
            'slug.string' => 'The slug must be a string.',
            'slug.max' => 'The slug may not be greater than 255 characters.',
            'slug.unique' => 'This slug is already in use.',
            'description.string' => 'The description must be a string.',
            'price.required' => 'The price is required.',
            'price.numeric' => 'The price must be a number.',
            'price.min' => 'The price must be at least 0.',
            'compare_price.numeric' => 'The compare price must be a number.',
            'compare_price.min' => 'The compare price must be at least 0.',
            'cost_per_item.numeric' => 'The cost per item must be a number.',
            'cost_per_item.min' => 'The cost per item must be at least 0.',
            'sku.string' => 'The SKU must be a string.',
            'sku.max' => 'The SKU may not be greater than 255 characters.',
            'sku.unique' => 'This SKU is already in use.',
            'barcode.string' => 'The barcode must be a string.',
            'barcode.max' => 'The barcode may not be greater than 255 characters.',
            'quantity.required' => 'The quantity is required.',
            'quantity.integer' => 'The quantity must be an integer.',
            'quantity.min' => 'The quantity must be at least 0.',
            'security_stock.required' => 'The security stock is required.',
            'security_stock.integer' => 'The security stock must be an integer.',
            'security_stock.min' => 'The security stock must be at least 0.',
            'is_visible.boolean' => 'The visibility must be true or false.',
            'published_at.date' => 'The published date must be a valid date.',
            'seo_title.string' => 'The SEO title must be a string.',
            'seo_title.max' => 'The SEO title may not be greater than 255 characters.',
            'seo_description.string' => 'The SEO description must be a string.',
            'seo_description.max' => 'The SEO description may not be greater than 500 characters.',
            'weight.numeric' => 'The weight must be a number.',
            'weight.min' => 'The weight must be at least 0.',
            'height.numeric' => 'The height must be a number.',
            'height.min' => 'The height must be at least 0.',
            'width.numeric' => 'The width must be a number.',
            'width.min' => 'The width must be at least 0.',
            'length.numeric' => 'The length must be a number.',
            'length.min' => 'The length must be at least 0.',
            'categories.array' => 'The categories must be an array.',
            'categories.*.exists' => 'One or more selected categories are invalid.',
            'images.array' => 'The images must be an array.',
            'images.*.image' => 'Each image must be a valid image file.',
            'images.*.max' => 'Each image may not be greater than 2MB.',
        ];
    }
}