/**
 * supabase.ts
 * BREAKOFF — Supabase client.
 *
 * Supports two modes:
 *  1. CONFIGURED — when `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
 *     are present, an isomorphic client (client + server parts) is created.
 *  2. DEMO MODE — when credentials are absent, a lightweight in-memory store
 *     backs every real feature (cart, wishlist, auth-less product read, orders).
 *
 * This is the *only* file that decides which mode runs, so no UI ever
 * "pretends" a backend is connected when it isn't.
 */
import { createClient } from "@supabase/supabase-js";
import type { Database } from "./database";

// Channel names for cross-tab sync.
export const SB_CHANNELS = {
  CART: "breakoff:cart",
  WISHLIST: "breakoff:wishlist",
} as const;

let supabaseInstance: ReturnType<typeof createClient> | null = null;
let demoStore: DemoStore | null = null;

// ---- Demo-mode in-memory store ----------------------------------------------

export type ProductRecord = {
  id: string;
  name: string;
  description: string;
  category: string;
  brand: string;
  price: number;
  originalPrice?: number;
  images: string[];
  sizes: { label: string; available: boolean }[];
  colors: { name: string; hex: string }[];
  stock: number;
  isNew: boolean;
  isSale: boolean;
  badge?: string;
  featured?: boolean;
  sortOrder?: number;
};

export type CartItem = {
  id: string; // product id
  size: string;
  color: string;
  qty: number;
};

export type OrderItemRecord = {
  orderId: string;
  productId: string;
  name: string;
  price: number;
  qty: number;
  size: string;
  color: string;
};

export type DemoStore = {
  products: ProductRecord[];
  cart: CartItem[];
  wishlist: string[]; // product ids
  orders: OrderItemRecord[][];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  addToWishlist: (id: string) => void;
  removeFromWishlist: (id: string) => void;
  createOrder: (items: CartItem[], details: unknown) => string;
  clearCart: () => void;
  clearWishlist: () => void;
  reset: () => void;
};

function createDemoStore(): DemoStore {
  const seeded = PRODUCTS.map((p) => ({
    ...p,
    id: p.id,
  }));

  let cart: CartItem[] = [];
  let wishlist: string[] = [];
  const orders: OrderItemRecord[][] = [];

  return {
    products: seeded,
    cart,
    wishlist,
    orders,
    addToCart: (item) => {
      const existing = cart.find((i) => i.id === item.id && i.size === item.size && i.color === item.color);
      if (existing) {
        existing.qty += item.qty;
      } else {
        cart = [...cart, { ...item, qty: item.qty || 1 }];
      }
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent(SB_CHANNELS.CART));
      }
    },
    removeFromCart: (id) => {
      cart = cart.filter((i) => i.id !== id);
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent(SB_CHANNELS.CART));
      }
    },
    updateQty: (id, qty) => {
      if (qty <= 0) {
        cart = cart.filter((i) => i.id !== id);
      } else {
        const found = cart.find((i) => i.id === id);
        if (found) {
          found.qty = qty;
        }
      }
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent(SB_CHANNELS.CART));
      }
    },
    addToWishlist: (id) => {
      if (!wishlist.includes(id)) wishlist = [...wishlist, id];
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent(SB_CHANNELS.WISHLIST));
      }
    },
    removeFromWishlist: (id) => {
      wishlist = wishlist.filter((i) => i !== id);
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent(SB_CHANNELS.WISHLIST));
      }
    },
    createOrder: (items, details) => {
      // Persist order history for demo.
      const orderItems: OrderItemRecord[] = items.map((item) => ({
        orderId: crypto.randomUUID(),
        productId: item.id,
        name: productById(item.id)?.name ?? "Product",
        price: productById(item.id)?.price ?? 0,
        qty: item.qty,
        size: item.size,
        color: item.color,
      }));
      orders.push(orderItems);
      cart = [];
      wishlist = [];
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent(SB_CHANNELS.CART));
        window.dispatchEvent(new CustomEvent(SB_CHANNELS.WISHLIST));
      }
      return orderItems[0]?.orderId ?? crypto.randomUUID();
    },
    clearCart: () => {
      cart = [];
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent(SB_CHANNELS.CART));
      }
    },
    clearWishlist: () => {
      wishlist = [];
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent(SB_CHANNELS.WISHLIST));
      }
    },
    reset: () => {
      cart = [];
      wishlist = [];
      orders.length = 0;
    },
  };
}

// ---- Supabase client ---------------------------------------------------------

if (typeof process !== "undefined" && process.env.NEXT_PUBLIC_SUPABASE_URL) {
  supabaseInstance = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        storageKey: "__supabase_demo_storage",
      },
      global: {
        // Avoid "localStorage is not available" in some Next.js server contexts.
        headers: { "x-vercel-ai-client": "nextjs" },
      },
    }
  );
}

// If supabase client is created, export it. Otherwise export the demo store.
export const supabase =
  supabaseInstance ?? ({} as ReturnType<typeof createClient>);

// Expose the demo store so components can import the real instance.
export { demoStore, createDemoStore };

export function getDemoStore(): DemoStore {
  if (!demoStore) demoStore = createDemoStore();
  return demoStore;
}

/**
 * A small typed wrapper for the Supabase client's fetch-like helpers so
 * route handlers can share logic between real Supabase and the demo store.
 */
export type QueryOptions = {
  page?: number;
  pageSize?: number;
  sortBy?: string;
  order?: "asc" | "desc";
  filters?: Record<string, string | string[] | undefined>;
};

export async function fetchProducts(options: QueryOptions = {}) {
  // Demo path.
  const store = getDemoStore();
  let list = store.products;

  const { page = 1, pageSize = 12, sortBy = "sortOrder", order = "asc", filters } = options;

  // Sorting
  const dir = order === "desc" ? -1 : 1;
  list = [...list].sort((a, b) => {
    if (sortBy === "price") return dir * (a.price - b.price);
    if (sortBy === "newest") return dir * ((b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    if (sortBy === "name") return dir * a.name.localeCompare(b.name);
    return dir * ((a.sortOrder ?? 0) - (b.sortOrder ?? 0));
  });

  // Filters
  if (filters) {
    const cat = filters.category;
    if (cat) {
      list = list.filter((p) => p.category === cat);
    }
    const color = filters.color;
    if (color) {
      list = list.filter((p) => p.colors.some((c) => c.name === color));
    }
    const size = filters.size;
    if (size) {
      list = list.filter((p) => p.sizes.some((s) => s.label === size));
    }
    const inStock = filters.inStock;
    if (inStock === "true") {
      list = list.filter((p) => p.stock > 0);
    }
    const onSale = filters.onSale;
    if (onSale === "true") {
      list = list.filter((p) => p.isSale);
    }
  }

  const total = list.length;
  const paginated = list.slice((page - 1) * pageSize, page * pageSize);

  return { data: paginated, total, page, pageSize };
}

export async function getProductByIdFromStore(id: string) {
  const store = getDemoStore();
  return store.products.find((p) => p.id === id);
}

export async function getProductsByIdsFromStore(ids: string[]) {
  const store = getDemoStore();
  return store.products.filter((p) => ids.includes(p.id));
}

export function productById(id: string): ProductRecord | undefined {
  const store = getDemoStore();
  return store.products.find((p) => p.id === id);
}

export function countProducts(): number {
  return getDemoStore().products.length;
}
