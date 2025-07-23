<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Models\Product;
use App\Models\Category;
use App\Models\ProductImage;
use Exception;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::with(['category', 'images'])
            ->when(request('search'), function ($query) {
                $search = request('search');
                $query->where('name', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%")
                    ->orWhere('price', 'like', "%{$search}%");
            })
            ->latest()
            ->paginate(10)
            ->withQueryString();

        $products->getCollection()->transform(function ($product) {
            $primaryImage = $product->images->where('is_primary', true)->first();
            return [
                'id' => $product->id,
                'name' => $product->name,
                'description' => $product->description,
                'price' => $product->price,
                'stock' => $product->quantity,
                'status' => $product->is_visible,
                'category' => $product->category ? [
                    'id' => $product->category->id,
                    'name' => $product->category->name,
                ] : null,
                'primary_image' => $primaryImage ? asset('storage/' . $primaryImage->path) : null,
                'created_at' => $product->created_at->format('Y-m-d'),
            ];
        });

        return Inertia::render('admin/products/index', [
            'products' => $products,
            'filters' => request()->only('search'),
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/products/product-form', [
            'categories' => Category::select('id', 'name')->orderBy('name')->get(),
            'product' => null,
            'isCreate' => true,
        ]);
    }

    public function store(ProductRequest $request)
    {
        try {
            $data = $request->validated();
            $images = $request->file('images') ?? [];

            $product = Product::create($data);

            if (isset($data['categories'])) {
                $product->categories()->sync($data['categories']);
            }

            foreach ($images as $index => $file) {
                $path = $file->store('products', 'public');
                $product->images()->create([
                    'path' => $path,
                    'alt_text' => $file->getClientOriginalName(),
                    'is_primary' => $index === 0,
                    'order' => $index,
                ]);
            }

            return redirect()->route('admin.products.index')
                ->with('success', 'Product created successfully.');
        } catch (Exception $e) {
            Log::error('Product creation failed: ' . $e->getMessage());
            return back()->with('error', 'Failed to create product.')->withInput();
        }
    }

    public function show(Product $product)
    {
        $product->load(['categories', 'images', 'category']);

        return Inertia::render('admin/products/product-form', [
            'product' => [
                'id' => $product->id,
                'name' => $product->name,
                'description' => $product->description,
                'price' => $product->price,
                'compare_price' => $product->compare_price,
                'cost_per_item' => $product->cost_per_item,
                'sku' => $product->sku,
                'barcode' => $product->barcode,
                'quantity' => $product->quantity,
                'security_stock' => $product->security_stock,
                'is_visible' => $product->is_visible,
                'published_at' => $product->published_at,
                'seo_title' => $product->seo_title,
                'seo_description' => $product->seo_description,
                'weight' => $product->weight,
                'height' => $product->height,
                'width' => $product->width,
                'length' => $product->length,
                'categories' => $product->categories->pluck('id'),
                'images' => $product->images->map(function ($img) {
                    return [
                        'id' => $img->id,
                        'url' => asset('storage/' . $img->path),
                        'alt_text' => $img->alt_text,
                        'is_primary' => $img->is_primary,
                        'order' => $img->order,
                    ];
                }),
                'created_at' => $product->created_at->format('Y-m-d'),
            ],
            'categories' => Category::select('id', 'name')->orderBy('name')->get(),
            'isView' => true,
        ]);
    }

    public function edit(Product $product)
    {
        $product->load(['categories', 'images']);

        return Inertia::render('admin/products/product-form', [
            'product' => [
                'id' => $product->id,
                'name' => $product->name,
                'description' => $product->description,
                'price' => $product->price,
                'compare_price' => $product->compare_price,
                'cost_per_item' => $product->cost_per_item,
                'sku' => $product->sku,
                'barcode' => $product->barcode,
                'quantity' => $product->quantity,
                'security_stock' => $product->security_stock,
                'is_visible' => $product->is_visible,
                'published_at' => $product->published_at,
                'seo_title' => $product->seo_title,
                'seo_description' => $product->seo_description,
                'weight' => $product->weight,
                'height' => $product->height,
                'width' => $product->width,
                'length' => $product->length,
                'categories' => $product->categories->pluck('id'),
                'images' => $product->images->map(function ($img) {
                    return [
                        'id' => $img->id,
                        'url' => asset('storage/' . $img->path),
                        'alt_text' => $img->alt_text,
                        'is_primary' => $img->is_primary,
                        'order' => $img->order,
                    ];
                }),
                'created_at' => $product->created_at->format('Y-m-d'),
            ],
            'categories' => Category::select('id', 'name')->orderBy('name')->get(),
            'isEdit' => true,
        ]);
    }

    public function update(UpdateProductRequest $request, Product $product)
    {
        try {
            $data = $request->validated();
            $images = $request->file('images') ?? [];

            $product->update($data);

            if (isset($data['categories'])) {
                $product->categories()->sync($data['categories']);
            }

            if (count($images) > 0) {
                foreach ($product->images as $img) {
                    Storage::disk('public')->delete($img->path);
                    $img->delete();
                }

                foreach ($images as $index => $file) {
                    $path = $file->store('products', 'public');
                    $product->images()->create([
                        'path' => $path,
                        'alt_text' => $file->getClientOriginalName(),
                        'is_primary' => $index === 0,
                        'order' => $index,
                    ]);
                }
            }

            return redirect()->route('admin.products.index')
                ->with('success', 'Product updated successfully.');
        } catch (Exception $e) {
            Log::error('Product update failed: ' . $e->getMessage());
            return back()->with('error', 'Failed to update product.')->withInput();
        }
    }

    public function destroy(Product $product)
    {
        try {
            foreach ($product->images as $img) {
                Storage::disk('public')->delete($img->path);
                $img->delete();
            }

            $product->categories()->detach();
            $product->delete();

            return redirect()->route('admin.products.index')
                ->with('success', 'Product deleted successfully.');
        } catch (Exception $e) {
            Log::error('Product deletion failed: ' . $e->getMessage());
            return back()->with('error', 'Failed to delete product.');
        }
    }


    public function productListPage()
{
    $products = Product::with(['category', 'images'])
        ->when(request('search'), function ($query) {
            $search = request('search');
            $query->where('name', 'like', "%{$search}%")
                ->orWhere('description', 'like', "%{$search}%")
                ->orWhere('price', 'like', "%{$search}%");
        })
        ->latest()
        ->paginate(10)
        ->withQueryString();

    $products->getCollection()->transform(function ($product) {
        $primaryImage = $product->images->where('is_primary', true)->first();
        return [
            'id' => $product->id,
            'name' => $product->name,
            'description' => $product->description,
            'price' => $product->price,
            'stock' => $product->quantity,
            'status' => $product->is_visible,
            'category' => $product->category ? [
                'id' => $product->category->id,
                'name' => $product->category->name,
            ] : null,
            'primary_image' => $primaryImage ? asset('storage/' . $primaryImage->path) : null,
            'created_at' => $product->created_at->format('Y-m-d'),
        ];
    });

    return Inertia::render('admin/products/product-list-table', [
        'products' => $products,
        'filters' => request()->only('search'),
    ]);
}
}
