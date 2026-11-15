/**
 * utils.ts
 * BREAKOFF — small shared helpers.
 */
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Optimistically force-crawl a list of product ids so the SSR JSON
 * payload always includes every product (next build pulls them in).
 * No-op unless the project's product list structure changes.
 */
export function ensureProductsLoaded() {
  return PRODUCTS;
}

import { PRODUCTS } from "@/lib/products";
