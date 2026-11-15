/**
 * products.ts
 * BREAKOFF product catalog.
 * - Realistic men's & women's fashion products.
 * - Each product has: id, name, description, category, brand,
 *   price (AED), originalPrice (if sale), images[], sizes[], colors[],
 *   stock, isNew, isSale, badge.
 * - Multiple images per product (gallery support).
 * - Used by: route handlers, components, search.
 *
 * NOTE: In production this comes from the Supabase `products` table.
 * In local demo mode, this in-memory catalog is used.
 */

export type Color = {
  name: string;
  hex: string;
};

export type Size = {
  label: string;
  available: boolean;
};

export type Product = {
  id: string;
  name: string;
  description: string;
  category: string;
  brand: string;
  price: number;
  originalPrice?: number;
  images: string[];
  sizes: Size[];
  colors: Color[];
  stock: number;
  isNew: boolean;
  isSale: boolean;
  badge?: string; // e.g. "New In", "Sale"
  featured?: boolean;
  sortOrder?: number;
};

// ============================================================================
// CATEGORY METADATA (used by category pages & filters)
// ============================================================================
export const CATEGORIES = {
  men: [
    "T-Shirts",
    "Shirts",
    "Hoodies",
    "Sweatshirts",
    "Trousers",
    "Jeans",
    "Jackets",
    "Shorts",
    "Shoes",
    "Accessories",
  ],
  women: [
    "Dresses",
    "Tops",
    "T-Shirts",
    "Shirts",
    "Jeans",
    "Trousers",
    "Skirts",
    "Hoodies",
    "Jackets",
    "Co-ord Sets",
    "Shoes",
    "Bags",
    "Accessories",
  ],
} as const;

export const ALL_CATEGORIES = [
  ...CATEGORIES.men,
  "New In",
  "Essentials",
  "Accessories",
  "Sale",
] as const;

export type Category =
  (typeof ALL_CATEGORIES)[number] | "men" | "women";

// ============================================================================
// PRODUCT CATALOG
// ============================================================================

