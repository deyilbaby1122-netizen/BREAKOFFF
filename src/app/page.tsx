/**
 * page.tsx
 * BREAKOFF — Homepage.
 * Matches the reference screenshot:
 * - Hero with large male fashion model on the right
 * - BREAKOFF logo + TIMELESS CLOTHING tagline
 * - Category navigation boxes
 * - Four product cards in one row
 * - Promotional banner on the right
 */
import { Metadata } from "next";
import Link from "next/link";
import { HeroBanner } from "@/components/hero-banner";
import { CategoryNav } from "@/components/category-nav";
import { ProductCard } from "@/components/product-card";
import { CATEGORIES } from "@/lib/products";
import { getFeaturedProducts } from "@/lib/products";
import { getProductsByIds } from "@/lib/products";

export const metadata: Metadata = {
  title: "BREAKOFF — Timeless Clothing",
  description: "Premium minimalist fashion. Everyday essentials redefined.",
};

export default async function HomePage() {
  // Featured men's products for the homepage
  const menFeatured = getFeaturedProducts("men");

  return (
    <>
      {/* ===== HERO ===== */}
      <HeroBanner />

      {/* ===== CATEGORY NAVIGATION ===== */}
      <section className="py-10 bg-cream-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <Link href="/" className="text-2xl font-bold text-ink-900">
                BREAKOFF
              </Link>
              <p className="text-sm text-ink-500 font-medium">TIMELESS CLOTHING</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                { label: "Shirts", href: "/new-in" },
                { label: "Trousers", href: "/men/trousers" },
                { label: "Outerwear", href: "/men/jackets" },
                { label: "Accessories", href: "/accessories" },
                { label: "Hoodies", href: "/men/hoodies" },
                { label: "Shoes", href: "/men/shoes" },
              ].map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  className="px-5 py-2.5 bg-white text-black border border-cream-200 rounded-full text-sm font-medium hover:border-black hover:shadow-md transition-all duration-200"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== FEATURED PRODUCTS ===== */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-ink-900 tracking-tight">
                Featured
              </h2>
              <p className="text-ink-500 mt-1">
                The latest additions to the collection
              </p>
            </div>
            <Link href="/new-in" className="flex items-center gap-1 text-sm font-medium text-black hover:underline">
              View All
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M4 12 L8 4 L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>

          {/* Four product cards in one row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {menFeatured.map((product) => (
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
        </div>
      </section>

      {/* ===== PROMO BANNER ===== */}
      <section className="py-14 bg-cream-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Text */}
            <div>
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-black mb-3">
                BREAKOFF
              </p>
              <h2 className="text-4xl font-bold text-ink-900 leading-tight">
                One collection.<br />
                <span className="text-black">Endless moments.</span>
              </h2>
              <p className="text-ink-500 mt-4 max-w-md leading-relaxed">
                Discover the new essentials. Timeless pieces for everyday.
                Limited stock — shop the new arrivals now.
              </p>
              <Link href="/men" className="mt-6 flex items-center gap-2 text-black font-medium hover:underline">
                Shop Men{" "}
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M4 12 L8 4 L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </div>
            {/* Promo image */}
            <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-xl">
              <img
                src="/images/promo/promo-banner.jpg"
                alt="BREAKOFF promotional fashion image"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===== FOOTER CTA ===== */}
      <section className="py-14 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-white/60 mb-3">
            SIGN UP FOR INSIGHTS
          </p>
          <h2 className="text-3xl font-bold mb-4">
            Join the BREAKOFF community
          </h2>
          <p className="text-white/70 max-w-lg mx-auto mb-8">
            Be the first to know about new arrivals, exclusive offers, and behind-the-scenes moments.
          </p>
          <form className="max-w-md mx-auto flex gap-3" action="/">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 bg-white/10 border border-white/20 rounded-full py-3 px-5 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="bg-white text-black rounded-full px-6 py-3 font-medium hover:bg-white/90 transition-colors">
              SUBSCRIBE
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
