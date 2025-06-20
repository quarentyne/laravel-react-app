<?php

namespace App\Http\Controllers;

use App\Http\Resources\AuthUserResource;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $users = User::latest()->paginate(15);

        return Inertia::render('user/index', [
            'users' => AuthUserResource::collection($users),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user): Response
    {
        return Inertia::render('user/edit', ['user' => new AuthUserResource($user)]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255',
            'roles' => 'required|array',
        ]);

        $data = $request->only(['name', 'email']);

        $user->update($data);
        $user->syncRoles($request->input('roles'));

        return Redirect::route('user.index')->with('success', 'User updated');
    }

    public function destroy(User $user): RedirectResponse
    {
        $user->delete();

        return Redirect::route('user.index')->with('success', 'User deleted');
    }
}
