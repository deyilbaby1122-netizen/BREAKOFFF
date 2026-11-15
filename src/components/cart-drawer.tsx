"use client";

import { useState } from "react";
import { X, Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "@/components/icons";
import { useCartStore } from "@/lib/stores";
import { productById } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { items, updateQty, removeFromCart, subtotal, totalItems } = useCartStore();
  const [processing, setProcessing] = useState(false);

  const deliveryFee = items.length > 0 ? 50 : 0;
  const total = subtotal + deliveryFee;

  const handleCheckout = () => {
    setProcessing(true);
    setTimeout(() => {
      window.location.href = "/checkout";
    }, 600);
  };

  return (
    <>
      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/30 z-40"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-cream-50 z-50 transition-transform duration-300 ease-out ${
          open ? "translateX(0)" : "translateX-full"
        }`}
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-cream-200">
          <h2 className="text-lg font-bold text-ink-900 flex items-center gap-2">
            <ShoppingBag size={20} />
            Your Cart ({totalItems})
          </h2>
          <button
            className="p-2 rounded-full hover:bg-cream-100 text-ink-600"
            onClick={onClose}
            aria-label="Close cart"
          >
            <X size={20} />
          </button>
        </div>

        {/* Cart items */}
        <div className="overflow-y-auto max-h-[60vh]">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-16 h-16 bg-cream-100 rounded-full flex items-center justify-center mb-4">
                <ShoppingBag size={24} color="#6b6b6b" />
              </div>
              <p className="text-sm text-ink-500 font-medium">Your cart is empty</p>
              <p className="text-xs text-ink-400 mt-1">
                Add some products to get started
              </p>
              <button
                className="mt-4 text-sm font-medium text-black hover:underline"
                onClick={onClose}
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <ul className="divide-y divide-cream-200">
              {items.map((item) => {
                const product = productById(item.id);
                return (
                  <li key={item.id} className="px-4 py-4 flex gap-4">
                    <img
                      src={
                        product?.images[0] ??
                        "/images/products/men/tshirt-classic-1.jpg"
                      }
                      alt={product?.name ?? "Product"}
                      className="w-20 h-20 object-cover rounded-lg bg-cream-100"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-ink-900 truncate">
                        {product?.name ?? "Product"}
                      </p>
                      <p className="text-xs text-ink-500">
                        {item.size} · {item.color}
                      </p>
                      <div className="flex items-center gap-3 mt-1">
                        <button
                          className="w-6 h-6 rounded-full border border-cream-300 flex items-center justify-center text-sm"
                          onClick={() => updateQty(item.id, item.qty - 1)}
                          aria-label="Decrease quantity"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="w-8 text-center text-sm font-medium text-ink-900">
                          {item.qty}
                        </span>
                        <button
                          className="w-6 h-6 rounded-full border border-cream-300 flex items-center justify-center text-sm"
                          onClick={() => updateQty(item.id, item.qty + 1)}
                          aria-label="Increase quantity"
                        >
                          <Plus size={12} />
                        </button>
                        <span className="text-sm font-semibold text-ink-900 ml-auto">
                          ${(product?.price ?? 0) * item.qty}
                        </span>
                      </div>
                    </div>
                    <button
                      className="p-1.5 text-ink-400 hover:text-ink-700 hover:bg-cream-100 rounded-lg"
                      onClick={() => removeFromCart(item.id)}
                      aria-label="Remove item"
                    >
                      <Trash2 size={16} />
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-cream-200 p-4 space-y-3">
            <div className="flex justify-between text-sm text-ink-600">
              <span>Subtotal</span>
              <span>${subtotal}</span>
            </div>
            <div className="flex justify-between text-sm text-ink-600">
              <span>Delivery Fee</span>
              <span>{deliveryFee === 0 ? "Free" : `$${deliveryFee}`}</span>
            </div>
            <div className="flex justify-between text-base font-bold text-ink-900">
              <span>Total</span>
              <span>${total}</span>
            </div>
            <Button
              className="w-full !text-base !px-6 !py-3.5 !rounded-full"
              onClick={handleCheckout}
              disabled={processing}
            >
              {processing ? "Redirecting..." : "Proceed to Checkout"}
              <ArrowRight size={18} strokeWidth={2} />
            </Button>
          </div>
        )}
      </div>
    </>
  );
}

export default CartDrawer;
