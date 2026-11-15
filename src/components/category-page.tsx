"use client";

import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductGrid } from "@/components/product-grid";
import { CATEGORIES } from "@/lib/products";
import { PRODUCTS } from "@/lib/products";
import { getFeaturedProducts } from "@/lib/products";

interface CategoryPageProps {
  gender: "men" | "women";
  category: string;
  bannerImage: string;
  bannerAlt: string;
  breadcrumb: string;
}

export function CategoryPage({
  gender,
  category,
  bannerImage,
  bannerAlt,
  breadcrumb,
}: CategoryPageProps) {
  const categoryProducts = PRODUCTS.filter((p) => p.category === category);

  // Compute the title and description for metadata
  const genderTitle = gender === "men" ? "Men" : "Women";
  const metaTitle = `${breadcrumb} | BREAKOFF`;
  const metaDesc =
    `The complete ${breadcrumb} from BREAKOFF. Premium minimalist fashion for ${gender === "men" ? "men" : "women"}.`;

  return (
    <>
      {/* Page hero with banner */}
      <section
        className="relative py-14 overflow-hidden bg-cream-50"
        style={{ backgroundImage: `url(${bannerImage})` }}
      >
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-white mb-3">
              BREAKOFF
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight">
              {breadcrumb}
            </h1>
            <p className="text-white/80 mt-3 text-base leading-relaxed max-w-xl">
              {metaDesc}
            </p>
          </div>
        </div>
      </section>

      {/* Category navigation */}
      <section className="py-8 bg-white border-b border-cream-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2">
            <Link
              href={`/${gender}`}
              className="px-4 py-2 rounded-full text-sm font-medium bg-black text-white"
            >
              {genderTitle}
            </Link>
            <Link
              href={`/${gender}/${category.toLowerCase().replace(/\s+/g, "-")}`}
              className="px-4 py-2 rounded-full text-sm font-medium text-ink-700 hover:bg-cream-100 hover:text-ink-900 transition-colors"
            >
              {category}
            </Link>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="py-14 bg-cream-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-ink-900 tracking-tight">
                {category} {gender === "men" ? "for Him" : "for Her"}
              </h2>
              <p className="text-ink-500 mt-1">
                {categoryProducts.length} {categoryProducts.length === 1 ? "item" : "items"}
              </p>
            </div>
          </div>

          {categoryProducts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-2xl text-ink-700 font-bold">No products in this category</p>
              <p className="text-ink-500 mt-2">Check back soon for new arrivals</p>
            </div>
          ) : (
            <ProductGrid products={categoryProducts} gender={gender} category={category} />
          )}
        </div>
      </section>
    </>
  );
}
