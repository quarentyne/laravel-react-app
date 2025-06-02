<?php

use App\Http\Controllers\FeatureController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::redirect('/', '/dashboard');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::get('/feature', [FeatureController::class, 'index'])->name('feature.index');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
