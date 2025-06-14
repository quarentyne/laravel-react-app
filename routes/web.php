<?php

use App\Http\Controllers\CommentController;
use App\Http\Controllers\FeatureController;
use App\Http\Controllers\UpvoteController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::redirect('/', '/dashboard');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::resource('feature', FeatureController::class);
    Route::post('/feature/{feature}/upvote', [UpvoteController::class, 'store'])->name('upvote.store');
    Route::delete('/upvote/{feature}', [UpvoteController::class, 'destroy'])->name('upvote.destroy');

    Route::post('/feature/{feature}/comment', [CommentController::class, 'store'])->name('comment.store');
    Route::delete('/comment/{comment}', [CommentController::class, 'destroy'])->name('comment.destroy');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
