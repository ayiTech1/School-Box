<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\API\V1\ProductController as CustomerProductController;

// --------------------------------------
// Public homepage
// --------------------------------------
Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

// --------------------------------------
// Customer login page
// --------------------------------------
Route::get('/login', function () {
    return Inertia::render('Auth/Login', [
        'canResetPassword' => true,
        'isAdmin' => false, 
    ]);
})->middleware('guest')->name('login');

// --------------------------------------
// Customer shop routes
// --------------------------------------
Route::middleware(['auth', 'verified', 'customer'])
    ->prefix('shop')
    ->as('shop.')
    ->group(function () {
        Route::get('/', [CustomerProductController::class, 'index'])->name('index');
        Route::get('/{product}', [CustomerProductController::class, 'show'])->name('show');
    });

// --------------------------------------
// Other shared routes
// --------------------------------------
require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';

// ✅ Include admin routes
require __DIR__ . '/admin.php';
