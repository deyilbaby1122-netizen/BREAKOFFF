/**
 * essentials/page.tsx
 * BREAKOFF — Essentials page.
 * - Everyday clothing basics
 * - Product grid with sorting
 */
import { Metadata } from "next";
import { ProductGrid } from "@/components/product-grid";
import { getFeaturedProducts } from "@/lib/products";

export const metadata: Metadata = {
  title: "Essentials | BREAKOFF",
  description: "Everyday essentials from BREAKOFF. Timeless basics, made better.",
};

export default async function EssentialsPage() {
  // Essentials: all T-Shirts (the core basics)
  const essentials = getFeaturedProducts("men").filter((p) => p.category === "T-Shirts");
  const allTShirts = getFeaturedProducts("men").filter((p) => p.category === "T-Shirts");

  return (
    <>
      {/* Hero */}
      <section className="py-14 bg-cream-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-black mb-3">
              BREAKOFF
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold text-ink-900 tracking-tight leading-tight">
              Essentials
            </h1>
            <p className="text-ink-500 mt-3 text-base leading-relaxed">
              Everyday basics, perfected. The foundation of every great
              wardrobe — soft, durable, and endlessly wearable.
            </p>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-ink-900 tracking-tight">
                Everyday Basics
              </h2>
              <p className="text-ink-500 mt-1">
                {allTShirts.length} essential T-Shirts
              </p>
            </div>
          </div>
          <ProductGrid products={allTShirts} />
        </div>
      </section>
    </>
  );
}
