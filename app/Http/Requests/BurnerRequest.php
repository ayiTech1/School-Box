<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BurnerRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'name' => 'required|string|max:255|unique:burners,name,' . $this->route('burner'),
            'slug' => 'required|string|max:255|unique:burners,slug,' . $this->route('burner'),
            'description' => 'nullable|string',
            'image' => 'nullable|string|max:255',
            'status' => 'boolean',
        ];
    }
}
