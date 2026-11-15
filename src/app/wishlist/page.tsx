/**
 * wishlist/page.tsx
 * BREAKOFF — Wishlist page.
 * - View saved products
 * - Move products to cart
 * - Persist saved items
 */
import { Metadata } from "next";
import { Heart } from "@/components/icons";
import { useWishlistStore } from "@/lib/stores";
import { productById } from "@/lib/supabase";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Wishlist | BREAKOFF",
  description: "Your saved wishlist. Browse and add items to your cart.",
};

export default function WishlistPage() {
  const { items: wishlist, moveToCart, clear } = useWishlistStore();

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
              Wishlist
            </h1>
            <p className="text-ink-500 mt-3 text-base leading-relaxed">
              {wishlist.length} {wishlist.length === 1 ? "item" : "items"} saved.
              Tap &quot;Move to Cart&quot; to start shopping.
            </p>
          </div>
        </div>
      </section>

      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {wishlist.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-cream-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart size={32} color="#6b6b6b" />
              </div>
              <h2 className="text-2xl font-bold text-ink-900 mb-2">
                Your wishlist is empty
              </h2>
              <p className="text-ink-500 mb-6">
                Save items you love and we&apos;ll remind you when they&apos;re back.
              </p>
              <Button variant="secondary" className="!text-base !px-6" asChild>
                <a href="/">Browse Products</a>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlist.map((id) => {
                const product = productById(id);
                if (!product) return null;
                return (
                  <div
                    key={id}
                    className="rounded-2xl border border-cream-200 bg-white overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div className="aspect-[4/5] overflow-hidden bg-cream-100">
                      <img
                        src={product.images[0] ?? "/images/products/men/tshirt-classic-1.jpg"}
                        alt={product.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-sm font-semibold text-ink-900 truncate">
                        {product.name}
                      </h3>
                      <p className="text-xs text-ink-500 mt-1">{product.category}</p>
                      <div className="flex items-baseline gap-2 mt-2">
                        <span className="text-lg font-bold text-ink-900">
                          ${product.price}
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          className="!text-sm !px-3 !py-1.5 !rounded-full"
                          onClick={() => moveToCart(id, "S", "White")}
                        >
                          Move to Cart
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