export const PRODUCTS: Product[] = [
  // -------------------------------- MEN --------------------------------
  // T-Shirts
  {
    id: "men-tshirt-classic",
    name: "Classic White T-Shirt",
    description:
      "A perfectly cut crew-neck tee in heavyweight cotton. The foundation of every great wardrobe.",
    category: "T-Shirts",
    brand: "BREAKOFF",
    price: 89,
    images: [
      "/images/products/men/tshirt-classic-1.jpg",
      "/images/products/men/tshirt-classic-2.jpg",
    ],
    sizes: [
      { label: "S", available: true },
      { label: "M", available: true },
      { label: "L", available: true },
      { label: "XL", available: true },
      { label: "XXL", available: false },
    ],
    colors: [
      { name: "White", hex: "#faf8f5" },
      { name: "Black", hex: "#1a1a1a" },
    ],
    stock: 42,
    isNew: false,
    isSale: false,
    featured: true,
  },
  {
    id: "men-tshirt-ink",
    name: "Charcoal Essential Tee",
    description:
      "A minimal crew tee in charcoal. Soft, breathable, and endlessly wearable.",
    category: "T-Shirts",
    brand: "BREAKOFF",
    price: 92,
    images: [
      "/images/products/men/tshirt-ink-1.jpg",
      "/images/products/men/tshirt-ink-2.jpg",
    ],
    sizes: [
      { label: "S", available: true },
      { label: "M", available: true },
      { label: "L", available: true },
    ],
    colors: [
      { name: "Charcoal", hex: "#3a3a3a" },
    ],
    stock: 28,
    isNew: true,
    isSale: false,
    featured: true,
  },
  // Shirts
  {
    id: "men-shirt-slim",
    name: "Slim Fit Oxford Shirt",
    description:
      "An elegant oxford shirt with a refined slim fit. Unbuttoned, it reads like a statement.",
    category: "Shirts",
    brand: "BREAKOFF",
    price: 395,
    images: [
      "/images/products/men/shirt-slim-1.jpg",
      "/images/products/men/shirt-slim-2.jpg",
    ],
    sizes: [
      { label: "S", available: true },
      { label: "M", available: true },
      { label: "L", available: true },
      { label: "XL", available: false },
    ],
    colors: [
      { name: "White", hex: "#faf8f5" },
      { name: "Light Blue", hex: "#d8e4f0" },
    ],
    stock: 18,
    isNew: false,
    isSale: false,
    featured: true,
  },
  {
    id: "men-shirt-linen",
    name: "Linen Button-Down Shirt",
    description:
      "Breathable linen shirt for warm days. Relaxed cut with a smooth, muted finish.",
    category: "Shirts",
    brand: "BREAKOFF",
    price: 445,
    images: [
      "/images/products/men/shirt-linen-1.jpg",
      "/images/products/men/shirt-linen-2.jpg",
    ],
    sizes: [
      { label: "M", available: true },
      { label: "L", available: true },
      { label: "XL", available: true },
    ],
    colors: [
      { name: "Beige", hex: "#d8c9a8" },
    ],
    stock: 14,
    isNew: true,
    isSale: false,
    featured: true,
  },
  // Hoodies
  {
    id: "men-hoodie-hooded",
    name: "Classic Hooded Sweatshirt",
    description:
      "A heavyweight hoodie with a kangaroo pocket and relaxed silhouette. Layered or alone.",
    category: "Hoodies",
    brand: "BREAKOFF",
    price: 385,
    images: [
      "/images/products/men/hoodie-hooded-1.jpg",
      "/images/products/men/hoodie-hooded-2.jpg",
    ],
    sizes: [
      { label: "S", available: true },
      { label: "M", available: true },
      { label: "L", available: true },
      { label: "XL", available: true },
    ],
    colors: [
      { name: "Heather Grey", hex: "#9a9a9a" },
      { name: "Black", hex: "#1a1a1a" },
    ],
    stock: 35,
    isNew: false,
    isSale: false,
    featured: true,
  },
  {
    id: "men-hoodie-ankle",
    name: "Ankle-Collar Hoodie",
    description:
      "A modern hoodie with an ankle-taut collar. Soft cotton fleece with a clean look.",
    category: "Hoodies",
    brand: "BREAKOFF",
    price: 395,
    images: [
      "/images/products/men/hoodie-ankle-1.jpg",
      "/images/products/men/hoodie-ankle-2.jpg",
    ],
    sizes: [
      { label: "S", available: true },
      { label: "M", available: true },
      { label: "L", available: true },
    ],
    colors: [
      { name: "Charcoal", hex: "#3a3a3a" },
    ],
    stock: 22,
    isNew: true,
    isSale: false,
    featured: true,
  },
  // Trousers
  {
    id: "men-trouser-slim",
    name: "Slim Fit Trouser",
    description:
      "A tailored trouser with a clean line and comfortable seat. Dress or relax in it.",
    category: "Trousers",
    brand: "BREAKOFF",
    price: 645,
    images: [
      "/images/products/men/trouser-slim-1.jpg",
      "/images/products/men/trouser-slim-2.jpg",
    ],
    sizes: [
      { label: "S", available: true },
      { label: "M", available: true },
      { label: "L", available: true },
      { label: "XL", available: false },
    ],
    colors: [
      { name: "Black", hex: "#1a1a1a" },
      { name: "Navy", hex: "#2c3e50" },
    ],
    stock: 16,
    isNew: false,
    isSale: false,
    featured: true,
  },
  {
    id: "men-trouser-chino",
    name: "Lightweight Chino",
    description:
      "A relaxed chino in a flexible weave. Everyday trousers that transition from day to night.",
    category: "Trousers",
    brand: "BREAKOFF",
    price: 595,
    images: [
      "/images/products/men/trouser-chino-1.jpg",
      "/images/products/men/trouser-chino-2.jpg",
    ],
    sizes: [
      { label: "S", available: true },
      { label: "M", available: true },
      { label: "L", available: true },
      { label: "XL", available: true },
    ],
    colors: [
      { name: "Khaki", hex: "#c8a87c" },
      { name: "Olive", hex: "#6b7d5a" },
    ],
    stock: 27,
    isNew: true,
    isSale: false,
    featured: true,
  },
  // Jeans
  {
    id: "men-jeans-slim",
    name: "Slim Stretch Jeans",
    description:
      "A stretch-intruded jean with a clean, modern cut. Comfort for daily wear.",
    category: "Jeans",
    brand: "BREAKOFF",
    price: 745,
    images: [
      "/images/products/men/jeans-slim-1.jpg",
      "/images/products/men/jeans-slim-2.jpg",
    ],
    sizes: [
      { label: "S", available: true },
      { label: "M", available: true },
      { label: "L", available: true },
      { label: "XL", available: true },
    ],
    colors: [
      { name: "Blue", hex: "#2b4a6f" },
      { name: "Black", hex: "#1a1a1a" },
      { name: "Grey", hex: "#7a7a7a" },
    ],
    stock: 31,
    isNew: false,
    isSale: false,
    featured: true,
  },
  // Jackets
  {
    id: "men-jacket-canvas",
    name: "Lightweight Canvas Jacket",
    description:
      "A slim-line jacket that layers over a tee or shirt. Practical, rugged, refined.",
    category: "Jackets",
    brand: "BREAKOFF",
    price: 1245,
    images: [
      "/images/products/men/jacket-canvas-1.jpg",
      "/images/products/men/jacket-canvas-2.jpg",
    ],
    sizes: [
      { label: "S", available: true },
      { label: "M", available: true },
      { label: "L", available: true },
      { label: "XL", available: true },
    ],
    colors: [
      { name: "Dark Green", hex: "#2f4f4f" },
      { name: "Black", hex: "#1a1a1a" },
    ],
    stock: 12,
    isNew: false,
    isSale: false,
    featured: true,
  },
  {
    id: "men-jacket-igator",
    name: "Washed Imitation Leather Jacket",
    description:
      "A contemporary version of a classic. Soft leather look with a relaxed fit.",
    category: "Jackets",
    brand: "BREAKOFF",
    price: 2195,
    images: [
      "/images/products/men/jacket-igator-1.jpg",
      "/images/products/men/jacket-igator-2.jpg",
    ],
    sizes: [
      { label: "M", available: true },
      { label: "L", available: true },
      { label: "XL", available: false },
    ],
    colors: [
      { name: "Grey", hex: "#7a7a7a" },
      { name: "Black", hex: "#1a1a1a" },
    ],
    stock: 8,
    isNew: true,
    isSale: false,
    featured: true,
  },
  // Shorts
  {
    id: "men-shorts-look",
    name: "Fit & Finish Shorts",
    description:
      "Lightweight cargo shorts with a clean line. Perfect for warm weather.",
    category: "Shorts",
    brand: "BREAKOFF",
    price: 645,
    images: [
      "/images/products/men/shorts-look-1.jpg",
      "/images/products/men/shorts-look-2.jpg",
    ],
    sizes: [
      { label: "S", available: true },
      { label: "M", available: true },
      { label: "L", available: true },
    ],
    colors: [
      { name: "Navy", hex: "#2c3e50" },
      { name: "Khaki", hex: "#c8a87c" },
    ],
    stock: 20,
    isNew: true,
    isSale: false,
    featured: true,
  },
  // Shoes
  {
    id: "men-shoe-sneaker",
    name: "Minimal Leather Sneaker",
    description:
      "A clean leather sneaker with a cushioned sole. The everyday walking shoe.",
    category: "Shoes",
    brand: "BREAKOFF",
    price: 1195,
    images: [
      "/images/products/men/shoe-sneaker-1.jpg",
      "/images/products/men/shoe-sneaker-2.jpg",
    ],
    sizes: [
      { label: "39", available: true },
      { label: "40", available: true },
      { label: "41", available: true },
      { label: "42", available: true },
      { label: "43", available: false },
    ],
    colors: [
      { name: "White", hex: "#faf8f5" },
      { name: "Black", hex: "#1a1a1a" },
    ],
    stock: 19,
    isNew: false,
    isSale: false,
    featured: true,
  },
  // Accessories
  {
    id: "men-accessory-watch",
    name: "Minimalist Steel Watch",
    description:
      "A distinctly simple wristwatch with a clear dial and steel strap. Useful alone or with a shirt.",
    category: "Accessories",
    brand: "BREAKOFF",
    price: 1795,
    images: [
      "/images/products/men/accessory-watch-1.jpg",
      "/images/products/men/accessory-watch-2.jpg",
    ],
    sizes: [{ label: "M", available: true }],
    colors: [
      { name: "Silver", hex: "#c0c0c0" },
      { name: "Black", hex: "#1a1a1a" },
    ],
    stock: 14,
    isNew: true,
    isSale: false,
    featured: true,
  },
  {
    id: "men-accessory-sunglasses",
    name: "Aviator Sunglasses",
    description:
      "Classic aviator shape, polarized lenses, lightweight metal frame.",
    category: "Accessories",
    brand: "BREAKOFF",
    price: 695,
    images: [
      "/images/products/men/accessory-sunglasses-1.jpg",
      "/images/products/men/accessory-sunglasses-2.jpg",
    ],
    sizes: [{ label: "M", available: true }],
    colors: [
      { name: "Black", hex: "#1a1a1a" },
      { name: "Gold", hex: "#c8a87c" },
    ],
    stock: 25,
    isNew: false,
    isSale: false,
    featured: true,
  },
  // -------------------------------- WOMEN --------------------------------
  // Dresses
  {
    id: "women-dress-pleat",
    name: "Pleated Midi Dress",
    description:
      "A graceful midi dress with razor pleats — feminine, fluid, effortlessly elegant.",
    category: "Dresses",
    brand: "BREAKOFF",
    price: 895,
    images: [
      "/images/products/women/dress-pleat-1.jpg",
      "/images/products/women/dress-pleat-2.jpg",
    ],
    sizes: [
      { label: "XS", available: true },
      { label: "S", available: true },
      { label: "M", available: true },
      { label: "L", available: true },
    ],
    colors: [
      { name: "Burgundy", hex: "#6b2d3a" },
      { name: "Navy", hex: "#2c3e50" },
    ],
    stock: 16,
    isNew: true,
    isSale: false,
    featured: true,
  },
  {
    id: "women-dress-cocktail",
    name: "Slinky Cocktail Dress",
    description:
      "A sleeveless midi dress with a supportive boning. For moments that matter.",
    category: "Dresses",
    brand: "BREAKOFF",
    price: 2495,
    images: [
      "/images/products/women/dress-cocktail-1.jpg",
      "/images/products/women/dress-cocktail-2.jpg",
    ],
    sizes: [
      { label: "S", available: true },
      { label: "M", available: true },
      { label: "L", available: true },
      { label: "XL", available: false },
    ],
    colors: [
      { name: "Black", hex: "#1a1a1a" },
      { name: "Navy", hex: "#2c3e50" },
    ],
    stock: 11,
    isNew: false,
    isSale: false,
    featured: true,
  },
  // Tops
  {
    id: "women-top-knit",
    name: "Cozy Knit Top",
    description:
      "A soft knit top with a boxy cut. Layering piece for cooler seasons.",
    category: "Tops",
    brand: "BREAKOFF",
    price: 495,
    images: [
      "/images/products/women/top-knit-1.jpg",
      "/images/products/women/top-knit-2.jpg",
    ],
    sizes: [
      { label: "XS", available: true },
      { label: "S", available: true },
      { label: "M", available: true },
      { label: "L", available: true },
    ],
    colors: [
      { name: "Heather Grey", hex: "#9a9a9a" },
      { name: "White", hex: "#faf8f5" },
    ],
    stock: 24,
    isNew: false,
    isSale: false,
    featured: true,
  },
  {
    id: "women-top-silk",
    name: "Silk Satin Top",
    description:
      "A fluid satin blouse with a delicate clear button placket.",
    category: "Tops",
    brand: "BREAKOFF",
    price: 795,
    images: [
      "/images/products/women/top-silk-1.jpg",
      "/images/products/women/top-silk-2.jpg",
    ],
    sizes: [
      { label: "S", available: true },
      { label: "M", available: true },
      { label: "L", available: true },
    ],
    colors: [
      { name: "Gold", hex: "#c8a87c" },
      { name: "White", hex: "#faf8f5" },
    ],
    stock: 13,
    isNew: true,
    isSale: false,
    featured: true,
  },
  // T-Shirts
  {
    id: "women-tshirt-ennie",
    name: "Women's V-Neck Tee",
    description:
      "A soft, regular-fit tee with a subtle V-neck. The everyday essential.",
    category: "T-Shirts",
    brand: "BREAKOFF",
    price: 79,
    images: [
      "/images/products/women/tshirt-ennie-1.jpg",
      "/images/products/women/tshirt-ennie-2.jpg",
    ],
    sizes: [
      { label: "XS", available: true },
      { label: "S", available: true },
      { label: "M", available: true },
      { label: "L", available: true },
      { label: "XL", available: true },
    ],
    colors: [
      { name: "White", hex: "#faf8f5" },
      { name: "Black", hex: "#1a1a1a" },
      { name: "Navy", hex: "#2c3e50" },
    ],
    stock: 58,
    isNew: false,
    isSale: false,
    featured: true,
  },
  // Shirts
  {
    id: "women-shirt-batik",
    name: "Batik Deconstructed Shirt",
    description:
      "A lightweight shirt with unexpected hand-painted accents.",
    category: "Shirts",
    brand: "BREAKOFF",
    price: 645,
    images: [
      "/images/products/women/shirt-batik-1.jpg",
      "/images/products/women/shirt-batik-2.jpg",
    ],
    sizes: [
      { label: "S", available: true },
      { label: "M", available: true },
      { label: "L", available: true },
    ],
    colors: [
      { name: "Teal", hex: "#2e8b8b" },
      { name: "White", hex: "#faf8f5" },
    ],
    stock: 15,
    isNew: true,
    isSale: false,
    featured: true,
  },
  // Jeans
  {
    id: "women-jeans-high",
    name: "High-Waist Jeans",
    description:
      "A classic high-waisted jean with a modern slim fit.",
    category: "Jeans",
    brand: "BREAKOFF",
    price: 895,
    images: [
      "/images/products/women/jeans-high-1.jpg",
      "/images/products/women/jeans-high-2.jpg",
    ],
    sizes: [
      { label: "XS", available: true },
      { label: "S", available: true },
      { label: "M", available: true },
      { label: "L", available: true },
      { label: "XL", available: false },
    ],
    colors: [
      { name: "Blue", hex: "#2b4a6f" },
      { name: "Black", hex: "#1a1a1a" },
    ],
    stock: 29,
    isNew: false,
    isSale: false,
    featured: true,
  },
  // Trousers
  {
    id: "women-trouser-tailor",
    name: "Tailored Trouser",
    description:
      "A sharp, pressed trouser with a comfortable rise. Formal or casual.",
    category: "Trousers",
    brand: "BREAKOFF",
    price: 795,
    images: [
      "/images/products/women/trouser-tailor-1.jpg",
      "/images/products/women/trouser-tailor-2.jpg",
    ],
    sizes: [
      { label: "XS", available: true },
      { label: "S", available: true },
      { label: "M", available: true },
      { label: "L", available: true },
    ],
    colors: [
      { name: "Black", hex: "#1a1a1a" },
      { name: "Beige", hex: "#d8c9a8" },
    ],
    stock: 18,
    isNew: false,
    isSale: false,
    featured: true,
  },
  // Skirts
  {
    id: "women-skirt-pleat",
    name: "Pleated Mini Skirt",
    description:
      "A playful mini with razor pleats. A move that says everything.",
    category: "Skirts",
    brand: "BREAKOFF",
    price: 595,
    images: [
      "/images/products/women/skirt-pleat-1.jpg",
      "/images/products/women/skirt-pleat-2.jpg",
    ],
    sizes: [
      { label: "XS", available: true },
      { label: "S", available: true },
      { label: "M", available: true },
    ],
    colors: [
      { name: "Black", hex: "#1a1a1a" },
      { name: "Navy", hex: "#2c3e50" },
    ],
    stock: 19,
    isNew: true,
    isSale: false,
    featured: true,
  },
  // Hoodies
  {
    id: "women-hoodie-hoodie",
    name: "Boxy Hoodie",
    description:
      "A relaxed hoodie with a dropped shoulder. Soft and cozy.",
    category: "Hoodies",
    brand: "BREAKOFF",
    price: 645,
    images: [
      "/images/products/women/hoodie-hoodie-1.jpg",
      "/images/products/women/hoodie-hoodie-2.jpg",
    ],
    sizes: [
      { label: "XS", available: true },
      { label: "S", available: true },
      { label: "M", available: true },
      { label: "L", available: true },
    ],
    colors: [
      { name: "Black", hex: "#1a1a1a" },
      { name: "Grey", hex: "#7a7a7a" },
      { name: "Navy", hex: "#2c3e50" },
    ],
    stock: 22,
    isNew: false,
    isSale: false,
    featured: true,
  },
  // Jackets
  {
    id: "women-jacket-leather",
    name: "Slim Leather Jacket",
    description:
      "A structured jacket with a sharp silhouette. A statement of effortless style.",
    category: "Jackets",
    brand: "BREAKOFF",
    price: 2895,
    images: [
      "/images/products/women/jacket-leather-1.jpg",
      "/images/products/women/jacket-leather-2.jpg",
    ],
    sizes: [
      { label: "XS", available: true },
      { label: "S", available: true },
      { label: "M", available: true },
      { label: "L", available: false },
    ],
    colors: [
      { name: "Brown", hex: "#6e4a3a" },
      { name: "Black", hex: "#1a1a1a" },
    ],
    stock: 9,
    isNew: true,
    isSale: false,
    featured: true,
  },
  // Co-ord Sets
  {
    id: "women-coord-set",
    name: "Co-ord Set",
    description:
      "A matching top and bottom in a tonal palette. Complete, wearable, easy.",
    category: "Co-ord Sets",
    brand: "BREAKOFF",
    price: 1295,
    images: [
      "/images/products/women/coord-set-1.jpg",
      "/images/products/women/coord-set-2.jpg",
    ],
    sizes: [
      { label: "S", available: true },
      { label: "M", available: true },
      { label: "L", available: true },
      { label: "XL", available: true },
    ],
    colors: [
      { name: "Navy", hex: "#2c3e50" },
      { name: "White", hex: "#faf8f5" },
    ],
    stock: 14,
    isNew: false,
    isSale: false,
    featured: true,
  },
  // Shoes
  {
    id: "women-shoe-heel",
    name: "Block Heel Pump",
    description:
      "A comfortable block heel with a slender profile. Walk with confidence.",
    category: "Shoes",
    brand: "BREAKOFF",
    price: 995,
    images: [
      "/images/products/women/shoe-heel-1.jpg",
      "/images/products/women/shoe-heel-2.jpg",
    ],
    sizes: [
      { label: "36", available: true },
      { label: "37", available: true },
      { label: "38", available: true },
      { label: "39", available: true },
      { label: "40", available: false },
    ],
    colors: [
      { name: "Black", hex: "#1a1a1a" },
      { name: "Nude", hex: "#d8c9a8" },
    ],
    stock: 26,
    isNew: false,
    isSale: false,
    featured: true,
  },
  // Bags
  {
    id: "women-bag-mini",
    name: "Mini Clutcher",
    description:
      "A compact leather clutcher with a clean silhouette and adjustable strap.",
    category: "Bags",
    brand: "BREAKOFF",
    price: 1495,
    images: [
      "/images/products/women/bag-mini-1.jpg",
      "/images/products/women/bag-mini-2.jpg",
    ],
    sizes: [{ label: "M", available: true }],
    colors: [
      { name: "Black", hex: "#1a1a1a" },
      { name: "Tan", hex: "#c8a87c" },
    ],
    stock: 17,
    isNew: true,
    isSale: false,
    featured: true,
  },
  {
    id: "women-bag-backpack",
    name: "Laptop Backpack",
    description:
      "A lightweight backpack with padded back panel and sleek lines.",
    category: "Bags",
    brand: "BREAKOFF",
    price: 1195,
    images: [
      "/images/products/women/bag-backpack-1.jpg",
      "/images/products/women/bag-backpack-2.jpg",
    ],
    sizes: [{ label: "M", available: true }],
    colors: [
      { name: "Black", hex: "#1a1a1a" },
      { name: "Olive", hex: "#6b7d5a" },
    ],
    stock: 12,
    isNew: false,
    isSale: false,
    featured: true,
  },
  // Accessories
  {
    id: "women-accessory-scarf",
    name: "Silk Scarf",
    description:
      "A square silk scarf with a refined print. Easy to style, never loud.",
    category: "Accessories",
    brand: "BREAKOFF",
    price: 395,
    images: [
      "/images/products/women/accessory-scarf-1.jpg",
      "/images/products/women/accessory-scarf-2.jpg",
    ],
    sizes: [{ label: "M", available: true }],
    colors: [
      { name: "Navy", hex: "#2c3e50" },
      { name: "Gold", hex: "#c8a87c" },
      { name: "White", hex: "#faf8f5" },
    ],
    stock: 33,
    isNew: false,
    isSale: false,
    featured: true,
  },
];

