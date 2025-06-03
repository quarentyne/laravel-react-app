<?php

namespace App\Http\Controllers;

use App\Http\Resources\FeatureRecourse;
use App\Models\Feature;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
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
        $features = Feature::latest()->paginate(10);

        return Inertia::render('feature/index', [
            'features' => FeatureRecourse::collection($features),
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
        return Inertia::render('feature/show', [
            'feature' => new FeatureRecourse($feature),
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
