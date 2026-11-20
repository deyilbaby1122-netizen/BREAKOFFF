/**
 * sale/page.tsx
 * BREAKOFF — Sale page.
 * - Discounted products
 * - Original prices + sale prices + discount %
 * - Sorting by price
 */
import { Metadata } from "next";
import { ProductGrid } from "@/components/product-grid";
import { getFeaturedProducts } from "@/lib/products";

export const metadata: Metadata = {
  title: "Sale | BREAKOFF",
  description: "Exclusive sale from BREAKOFF. Premium fashion at discounted prices.",
};

export default async function SalePage() {
  // Sale products: products that are on sale
  const menSale = getFeaturedProducts("men").filter((p) => p.isSale);
  const womenSale = getFeaturedProducts("women").filter((p) => p.isSale);
  const saleItems = [...menSale, ...womenSale];

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
              Sale
            </h1>
            <p className="text-ink-500 mt-3 text-base leading-relaxed">
              Discover amazing offers on select pieces. Premium fashion
              without the price tag.
            </p>
          </div>
        </div>
      </section>

      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-ink-900 tracking-tight">
                Sale Items
              </h2>
              <p className="text-ink-500 mt-1">
                {saleItems.length} discounted {saleItems.length === 1 ? "item" : "items"}
              </p>
            </div>
          </div>
          <ProductGrid products={saleItems} />
        </div>
      </section>
    </>
  );
}