// ============================================================================
// HELPER: get product by id
// ============================================================================
export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}

// ============================================================================
// HELPER: get products by category
// ============================================================================
export function getProductsByCategory(
  category: string,
  gender: "men" | "women" = "men"
): Product[] {
  if (category === "men") return PRODUCTS.filter((p) => p.category !== "Accessories" || p.id);
  if (category === "women") return PRODUCTS.filter((p) => p.category !== "Accessories" || p.id);
  // "New In", "Essentials", "Accessories", "Sale" filter below
  return [...PRODUCTS].sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
}

// ============================================================================
// HELPER: get featured products (first 4)
// ============================================================================
export function getFeaturedProducts(
  gender: "men" | "women" = "men"
): Product[] {
  return [...PRODUCTS]
    .filter((p) => (gender === "women" ? !p.id.startsWith("men") : p.id.startsWith("men")))
    .sort((a, b) => (b.sortOrder ?? 0) - (a.sortOrder ?? 0))
    .slice(0, 4);
}

// ============================================================================
// HELPER: get all product ids (for search)
// ============================================================================
export function getProductIds(): string[] {
  return PRODUCTS.map((p) => p.id);
}

// ============================================================================
// HELPER: get products by id array
// ============================================================================
export function getProductsByIds(ids: string[]): Product[] {
  return PRODUCTS.filter((p) => ids.includes(p.id));
}
