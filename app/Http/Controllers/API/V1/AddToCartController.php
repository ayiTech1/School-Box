<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Requests\AddToCartRequest;
use App\Models\Cart;
use App\Models\Product;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class CartController extends Controller
{
    /**
     * Display the user's cart.
     */
    public function index(): Response
    {
        $cart = $this->getOrCreateCart();
        
        return Inertia::render('Cart/Index', [
            'cart' => $cart->load([
                'items.product' => function ($query) {
                    $query->select('id', 'name', 'price', 'slug', 'image_url');
                }
            ]),
            'cartCount' => $cart->items()->sum('quantity'),
            'subtotal' => $cart->calculateSubtotal(),
        ]);
    }

    /**
     * Add an item to the cart.
     */
    public function store(AddToCartRequest $request): RedirectResponse
    {
        $cart = $this->getOrCreateCart();
        $product = Product::findOrFail($request->product_id);

        $cart->addItem(
            $product,
            $request->quantity,
            $request->options ?? []
        );

        return redirect()->back()->with('success', 'Item added to cart successfully');
    }

    /**
     * Update a cart item's quantity.
     */
    public function update(AddToCartRequest $request, string $itemId): RedirectResponse
    {
        $cart = $this->getOrCreateCart();
        
        $cart->updateItem(
            $itemId,
            $request->quantity,
            $request->options ?? []
        );

        return redirect()->back()->with('success', 'Cart updated successfully');
    }

    /**
     * Remove an item from the cart.
     */
    public function destroy(string $itemId): RedirectResponse
    {
        $cart = $this->getOrCreateCart();
        $cart->removeItem($itemId);

        return redirect()->back()->with('success', 'Item removed from cart');
    }

    /**
     * Clear all items from the cart.
     */
    public function clear(): RedirectResponse
    {
        $cart = $this->getOrCreateCart();
        $cart->clear();

        return redirect()->back()->with('success', 'Cart cleared successfully');
    }

    /**
     * Get mini-cart data for AJAX requests.
     */
    public function miniCart(): Response
    {
        $cart = $this->getOrCreateCart();

        return Inertia::render('Cart/MiniCart', [
            'cartCount' => $cart->items()->sum('quantity'),
            'items' => $cart->items()->with('product:id,name,price,slug')->limit(3)->get(),
            'subtotal' => $cart->calculateSubtotal(),
        ]);
    }

    /**
     * Helper method to get or create the user's cart.
     */
    protected function getOrCreateCart(): Cart
    {
        if (Auth::check()) {
            return Auth::user()->cart()->firstOrCreate();
        }

        // For guest users, you might use session-based cart
        // This is a simplified example - you'd need to implement session cart logic
        return app(SessionCartService::class)->getCart();
    }
}