<?php

namespace App\Http\Controllers\API\V1;

use App\Models\Address;
use App\Http\Requests\AddressRequest;
use Illuminate\Http\Request;

class AddressController extends Controller
{
    public function index()
    {
        $addresses = Address::with('user')->paginate(20);
        return response()->json($addresses);
    }

    public function store(AddressRequest $request)
    {
        $address = Address::create($request->validated());
        return response()->json($address, 201);
    }

    public function show(Address $address)
    {
        return response()->json($address);
    }

    public function update(AddressRequest $request, Address $address)
    {
        $address->update($request->validated());
        return response()->json($address);
    }

    public function destroy(Address $address)
    {
        $address->delete();
        return response()->json(null, 204);
    }
}
