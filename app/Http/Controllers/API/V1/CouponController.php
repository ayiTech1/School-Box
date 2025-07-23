<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\CouponRequest;
use App\Http\Requests\UpdateCouponRequest;
use App\Models\Coupon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class CouponController extends Controller
{
    public function index(Request $request)
    {
        $coupons = Coupon::query()
            ->when($request->search, function ($query, $search) {
                $query->where('code', 'like', "%{$search}%")
                      ->orWhere('description', 'like', "%{$search}%");
            })
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('admin/coupons/index', [
            'coupons' => $coupons,
            'filters' => $request->only(['search']),
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/coupons/form', [
            'coupon' => null,
            'isCreate' => true,
        ]);
    }

    public function store(CouponRequest $request)
    {
        try {
            $data = $request->validated();

            Coupon::create($data);

            return redirect()->route('admin.coupons.index')
                ->with('success', 'Coupon created successfully.');
        } catch (\Exception $e) {
            Log::error('Coupon creation failed: ' . $e->getMessage());
            return back()->with('error', 'Failed to create coupon.')->withInput();
        }
    }

    public function show(Coupon $coupon)
    {
        return Inertia::render('admin/coupons/form', [
            'coupon' => $coupon,
            'isView' => true,
        ]);
    }

    public function edit(Coupon $coupon)
    {
        return Inertia::render('admin/coupons/form', [
            'coupon' => $coupon,
            'isEdit' => true,
        ]);
    }

    public function update(UpdateCouponRequest $request, Coupon $coupon)
    {
        try {
            $data = $request->validated();

            $coupon->update($data);

            return redirect()->route('admin.coupons.index')
                ->with('success', 'Coupon updated successfully.');
        } catch (\Exception $e) {
            Log::error('Coupon update failed: ' . $e->getMessage());
            return back()->with('error', 'Failed to update coupon.')->withInput();
        }
    }

    public function destroy(Coupon $coupon)
    {
        try {
            $coupon->delete();

            return redirect()->route('admin.coupons.index')
                ->with('success', 'Coupon deleted successfully.');
        } catch (\Exception $e) {
            Log::error('Coupon deletion failed: ' . $e->getMessage());
            return back()->with('error', 'Failed to delete coupon.');
        }
    }
}
