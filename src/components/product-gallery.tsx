/** 
 * product-gallery.tsx — BREAKOFF product gallery component.
 * Simplified for Turbopack/Next.js 16 compatibility.
 */
"use client";

import { useState } from "react";
import Image from "next/image";
import { ShoppingBag } from "@/components/icons";
import { useCartStore } from "@/lib/stores";
import { productById } from "@/lib/supabase";
import { PRODUCTS } from "@/lib/products";

interface ProductGalleryProps {
  productId: string;
  size?: string;
  color?: string;
  quantity?: number;
  onSizeChange?: (size: string) => void;
  onColorChange?: (color: string) => void;
  onQuantityChange?: (qty: number) => void;
}

export function ProductGallery({
  productId,
  size,
  color,
  quantity = 1,
  onSizeChange,
  onColorChange,
  onQuantityChange,
}: ProductGalleryProps) {
  const product = productById(productId);
  const [showSize, setShowSize] = useState(false);
  const [showColor, setShowColor] = useState(false);
  const [currentQty] = useState(quantity);
  const [currentSize, setCurrentSize] = useState(size ?? "");
  const [currentColor, setCurrentColor] = useState(color ?? "");

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <p className="text-lg text-ink-500">Product not found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="aspect-[4/5] bg-cream-100 rounded-2xl overflow-hidden relative">
        {product.images.length > 0 ? (
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <p className="text-2xl text-ink-400">No images</p>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-5">
        <div>
          <h1 className="text-2xl font-bold text-ink-900 leading-tight">
            {product.name}
          </h1>
          <p className="text-sm text-ink-500 flex items-center gap-1 mt-1">
            {product.category} · {product.brand}
          </p>
        </div>

        <div className="flex items-baseline gap-3">
          <span className="text-3xl font-bold text-ink-900">${product.price}</span>
          {product.originalPrice && (
            <>
              <span className="text-sm text-ink-500 line-through">${product.originalPrice}</span>
              <span className="text-xs font-semibold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full">
                SAVE {Math.round((1 - product.price / product.originalPrice) * 100)}%
              </span>
            </>
          )}
        </div>

        <p className="text-sm text-ink-700 leading-relaxed">{product.description}</p>

        {product.stock > 0 ? (
          <p className="text-sm text-emerald-600 font-medium flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />In Stock ({product.stock} available)</p>
        ) : (
          <p className="text-sm text-ink-500 font-medium">Out of Stock</p>
        )}

        <div className="flex-1">
          <span
            className="text-sm font-medium text-ink-700 flex items-center gap-1.5 mb-2"
            onClick={() => setShowSize(!showSize)}
          >
            Size
          </span>
          {showSize && (
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s.label}
                  className="min-w-[36px] h-10 rounded-full border-2 text-sm font-medium transition-colors"
                  style={{
                    border: currentSize === s.label ? "black solid" : s.available ? "cream-300 solid" : "cream-200 solid",
                    color: currentSize === s.label ? "white" : s.available ? "ink-700" : "ink-400",
                  }}
                  onClick={() => {
                    if (s.available) {
                      setCurrentSize(s.label);
                      setShowSize(false);
                      onSizeChange?.(s.label);
                    }
                  }}
                  disabled={!s.available}
                >
                  {s.label}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex-1">
          <span
            className="text-sm font-medium text-ink-700 flex items-center gap-1.5 mb-2"
            onClick={() => setShowColor(!showColor)}
          >
            Color
          </span>
          {showColor && (
            <div className="flex flex-wrap gap-3">
              {product.colors.map((c) => (
                <button
                  key={c.name}
                  className="w-8 h-8 rounded-full border-2 transition-transform hover:scale-110"
                  style={{ backgroundColor: c.hex }}
                  onClick={() => {
                    setCurrentColor(c.name);
                    setShowColor(false);
                    onColorChange?.(c.name);
                  }}
                  aria-label={`Select color ${c.name}`}
                />
              ))}
            </div>
          )}
        </div>

        <button
          className="w-full flex items-center justify-center gap-2 text-white bg-black hover:bg-neutral-800 text-sm font-medium py-3 rounded-full transition-all hover:scale-[1.01] active:scale-[0.99]"
          onClick={() => useCartStore.getState().addToCart({ id: product.id, size: currentSize || product.sizes[0].label, color: color || product.colors[0].name, qty: currentQty })}
        >
          <ShoppingBag size={18} />Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductGallery;