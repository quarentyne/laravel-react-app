<?php

use App\Enum\PermissionsEnum;
use App\Enum\RolesEnum;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\FeatureController;
use App\Http\Controllers\UpvoteController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::redirect('/', '/dashboard');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::resource('feature', FeatureController::class)
        ->except(['show', 'index'])
        ->middleware('can:' . PermissionsEnum::ManageFeatures->value);

    Route::get('/feature', [FeatureController::class, 'index'])->name('feature.index');
    Route::get('/feature/{feature}', [FeatureController::class, 'show'])->name('feature.show');

    Route::post('/feature/{feature}/upvote', [UpvoteController::class, 'store'])->name('upvote.store');
    Route::delete('/upvote/{feature}', [UpvoteController::class, 'destroy'])->name('upvote.destroy');

    Route::middleware(['can:' . PermissionsEnum::ManageComments->value])->group(function () {
        Route::post('/feature/{feature}/comment', [CommentController::class, 'store'])->name('comment.store');
        Route::delete('/comment/{comment}', [CommentController::class, 'destroy'])
            ->middleware('can:delete-comment,comment')
            ->name('comment.destroy');
    });

    Route::middleware(['role:' . RolesEnum::Admin->value])->group(function () {
        Route::get('/user', [UserController::class, 'index'])->name('user.index');
        Route::get('/user/{user}/edit', [UserController::class, 'edit'])->name('user.edit');
        Route::put('/user/{user}', [UserController::class, 'update'])->name('user.update');
        Route::delete('/user/{user}', [UserController::class, 'destroy'])->name('user.destroy');
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
