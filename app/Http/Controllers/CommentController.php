<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Feature;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    public function store(Request $request, Feature $feature): RedirectResponse
    {
        $data = $request->validate([
            'comment' => 'required',
        ]);

        $data['feature_id'] = $feature->id;
        $data['user_id'] = auth()->id();

        Comment::create($data);

        return redirect()->back();
    }

    public function destroy(Comment $comment): RedirectResponse
    {
        $comment->delete();

        return redirect()->back();
    }
}
