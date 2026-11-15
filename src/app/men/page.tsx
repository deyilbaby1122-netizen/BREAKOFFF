/**
 * men/page.tsx
 * BREAKOFF — Men's Collection page.
 * - Campaign banners
 * - New arrivals, best sellers
 * - Product grid with filters + sorting
 * - Category navigation
 */
import { Metadata } from "next";
import Link from "next/link";
import { ProductGrid } from "@/components/product-grid";
import { CATEGORIES } from "@/lib/products";
import { getFeaturedProducts } from "@/lib/products";

export const metadata: Metadata = {
  title: "Men's Collection | BREAKOFF",
  description: "The complete men's collection from BREAKOFF. Premium minimalist fashion for everyday.",
};

export default async function MenPage() {
  const menCategory = CATEGORIES.men;

  // Featured men's products for hero campaigns
  const featuredMen = getFeaturedProducts("men");

  return (
    <>
      {/* Page hero */}
      <section className="py-14 bg-cream-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Text */}
            <div>
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-black mb-3">
                BREAKOFF
              </p>
              <h1 className="text-4xl sm:text-5xl font-bold text-ink-900 leading-tight">
                Men's Collection
              </h1>
              <p className="text-ink-500 mt-3 text-base leading-relaxed">
                Premium minimalist fashion. Timeless essentials, crafted for the
                modern man — from tailored shirts to relaxed loungewear.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/new-in"
                  className="text-sm font-medium text-black hover:underline"
                >
                  View New Arrivals
                </Link>
                <Link
                  href="/men/tshirts"
                  className="text-sm font-medium text-black bg-black hover:bg-neutral-800 text-white px-5 py-2.5 rounded-full transition-colors"
                >
                  Shop New Arrivals
                </Link>
              </div>
            </div>
            {/* Campaign image */}
            <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-xl">
              <img
                src="/images/hero/fashion-hero.jpg"
                alt="Men's BREAKOFF fashion campaign"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Category navigation */}
      <section className="py-8 bg-white border-b border-cream-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2">
            <Link
              href="/men"
              className="px-4 py-2 rounded-full text-sm font-medium bg-black text-white"
            >
              Men
            </Link>
            {menCategory.map((cat) => (
              <Link
                key={cat}
                href={`/men/${cat.toLowerCase().replace(/\s+/g, "-")}`}
                className="px-4 py-2 rounded-full text-sm font-medium text-ink-700 hover:bg-cream-100 hover:text-ink-900 transition-colors"
              >
                {cat}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="py-14 bg-cream-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-ink-900 tracking-tight">
                All Men's Items
              </h2>
              <p className="text-ink-500 mt-1">
                {48} pieces in this collection
              </p>
            </div>
          </div>
          <ProductGrid gender="men" />
        </div>
      </section>
    </>
  );
}
