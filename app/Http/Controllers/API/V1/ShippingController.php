<?php

namespace App\Http\Controllers\API\V1;

use App\Models\Shipping;
use App\Http\Requests\ShippingRequest;
use Illuminate\Http\Request;

class ShippingController extends Controller
{
    public function index()
    {
        $shippings = Shipping::with(['order', 'address'])->paginate(20);
        return response()->json($shippings);
    }

    public function store(ShippingRequest $request)
    {
        $shipping = Shipping::create($request->validated());
        return response()->json($shipping, 201);
    }

    public function show(Shipping $shipping)
    {
        return response()->json($shipping);
    }

    public function update(ShippingRequest $request, Shipping $shipping)
    {
        $shipping->update($request->validated());
        return response()->json($shipping);
    }

    public function destroy(Shipping $shipping)
    {
        $shipping->delete();
        return response()->json(null, 204);
    }
}
