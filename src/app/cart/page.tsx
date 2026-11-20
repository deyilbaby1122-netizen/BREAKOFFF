/**
 * cart/page.tsx
 * BREAKOFF — Shopping Cart page.
 * - Real working cart with persistence
 * - Add/remove items, quantity controls
 * - Delivery + total calculation
 */
"use client";

import Link from "next/link";
import { ShoppingBag, ArrowRight } from "@/components/icons";
import { useCartStore } from "@/lib/stores";
import { productById } from "@/lib/supabase";
import { Button } from "@/components/ui/button";

export default function CartPage() {
  const { items, updateQty, removeFromCart, subtotal, totalItems } = useCartStore();

  // Recompute local delivery fee
  const deliveryFee = items.length > 0 ? 50 : 0;
  const total = subtotal + deliveryFee;

  return (
    <>
      {/* Page hero */}
      <section className="py-14 bg-cream-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-black mb-3">
              BREAKOFF
            </p>
            <h1 className="text-4xl font-bold text-ink-900 tracking-tight">
              Shopping Cart
            </h1>
            <p className="text-ink-500 mt-3 text-base leading-relaxed">
              {totalItems} {totalItems === 1 ? "item" : "items"} in your cart.
              Review and proceed to checkout.
            </p>
          </div>
        </div>
      </section>

      {/* Cart content */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {items.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-cream-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShoppingBag size={32} color="#6b6b6b" />
              </div>
              <h2 className="text-2xl font-bold text-ink-900 mb-2">Your cart is empty</h2>
              <p className="text-ink-500 mb-6">Looks like you haven&apos;t added anything yet.</p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-base font-medium text-black hover:underline"
              >
                Continue Shopping
                <ArrowRight size={18} strokeWidth={2} />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart items */}
              <div className="lg:col-span-2 space-y-4">
                {items.map((item) => {
                  const product = productById(item.id);
                  return (
                    <div
                      key={item.id}
                      className="flex gap-4 p-4 rounded-2xl bg-cream-50 border border-cream-200"
                    >
                      <img
                        src={product?.images[0] ?? "/images/products/men/tshirt-classic-1.jpg"}
                        alt={product?.name ?? "Product"}
                        className="w-24 h-24 object-cover rounded-xl"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start gap-3">
                          <h3 className="text-sm font-semibold text-ink-900 truncate">
                            {product?.name ?? "Product"}
                          </h3>
                          <button
                            className="p-1.5 rounded-full hover:bg-cream-100 text-ink-400 hover:text-ink-700"
                            onClick={() => removeFromCart(item.id)}
                            aria-label="Remove item"
                          >
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M4 7 L10 13 L14 9" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </button>
                        </div>
                        <p className="text-xs text-ink-500 mt-1">
                          {item.size} · {item.color}
                        </p>
                        <div className="flex items-center gap-3 mt-2">
                          <button
                            className="w-7 h-7 rounded-full border border-cream-300 flex items-center justify-center text-sm"
                            onClick={() => updateQty(item.id, item.qty - 1)}
                            aria-label="Decrease quantity"
                          >
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M6 4 L6 8 M3 6 L6 9 L9 6" strokeLinecap="round"/>
                            </svg>
                          </button>
                          <span className="w-8 text-center text-sm font-medium text-ink-900">
                            {item.qty}
                          </span>
                          <button
                            className="w-7 h-7 rounded-full border border-cream-300 flex items-center justify-center text-sm"
                            onClick={() => updateQty(item.id, item.qty + 1)}
                            aria-label="Increase quantity"
                          >
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M6 4 L6 8 M3 6 L6 9 L9 6" strokeLinecap="round"/>
                            </svg>
                          </button>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-base font-bold text-ink-900">
                          ${(product?.price ?? 0) * item.qty}
                        </p>
                        <p className="text-xs text-ink-500">Subtotal</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Order summary */}
              <div>
                <div className="sticky top-24">
                  <h3 className="text-lg font-bold text-ink-900 mb-4">Order Summary</h3>
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between text-sm text-ink-600">
                      <span>Items ({totalItems})</span>
                      <span>${subtotal}</span>
                    </div>
                    <div className="flex justify-between text-sm text-ink-600">
                      <span>Delivery Fee</span>
                      <span>{deliveryFee === 0 ? "Free" : `$${deliveryFee}`}</span>
                    </div>
                    <div className="border-t border-cream-200 pt-3 flex justify-between text-base font-bold text-ink-900">
                      <span>Total</span>
                      <span>${total}</span>
                    </div>
                  </div>
                  <Button
                    className="w-full !text-base !px-6 !py-3.5 !rounded-full"
                    size="lg"
                  >
                    Proceed to Checkout
                    <ArrowRight size={18} strokeWidth={2} />
                  </Button>
                  <p className="text-xs text-ink-500 mt-3 text-center">
                    Shipping calculated at checkout based on location.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
