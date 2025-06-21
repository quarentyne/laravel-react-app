<?php

namespace App\Http\Controllers;

use App\Http\Resources\FeatureListResource;
use App\Http\Resources\FeatureRecourse;
use App\Http\Resources\UserResource;
use App\Models\Feature;
use App\Models\Upvote;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class FeatureController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $userId = auth()->id();

        $features = Feature::latest()
            ->withCount(['upvotes as upvote_count' => function (Builder $query) {
                $query->select(DB::raw('SUM(CASE WHEN upvote = 1 THEN 1 ELSE -1 END)'));
            }])
            ->withExists([
                'upvotes as user_has_upvoted' => function (Builder $query) use ($userId) {
                    $query->where('user_id', $userId)
                        ->where('upvote', 1);
                },
                'upvotes as user_has_downvoted' => function (Builder $query) use ($userId) {
                    $query->where('user_id', $userId)
                        ->where('upvote', 0);
                },
            ])
            ->paginate(10);

        return Inertia::render('feature/index', [
            'features' => Inertia::merge(FeatureListResource::collection($features)->resolve()),
            'page' => $features->currentPage(),
            'lastPage' => $features->lastPage(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render('feature/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
        ]);

        $data['user_id'] = auth()->id();

        Feature::create($data);

        return Redirect::route('feature.index')->with('success', 'Feature created.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Feature $feature): Response
    {
        $feature->upvote_count = Upvote::where('feature_id', $feature->id)
            ->sum(DB::raw('CASE WHEN upvote = 1 THEN 1 ELSE -1 END'));

        $feature->user_has_upvoted = Upvote::where('feature_id', $feature->id)
            ->where('user_id', auth()->id())
            ->where('upvote', 1)
            ->exists();

        $feature->user_has_downvoted = Upvote::where('feature_id', $feature->id)
            ->where('user_id', auth()->id())
            ->where('upvote', 0)
            ->exists();

        return Inertia::render('feature/show', [
            'feature' => new FeatureRecourse($feature),
            'comments' => Inertia::defer(fn() => $feature->comments->map(function ($comment) {
                return [
                    'id'            => $comment->id,
                    'comment'       => $comment->comment,
                    'user'          => new UserResource($comment->user),
                    'created_at'    => $comment->created_at->format('Y-m-d H:i:s'),
                ];
            })),
        ]);
    }
    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Feature $feature): Response
    {
        return Inertia::render('feature/edit', [
            'feature' => new FeatureRecourse($feature),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Feature $feature): RedirectResponse
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
        ]);

        $feature->update($data);

        return Redirect::route('feature.index')->with('success', 'Feature updated.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Feature $feature): RedirectResponse
    {
        $feature->delete();

        return Redirect::route('feature.index')->with('success', 'Feature deleted.');
    }
}
