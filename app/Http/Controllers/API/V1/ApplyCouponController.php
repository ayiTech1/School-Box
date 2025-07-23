<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Requests\ApplyCouponRequest;
use App\Models\Coupon;
use App\Services\CouponService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class CouponController extends Controller
{
    public function __construct(
        protected CouponService $couponService
    ) {}

    /**
     * Apply coupon to the user's cart.
     */
    public function apply(ApplyCouponRequest $request): RedirectResponse
    {
        $coupon = Coupon::where('code', $request->code)
            ->valid()
            ->first();

        if (!$coupon) {
            return redirect()->back()
                ->with('error', 'Invalid or expired coupon code');
        }

        $cart = Auth::user()->cart;

        // Use service to handle coupon application logic
        $result = $this->couponService->applyToCart($coupon, $cart);

        if (!$result['success']) {
            return redirect()->back()
                ->with('error', $result['message']);
        }

        return redirect()->back()
            ->with('success', 'Coupon applied successfully')
            ->with('discount', $result['discount']);
    }

    /**
     * Remove applied coupon from the user's cart.
     */
    public function remove(): RedirectResponse
    {
        $cart = Auth::user()->cart;

        $this->couponService->removeFromCart($cart);

        return redirect()->back()
            ->with('success', 'Coupon removed successfully');
    }

    /**
     * Show available coupons (optional)
     */
    public function index(): Response
    {
        $coupons = Coupon::valid()
            ->orderBy('discount_value', 'desc')
            ->get(['code', 'description', 'discount_value', 'discount_type']);

        return Inertia::render('coupon/index', [
            'coupons' => $coupons,
            'appliedCoupon' => Auth::user()->cart->coupon ?? null,
        ]);
    }
}