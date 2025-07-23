<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\CategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use App\Models\Category;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class CategoryController extends Controller
{
    public function index(Request $request)
    {
        $categories = Category::query();

        if ($request->filled('search')) {
            $categories->where(function ($query) use ($request) {
                $query->where('name', 'like', '%' . $request->search . '%')
                      ->orWhere('description', 'like', '%' . $request->search . '%');
            });
        }

        $categories = $categories->latest()->paginate(15)->withQueryString();

        $categories->getCollection()->transform(fn ($category) => [
            'id' => $category->id,
            'name' => $category->name,
            'slug' => $category->slug,
            'description' => $category->description,
            'parent_id' => $category->parent_id,
            'is_active' => $category->is_active,
            'image_url' => $category->image ? asset('storage/' . $category->image) : null,
            'created_at' => $category->created_at->toDateTimeString(),
        ]);

        return Inertia::render('admin/category/index', [
            'categories' => $categories,
            'filters' => $request->only(['search']),
        ]);
    }

    public function create()
    {
    $parentCategories = Category::whereNull('parent_id')
    ->select('id', 'name')
    ->orderBy('name')
    ->get();
    
    return Inertia::render('admin/category/category-form', [
        'category' => null,
        'parentCategories' => $parentCategories,
        'isCreate' => true,
    ]);
    }

    public function edit(Category $category)
    {
        $parentCategories = Category::where('id', '!=', $category->id)
            ->whereNull('parent_id')
            ->select('id', 'name')
            ->orderBy('name')
            ->get();

        return Inertia::render('admin/category/category-form', [
            'category' => $this->transform($category),
            'parentCategories' => $parentCategories,
            'isEdit' => true,
        ]);
    }

    public function store(CategoryRequest $request)
    {
        try {
            $data = $request->validated();
            $data['slug'] = Str::slug($data['name']);

            if ($request->hasFile('image')) {
                $data['image'] = $request->file('image')->store('category', 'public');
            }

            Category::create($data);

            return redirect()->route('admin.category.index')->with('success', 'Category created successfully.');
        } catch (Exception $e) {
            Log::error('Category creation failed', ['error' => $e->getMessage()]);
            return back()->with('error', 'Failed to create category.')->withInput();
        }
    }

    // Duplicate edit method removed. Only the correct edit method with parentCategories remains.

    public function update(UpdateCategoryRequest $request, Category $category)
    {
        try {
            $data = $request->validated();
            $data['slug'] = Str::slug($data['name']);

            // Unique slug check excluding current category
            if (Category::where('slug', $data['slug'])->where('id', '!=', $category->id)->exists()) {
                return back()->with('error', 'Slug must be unique.')->withInput();
            }

            if ($request->hasFile('image')) {
                if ($category->image) {
                    Storage::disk('public')->delete($category->image);
                }
                $data['image'] = $request->file('image')->store('category', 'public');
            }

            $category->update($data);

            return redirect()->route('admin.category.index')->with('success', 'Category updated successfully.');
        } catch (Exception $e) {
            Log::error('Category update failed', ['error' => $e->getMessage()]);
            return back()->with('error', 'Failed to update category.')->withInput();
        }
    }

    public function destroy(Category $category)
    {
        try {
            if ($category->image) {
                Storage::disk('public')->delete($category->image);
            }

            $category->delete();

            return redirect()->route('admin.category.index')->with('success', 'Category deleted successfully.');
        } catch (Exception $e) {
            Log::error('Category deletion failed', ['error' => $e->getMessage()]);
            return back()->with('error', 'Failed to delete category.');
        }
    }

    protected function transform(Category $category)
    {
        return [
            'id' => $category->id,
            'name' => $category->name,
            'slug' => $category->slug,
            'description' => $category->description,
            'parent_id' => $category->parent_id,
            'is_active' => $category->is_active,
            'image' => $category->image,
            'image_url' => $category->image ? asset('storage/' . $category->image) : null,
            'created_at' => $category->created_at->toDateTimeString(),
        ];
    }
}
