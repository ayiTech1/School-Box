<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateReviewRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'rating' => 'sometimes|integer|between:1,5',
            'title' => 'sometimes|string|max:255',
            'comment' => 'sometimes|string',
            'is_approved' => 'sometimes|boolean',
        ];
    }

    public function messages()
    {
        return [
            'rating.integer' => 'The rating must be an integer.',
            'rating.between' => 'The rating must be between 1 and 5.',
            'title.string' => 'The title must be a string.',
            'title.max' => 'The title may not be greater than 255 characters.',
            'comment.string' => 'The comment must be a string.',
            'is_approved.boolean' => 'The approved status must be true or false.',
        ];
    }
}