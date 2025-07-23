<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\UserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Models\User;
use Exception;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class CustomerController extends Controller
{
    public function index()
    {
        $customers = User::where('role', 'customer')
            ->when(request('search'), function ($query) {
                $query->where('name', 'like', '%' . request('search') . '%')
                    ->orWhere('email', 'like', '%' . request('search') . '%');
            })
            ->latest()
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('admin/customers/index', [
            'customers' => $customers,
            'filters' => request()->only('search'),
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/customers/form', [
            'customer' => null,
            'isCreate' => true,
        ]);
    }

    public function store(UserRequest $request)
    {
        try {
            $data = $request->validated();
            $data['role'] = 'customer';
            $data['password'] = Hash::make($data['password']);

            if ($request->hasFile('avatar')) {
                $data['avatar'] = $request->file('avatar')->store('avatars', 'public');
            }

            User::create($data);

            return redirect()->route('admin.customers.index')
                ->with('success', 'Customer created successfully.');
        } catch (Exception $e) {
            Log::error('Customer creation failed', ['error' => $e->getMessage()]);
            return back()->with('error', 'Failed to create customer.')->withInput();
        }
    }

    public function edit(User $customer)
    {
        if ($customer->role !== 'customer') {
            abort(404);
        }

        return Inertia::render('admin/customers/form', [
            'customer' => [
                'id' => $customer->id,
                'name' => $customer->name,
                'email' => $customer->email,
                'role' => $customer->role,
                'avatar' => $customer->avatar,
                'avatar_url' => $customer->avatar ? asset('storage/' . $customer->avatar) : null,
                'created_at' => $customer->created_at->toDateTimeString(),
            ],
            'isEdit' => true,
        ]);
    }

    public function update(UpdateUserRequest $request, User $customer)
    {
        if ($customer->role !== 'customer') {
            abort(404);
        }

        try {
            $data = $request->validated();
            $customer->name = $data['name'];
            $customer->email = $data['email'];

            if (!empty($data['password'])) {
                $customer->password = Hash::make($data['password']);
            }

            if ($request->hasFile('avatar')) {
                if ($customer->avatar) {
                    Storage::disk('public')->delete($customer->avatar);
                }
                $customer->avatar = $request->file('avatar')->store('avatars', 'public');
            }

            $customer->save();

            return redirect()->route('admin.customers.index')
                ->with('success', 'Customer updated successfully.');
        } catch (Exception $e) {
            Log::error('Customer update failed', ['error' => $e->getMessage()]);
            return back()->with('error', 'Failed to update customer.')->withInput();
        }
    }

    public function destroy(User $customer)
    {
        if ($customer->role !== 'customer') {
            abort(404);
        }

        try {
            if ($customer->avatar) {
                Storage::disk('public')->delete($customer->avatar);
            }

            $customer->delete();

            return redirect()->route('admin.customers.index')
                ->with('success', 'Customer deleted successfully.');
        } catch (Exception $e) {
            Log::error('Customer deletion failed', ['error' => $e->getMessage()]);
            return back()->with('error', 'Failed to delete customer.');
        }
    }
}
