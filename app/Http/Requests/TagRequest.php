<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TagRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'name' => 'required|string|max:255|unique:tags,name,' . $this->route('tag'),
            'slug' => 'required|string|max:255|unique:tags,slug,' . $this->route('tag'),
            'description' => 'nullable|string',
        ];
    }
}
