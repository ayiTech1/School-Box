<?php

namespace App\Providers;

use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;
use App\Http\Middleware\IsAdmin;
use App\Http\Middleware\IsCustomer;

class RouteServiceProvider extends ServiceProvider
{
    public function boot(): void
    {
        // ✅ Register custom named middleware
        Route::aliasMiddleware('admin', IsAdmin::class);
        Route::aliasMiddleware('customer', IsCustomer::class);

        $this->routes(function () {
            Route::middleware('web')
                ->group(base_path('routes/web.php'));

            // If you have an API:
            // Route::prefix('api')->middleware('api')->group(base_path('routes/api.php'));
        });
    }
}
