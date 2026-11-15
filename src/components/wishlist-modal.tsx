"use client";

import { useState } from "react";
import { X, ShoppingBag, Heart } from "@/components/icons";
import { useWishlistStore } from "@/lib/stores";
import { productById } from "@/lib/supabase";
import { Button } from "@/components/ui/button";

interface WishlistModalProps {
  open: boolean;
  onClose: () => void;
}

export function WishlistModal({ open, onClose }: WishlistModalProps) {
  const { items: wishlist, moveToCart, isOpen, toggle } = useWishlistStore();
  const [moved, setMoved] = useState<string | null>(null);

  const handleMoveToCart = (id: string) => {
    if (isOpen) {
      // If wishlist modal is open, just close it
      onClose();
    } else {
      moveToCart(id, "S", "White");
      setMoved(id);
      setTimeout(() => setMoved(null), 1500);
    }
  };

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/30 z-40"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-full max-w-lg bg-white z-50 overflow-y-auto transition-transform duration-300 ease-out ${
          open ? "translateX(0)" : "translateX(full)"
        }`}
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-cream-200">
          <h2 className="text-lg font-bold text-ink-900 flex items-center gap-2">
            <Heart size={20} />
            Wishlist
          </h2>
          <button
            className="p-2 rounded-full hover:bg-cream-100 text-ink-600"
            onClick={onClose}
            aria-label="Close wishlist"
          >
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        {wishlist.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-16 h-16 bg-cream-100 rounded-full flex items-center justify-center mb-4">
              <Heart size={24} color="#6b6b6b" />
            </div>
            <p className="text-sm text-ink-500 font-medium">No wishlisted items</p>
            <p className="text-xs text-ink-400 mt-1">
              Tap the heart on any product to save it here
            </p>
          </div>
        ) : (
          <ul className="divide-y divide-cream-200">
            {wishlist.map((id) => {
              const product = productById(id);
              if (!product) return null;
              return (
                <li key={id} className="px-4 py-4 flex gap-4">
                  <div className="relative">
                    <img
                      src={product.images[0] ?? "/images/products/men/tshirt-classic-1.jpg"}
                      alt={product.name}
                      className="w-20 h-20 object-cover rounded-lg bg-cream-100"
                    />
                    <button
                      className="absolute -bottom-1 -right-1 bg-black text-white w-5 h-5 rounded-full flex items-center justify-center"
                      onClick={() => toggle(id)}
                      aria-label="Remove from wishlist"
                    >
                      <Heart size={12} fill="white" />
                    </button>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-ink-900 truncate">
                      {product.name}
                    </p>
                    <p className="text-xs text-ink-500">{product.category}</p>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-base font-semibold text-ink-900">
                        ${product.price}
                      </span>
                      <button
                        className="text-xs font-medium text-black bg-black hover:bg-neutral-800 text-center px-3 py-1.5 rounded-full transition-colors"
                        onClick={() => handleMoveToCart(id)}
                      >
                        Move to Cart
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}

        {/* Footer */}
        <div className="border-t border-cream-200 p-4">
          <div className="flex items-center gap-2 text-sm text-ink-500">
            <Heart size={16} />
            <span className="font-medium text-ink-900">
              {wishlist.length} saved
            </span>
            {moved && <span className="text-ink-700">(Moved to cart)</span>}
          </div>
        </div>
      </div>
    </>
  );
}

export default WishlistModal;
