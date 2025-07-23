<?php

namespace App\Http\Controllers\API\V1;

use App\Models\Tag;
use App\Http\Requests\TagRequest;
use Illuminate\Http\Request;

class TagController extends Controller
{
    public function index()
    {
        $tags = Tag::paginate(20);
        return response()->json($tags);
    }

    public function store(TagRequest $request)
    {
        $tag = Tag::create($request->validated());
        return response()->json($tag, 201);
    }

    public function show(Tag $tag)
    {
        return response()->json($tag);
    }

    public function update(TagRequest $request, Tag $tag)
    {
        $tag->update($request->validated());
        return response()->json($tag);
    }

    public function destroy(Tag $tag)
    {
        $tag->delete();
        return response()->json(null, 204);
    }
}
