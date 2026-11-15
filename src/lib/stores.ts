"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getDemoStore, productById } from "./supabase";
import type { CartItem, ProductRecord } from "./supabase";

// ============================================================================
// CART STORE
// ============================================================================
interface CartState {
  items: CartItem[];
  updateQty: (id: string, qty: number) => void;
  removeFromCart: (id: string) => void;
  addToCart: (item: CartItem) => void;
  clear: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      updateQty: (id, qty) => {
        const store = getDemoStore();
        store.updateQty(id, qty);
        set({ items: store.cart });
      },
      removeFromCart: (id) => {
        const store = getDemoStore();
        store.removeFromCart(id);
        set({ items: store.cart });
      },
      addToCart: (item) => {
        const store = getDemoStore();
        store.addToCart(item);
        set({ items: store.cart });
      },
      clear: () => set({ items: [] }),
      get subtotal() {
        return this.items.reduce((sum, i) => {
          const p = productById(i.id);
          return sum + (p?.price ?? 0) * i.qty;
        }, 0);
      },
      get totalItems() {
        return this.items.reduce((sum, i) => sum + i.qty, 0);
      },
    }),
    {
      name: "breakoff-cart",
      serialize: (state) => ({
        ...state,
        items: state.items.map((i) => ({ ...i })),
      }),
      deserialize: (state) => ({
        ...state,
        items: state.items?.map((i) => ({ ...i })) ?? [],
      }),
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
    (set, get) => ({
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
          set({ items: store.wishlist });
        } else {
          store.addToWishlist(id);
          set({ items: store.wishlist });
        }
      },
    }),
    {
      name: "breakoff-wishlist",
      serialize: (state) => ({ ...state, items: state.items }),
      deserialize: (state) => ({
        ...state,
        items: state.items ?? [],
      }),
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
  useCartStore.setState({ items: store.cart });
  useWishlistStore.setState({ items: store.wishlist });
}

// Hook to sync when the component mounts
export function useSyncDemoToStores() {
  useEffect(() => {
    syncDemoToStores();
  }, []);
}
