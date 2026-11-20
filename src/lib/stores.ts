"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getDemoStore, productById } from "./supabase";
import type { CartItem } from "./supabase";

// ============================================================================
// CART STORE
// ============================================================================
interface CartState {
  items: CartItem[];
  subtotal: number;
  totalItems: number;
  updateQty: (id: string, qty: number) => void;
  removeFromCart: (id: string) => void;
  addToCart: (item: CartItem) => void;
  clear: () => void;
}

/** Derive the totals that every cart consumer reads from the store. */
function cartTotals(items: CartItem[]) {
  return {
    subtotal: items.reduce((sum, i) => {
      const p = productById(i.id);
      return sum + (p?.price ?? 0) * i.qty;
    }, 0),
    totalItems: items.reduce((sum, i) => sum + i.qty, 0),
  };
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => {
      const setItems = (items: CartItem[]) =>
        set({ items, ...cartTotals(items) });

      return {
        items: [],
        subtotal: 0,
        totalItems: 0,
        updateQty: (id, qty) => {
          const store = getDemoStore();
          store.updateQty(id, qty);
          setItems(store.cart);
        },
        removeFromCart: (id) => {
          const store = getDemoStore();
          store.removeFromCart(id);
          setItems(store.cart);
        },
        addToCart: (item) => {
          const store = getDemoStore();
          store.addToCart(item);
          setItems(store.cart);
        },
        clear: () => setItems([]),
      };
    },
    {
      name: "breakoff-cart",
      // Only the items are persisted; totals are always recomputed on load.
      partialize: (state) => ({ items: state.items }),
      merge: (persisted, current) => {
        const items = (persisted as { items?: CartItem[] } | undefined)?.items ?? [];
        return { ...current, items, ...cartTotals(items) };
      },
    }
  )
);

// ============================================================================
// WISHLIST STORE
// ============================================================================
interface WishlistState {
  items: string[];
  add: (id: string) => void;
  remove: (id: string) => void;
  clear: () => void;
  moveToCart: (id: string, size: string, color: string) => void;
  isOpen: boolean;
  toggle: (id: string) => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set) => ({
      items: [],
      isOpen: false,
      add: (id) => {
        const store = getDemoStore();
        store.addToWishlist(id);
        set({ items: store.wishlist });
      },
      remove: (id) => {
        const store = getDemoStore();
        store.removeFromWishlist(id);
        set({ items: store.wishlist });
      },
      clear: () => {
        const store = getDemoStore();
        store.clearWishlist();
        set({ items: store.wishlist });
      },
      moveToCart: (id, size, color) => {
        const store = getDemoStore();
        const product = productById(id);
        if (!product) return;
        store.addToCart({ id, size, color, qty: 1 });
        store.removeFromWishlist(id);
        set({ items: store.wishlist });
      },
      toggle: (id) => {
        const store = getDemoStore();
        const exists = store.wishlist.includes(id);
        if (exists) {
          store.removeFromWishlist(id);
        } else {
          store.addToWishlist(id);
        }
        set({ items: store.wishlist });
      },
    }),
    {
      name: "breakoff-wishlist",
      partialize: (state) => ({ items: state.items }),
    }
  )
);

// ============================================================================
// APPLY DEMO STORE TO STORES
// ============================================================================
// Sync the demo store's cart/wishlist into the zustand stores on mount.
import { useEffect } from "react";

export function syncDemoToStores() {
  const store = getDemoStore();
  const items = store.cart;
  useCartStore.setState({ items, ...cartTotals(items) });
  useWishlistStore.setState({ items: store.wishlist });
}

// Hook to sync when the component mounts
export function useSyncDemoToStores() {
  useEffect(() => {
    syncDemoToStores();
  }, []);
}
