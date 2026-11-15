"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { useWishlistStore, useCartStore } from "@/lib/stores";
import { productById } from "@/lib/supabase";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    category: string;
    price: number;
    originalPrice?: number;
    images: string[];
    isSale: boolean;
    isNew: boolean;
    badge?: string;
  };
  showQuickView?: boolean;
}

export function ProductCard({ product, showQuickView = false }: ProductCardProps) {
  const { addToCart } = useCartStore();
  const { toggle, remove: removeFromWishlist } = useWishlistStore();
  const [wishlistOpen, setWishlistOpen] = useState(false);

  const productData = productById(product.id);

  const handleAddToCart = () => {
    if (!productData) return;
    addToCart({
      id: product.id,
      size: productData.sizes[0]?.label ?? "S",
      color: productData.colors[0]?.name ?? "White",
      qty: 1,
    });
  };

  const handleWishlist = () => {
    if (wishlistOpen) {
      removeFromWishlist(product.id);
    } else {
      useWishlistStore.getState().add(product.id);
    }
    setWishlistOpen(!wishlistOpen);
  };

  return (
    <div
      className={`group relative flex flex-col overflow-hidden rounded-2xl bg-white border border-cream-200/70 transition-all duration-300 hover:shadow-xl hover:border-cream-300 ${
        showQuickView ? "cursor-pointer" : ""
      }`}
      onClick={() => showQuickView && document.getElementById(`gallery-${product.id}`)?.scrollIntoView({ behavior: "smooth" })}
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-[4/5] bg-cream-100">
        <img
          src={product.images[0] ?? "/images/products/men/tshirt-classic-1.jpg"}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {/* Badge */}
        {(product.isSale || product.isNew || product.badge) && (
          <div className="absolute top-3 left-3 z-10">
            {product.isSale && <span className="badge sale">Sale</span>}
            {product.isNew && !product.isSale && <span className="badge newIn">New In</span>}
            {product.badge && !product.isSale && !product.isNew && (
              <span className="badge">{product.badge}</span>
            )}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <div className="flex justify-between items-start gap-2">
          <h3 className="text-sm font-semibold text-ink-900 leading-snug">
            {product.name}
          </h3>
          <button
            className="p-1.5 rounded-full hover:bg-cream-100 text-ink-500 hover:text-ink-700 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              handleWishlist();
            }}
            aria-label="Add to wishlist"
          >
            <Heart
              size={18}
              strokeWidth={2}
              fill={wishlistOpen ? "currentColor" : "none"}
              className={wishlistOpen ? "text-rose-500" : ""}
            />
          </button>
        </div>

        <div className="flex items-baseline gap-2 mt-1">
          <span className="text-base font-semibold text-ink-900">
            ${product.price}
          </span>
          {product.originalPrice && (
            <span className="text-xs text-ink-500 line-through">
              ${product.originalPrice}
            </span>
          )}
        </div>

        <div className="flex gap-2 mt-3">
          {showQuickView ? (
            <Link
              href={`/products/${product.id}`}
              className="flex-1 text-center text-sm font-medium text-white bg-black hover:bg-neutral-800 text-center px-3 py-2 rounded-full transition-colors"
            >
              View Details
            </Link>
          ) : (
            <button
              className="flex-1 text-sm font-medium text-white bg-black hover:bg-neutral-800 text-center px-3 py-2 rounded-full transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                handleAddToCart();
              }}
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
