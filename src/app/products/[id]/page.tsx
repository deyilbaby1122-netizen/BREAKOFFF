/**
 * products/[id]/page.tsx
 * BREAKOFF — Product Details page.
 * - Large image gallery with navigation
 * - Multiple product images
 * - Product name, price, description
 * - Size selection
 * - Color selection
 * - Quantity selector
 * - Size guide
 * - Stock availability
 * - Add to Cart
 * - Add to Wishlist
 * - Related products
 */
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductGallery } from "@/components/product-gallery";
import { useCartStore } from "@/lib/stores";
import { productById } from "@/lib/supabase";
import { getProductsByIds } from "@/lib/products";

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = productById(id);

  if (!product) {
    notFound();
  }

  // Find related products (same category, different products)
  const relatedIds = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== id
  ).map((p) => p.id);

  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-cream-50 py-6 border-b border-cream-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm">
            <a href="/" className="text-ink-500 hover:text-ink-900">
              Home
            </a>
            <span className="text-ink-300">/</span>
            <a href={`/${product.category === "Accessories" ? "accessories" : "men"}`} className="text-ink-500 hover:text-ink-900">
              {product.id.startsWith("men") ? "Men" : "Women"}
            </a>
            <span className="text-ink-300">/</span>
            <span className="text-ink-700 font-medium">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Gallery */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProductGallery
          productId={product.id}
          size={product.sizes[0]?.label ?? "S"}
          color={product.colors[0]?.name ?? "White"}
          quantity={1}
        />
      </div>
    </>
  );
}
