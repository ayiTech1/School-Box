<?php

namespace App\Http\Controllers\API\V1;

use App\Models\Brand;
use App\Http\Requests\BrandRequest;
use Illuminate\Http\Request;

class BrandController extends Controller
{
    public function index()
    {
        $brands = Brand::paginate(20);
        return response()->json($brands);
    }

    public function store(BrandRequest $request)
    {
        $brand = Brand::create($request->validated());
        return response()->json($brand, 201);
    }

    public function show(Brand $brand)
    {
        return response()->json($brand);
    }

    public function update(BrandRequest $request, Brand $brand)
    {
        $brand->update($request->validated());
        return response()->json($brand);
    }

    public function destroy(Brand $brand)
    {
        $brand->delete();
        return response()->json(null, 204);
    }
}
