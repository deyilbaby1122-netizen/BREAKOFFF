/**
 * accessories/page.tsx
 * BREAKOFF — Accessories page.
 * - Bags, caps, belts, wallets, sunglasses
 * - Product grid with sorting
 */
import { Metadata } from "next";
import { ProductGrid } from "@/components/product-grid";
import { getFeaturedProducts } from "@/lib/products";

export const metadata: Metadata = {
  title: "Accessories | BREAKOFF",
  description: "Accessories from BREAKOFF. Bags, caps, belts, wallets, and more.",
};

export default async function AccessoriesPage() {
  // Accessories across both genders
  const allAccessories = getFeaturedProducts("men").filter((p) => p.category === "Accessories");
  const menAcc = getFeaturedProducts("men").filter((p) => p.category === "Accessories");
  const womenAcc = getFeaturedProducts("women").filter((p) => p.category === "Accessories");
  const accessories = [...menAcc, ...womenAcc];

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
              Accessories
            </h1>
            <p className="text-ink-500 mt-3 text-base leading-relaxed">
              The finishing touch. Bags, caps, belts, wallets, and sunglasses
              that elevate every look.
            </p>
          </div>
        </div>
      </section>

      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-ink-900 tracking-tight">
                Shop Accessories
              </h2>
              <p className="text-ink-500 mt-1">
                {accessories.length} accessories
              </p>
            </div>
          </div>
          <ProductGrid products={accessories} />
        </div>
      </section>
    </>
  );
}
