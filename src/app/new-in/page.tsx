/**
 * new-in/page.tsx
 * BREAKOFF — New In page.
 * - Recently added products
 * - New arrival labels on each card
 * - Product sorting (newest)
 */
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductGrid } from "@/components/product-grid";
import { CATEGORIES } from "@/lib/products";
import { PRODUCTS } from "@/lib/products";

export const metadata: Metadata = {
  title: "New In | BREAKOFF",
  description: "Fresh arrivals from BREAKOFF. Timeless essentials, newly released.",
};

export default async function NewInPage() {
  // New arrivals: products with isNew, sorted by sortOrder
  const newInProducts =PRODUCTS.filter((p) => p.isNew)
    .sort((a, b) => (b.sortOrder ?? 0) - (a.sortOrder ?? 0))
    .map((p) => ({
      id: p.id,
      name: p.name,
      category: p.category,
      price: p.price,
      originalPrice: p.originalPrice,
      images: p.images,
      isSale: p.isSale,
      isNew: p.isNew,
      badge: p.badge,
    }));

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
              New In
            </h1>
            <p className="text-ink-500 mt-3 text-base leading-relaxed">
              Freshly arrived pieces for the modern wardrobe. Explore the
              latest releases from the BREAKOFF collection.
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
                Fresh Arrivals
              </h2>
              <p className="text-ink-500 mt-1">
                {newInProducts.length} {newInProducts.length === 1 ? "item" : "items"} available
              </p>
            </div>
          </div>

          {newInProducts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-2xl text-ink-700 font-bold">No new arrivals yet</p>
              <p className="text-ink-500 mt-2">Check back soon for fresh pieces</p>
            </div>
          ) : (
            <ProductGrid products={newInProducts} />
          )}
        </div>
      </section>
    </>
  );
}
