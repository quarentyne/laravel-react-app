<?php

namespace App\Http\Controllers;

use App\Models\Upvote;
use Illuminate\Http\Request;

class UpvoteController extends Controller
{
    public function __invoke(Request $request) {
        $data = $request->validate([
            'feature_id' => 'required|integer|exists:feature,id',
            'upvote' => 'required|boolean',
        ]);

        Upvote::updateOrCreate(
            ['feature_id' => $data['feature_id'], 'user_id' => auth()->id()],
            ['upvote' => $data['upvote']]
        );

        return response(null, 204);
    }
}
