<?php

namespace App\Http\Controllers\API\V1;

use App\Models\Burner;
use App\Http\Requests\BurnerRequest;
use Illuminate\Http\Request;

class BurnerController extends Controller
{
    public function index()
    {
        $burners = Burner::paginate(20);
        return response()->json($burners);
    }

    public function store(BurnerRequest $request)
    {
        $burner = Burner::create($request->validated());
        return response()->json($burner, 201);
    }

    public function show(Burner $burner)
    {
        return response()->json($burner);
    }

    public function update(BurnerRequest $request, Burner $burner)
    {
        $burner->update($request->validated());
        return response()->json($burner);
    }

    public function destroy(Burner $burner)
    {
        $burner->delete();
        return response()->json(null, 204);
    }
}
