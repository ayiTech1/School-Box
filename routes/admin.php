<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\API\V1\ProductController as AdminProductController;
use App\Http\Controllers\API\V1\CategoryController as AdminCategoryController;
use App\Http\Controllers\API\V1\CustomerController as AdminCustomerController;
use App\Http\Controllers\API\V1\OrderController as AdminOrderController;

Route::prefix('admin')
    ->as('admin.')
    ->group(function () {
        // ✅ Dedicated admin login page with isAdmin = true
        Route::get('/', function () {
            return Inertia::render('auth/login', [
                'canResetPassword' => false,
                'isAdmin' => true,
            ]);
        })->name('login');

        Route::middleware(['auth', 'verified', 'admin'])->group(function () {

            Route::get('/dashboard', function () {
                return Inertia::render('admin/dashboard');
            })->name('dashboard');

            Route::resource('products', AdminProductController::class);
            Route::resource('category', AdminCategoryController::class);
            Route::resource('customers', AdminCustomerController::class);
            Route::resource('orders', AdminOrderController::class);

            Route::get('/media', function () {
                return Inertia::render('admin/media/index');
            })->name('media.index');

            // ✅ Laravel File Manager mounted under /admin/laravel-filemanager
            Route::group(['prefix' => 'laravel-filemanager'], function () {
                \UniSharp\LaravelFilemanager\Lfm::routes();
            });
        });
    });
