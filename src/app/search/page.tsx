/**
 * search/page.tsx
 * BREAKOFF — Search Results page.
 * - Global search with instant suggestions
 * - Display matching products with images
 * - Clicking a result opens the product
 * - No-results message
 */
import { Metadata } from "next";
import Link from "next/link";
import { Search, X, ArrowRight } from "@/components/icons";
import { ProductCard } from "@/components/product-card";
import { PRODUCTS } from "@/lib/products";

export const metadata: Metadata = {
  title: "Search Results | BREAKOFF",
  description: "Search results for your query on BREAKOFF.",
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = (q ?? "").trim();

  // Filter products by query across name, category, brand
  const matches =
    query.length > 0
      ? PRODUCTS.filter(
          (p) =>
            p.name.toLowerCase().includes(query.toLowerCase()) ||
            p.category.toLowerCase().includes(query.toLowerCase()) ||
            p.brand.toLowerCase().includes(query.toLowerCase())
        )
      : [];

  return (
    <>
      {/* Hero */}
      <section className="py-14 bg-cream-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-black mb-3">
              BREAKOFF
            </p>
            <h1 className="text-4xl font-bold text-ink-900 tracking-tight">
              Search Results
            </h1>
            <p className="text-ink-500 mt-3 text-base">
              {query ? (
                `${matches.length} result${matches.length !== 1 ? "s" : ""} for &quot;${query}&quot;`
              ) : (
                "Search for products, categories, and more."
              )}
            </p>
          </div>
        </div>
      </section>

      {/* Search bar */}
      <section className="py-6 bg-white border-b border-cream-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <form
            action="/search"
            className="relative"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <div className="relative">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-400"
                size={20}
              />
              <input
                type="text"
                name="q"
                placeholder="Search products, categories..."
                className="w-full pl-12 pr-4 py-3 border border-cream-200 rounded-full text-sm bg-cream-50 focus:outline-none focus:ring-2 focus:ring-black/20"
                defaultValue={query}
              />
              {query && (
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-400 hover:text-ink-700"
                  onClick={() => {
                    window.location.href = "/search";
                  }}
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </form>
        </div>
      </section>

      {/* Results */}
      <section className="py-14 bg-cream-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {query === "" ? (
            <div className="text-center py-16">
              <p className="text-2xl text-ink-700 font-bold mb-2">Search results</p>
              <p className="text-ink-500">Enter a keyword, category, or product name</p>
            </div>
          ) : matches.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-cream-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search size={28} color="#6b6b6b" />
              </div>
              <h2 className="text-2xl font-bold text-ink-900 mb-2">No results found</h2>
              <p className="text-ink-500 mb-6">
                We couldn&apos;t find anything matching &quot;{query}&quot;.
              </p>
              <Link href="/" className="text-sm font-medium text-black hover:underline">
                Go back to the homepage
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {matches.map((product) => (
                <ProductCard
                  key={product.id}
                  product={{
                    id: product.id,
                    name: product.name,
                    category: product.category,
                    price: product.price,
                    originalPrice: product.originalPrice,
                    images: product.images,
                    isSale: product.isSale,
                    isNew: product.isNew,
                    badge: product.badge,
                  }}
                  showQuickView
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
