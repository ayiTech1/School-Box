<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Category extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'description',
        'image',
        'parent_id',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    /**
     * Get the products for this category.
     */
   public function products(): BelongsToMany
    {
        return $this->belongsToMany(Product::class, 'product_category');
    }

     public function parent()
    {
        return $this->belongsTo(Category::class, 'parent_id');
    }

     public function children()
    {
        return $this->hasMany(Category::class, 'parent_id');
    }
}
