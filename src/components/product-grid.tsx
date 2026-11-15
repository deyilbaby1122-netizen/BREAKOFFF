"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Sliders, SortAsc, Filter } from "@/components/icons";
import { ProductCard } from "@/components/product-card";
import { fetchProducts, type QueryOptions } from "@/lib/supabase";
import type { Product } from "@/lib/products";

interface ProductGridProps {
  products?: Product[];
  gender?: "men" | "women";
  category?: string;
}

export function ProductGrid({ products: overrideProducts, gender = "men", category }: ProductGridProps) {
  const router = useRouter();
  const [selectedSort, setSelectedSort] = useState<string>("featured");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [showOnlyInStock, setShowOnlyInStock] = useState(false);
  const [showSale, setShowSale] = useState(false);
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);
  const pageSize = 8;

  // Determine product source: override (server data) or fetch (client-side)
  const { data, isLoading } = useMemo(() => {
    if (overrideProducts && overrideProducts.length > 0) {
      return {
        data: overrideProducts,
        total: overrideProducts.length,
        isLoading: false,
      };
    }
    return { data: [], total: 0, isLoading: false };
  }, [overrideProducts]);

  // Apply client-side filters
  const filteredProducts = useMemo(() => {
    let list = overrideProducts ?? data;

    if (selectedCategory && selectedCategory !== "women" && selectedCategory !== "men") {
      list = list.filter((p: Product) => p.category === selectedCategory);
    }
    if (selectedColor) {
      list = list.filter((p: Product) =>
        p.colors.some((c) => c.name === selectedColor)
      );
    }
    if (selectedSize) {
      list = list.filter((p: Product) =>
        p.sizes.some((s) => s.label === selectedSize)
      );
    }
    if (showOnlyInStock) {
      list = list.filter((p: Product) => p.stock > 0);
    }
    if (showSale) {
      list = list.filter((p: Product) => p.isSale);
    }

    // Sorting
    switch (selectedSort) {
      case "price-asc":
        list = [...list].sort((a: Product, b: Product) => a.price - b.price);
        break;
      case "price-desc":
        list = [...list].sort((a: Product, b: Product) => b.price - a.price);
        break;
      case "newest":
        list = [...list].sort((a: Product, b: Product) =>
          b.isNew ? 1 : a.isNew ? -1 : 0
        );
        break;
      case "name":
        list = [...list].sort((a: Product, b: Product) =>
          a.name.localeCompare(b.name)
        );
        break;
      default:
        list = [...list].sort((a: Product, b: Product) =>
          (b.sortOrder ?? 0) - (a.sortOrder ?? 0)
        );
    }

    return list;
  }, [overrideProducts, data, selectedCategory, selectedColor, selectedSize, showOnlyInStock, showSale, selectedSort]);

  // Pagination
  const [paginatedProducts, setPaginatedProducts] = useState<typeof filteredProducts>([]);
  const [totalPages, setTotalPages] = useState(1);

  useState(() => {
    if (filteredProducts.length > 0) {
      const total = filteredProducts.length;
      setTotalPages(Math.ceil(total / pageSize));
      const start = (page - 1) * pageSize;
      setPaginatedProducts(filteredProducts.slice(start, start + pageSize));
    }
  });

  const loadMore = () => {
    const next = Math.min(page + 1, totalPages);
    if (next > page) {
      setPage(next);
    }
  };

  const resetFilters = () => {
    setSelectedCategory("");
    setSelectedColor("");
    setSelectedSize("");
    setShowOnlyInStock(false);
    setShowSale(false);
    setSelectedSort("featured");
    setPage(1);
  };

  // Load products client-side when not in override mode
  useState(() => {
    if (!overrideProducts || overrideProducts.length === 0) {
      fetchProducts({
        page: 1,
        pageSize: 100,
        sortBy: "sortOrder",
        order: "asc",
      }).then((res) => {
        if (res.data) {
          setTotalItems(res.total);
          setPaginatedProducts(res.data);
        }
      });
    }
  });

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSort(e.target.value);
    setPage(1);
  };

  const filters = {
    category: selectedCategory,
    color: selectedColor,
    size: selectedSize,
    inStock: showOnlyInStock ? "true" : undefined,
    onSale: showSale ? "true" : undefined,
  };

  return (
    <div>
      {/* Filters bar */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        {/* Category filter */}
        <select
          className="bg-white border border-cream-200 rounded-full px-4 py-2 text-sm text-ink-700 focus:outline-none focus:ring-2 focus:ring-black/20 appearance-none cursor-pointer"
          value={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(e.target.value);
            setPage(1);
          }}
          aria-label="Filter by category"
        >
          <option value="">All Categories</option>
          {(gender === "men" ? CATEGORIES.men : CATEGORIES.women).map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        {/* Color filter */}
        <select
          className="bg-white border border-cream-200 rounded-full px-4 py-2 text-sm text-ink-700 focus:outline-none focus:ring-2 focus:ring-black/20 appearance-none cursor-pointer"
          value={selectedColor}
          onChange={(e) => {
            setSelectedColor(e.target.value);
            setPage(1);
          }}
          aria-label="Filter by color"
        >
          <option value="">All Colors</option>
          {data?.length ? (
            Array.from(new Set(data.map((p: Product) => p.colors.map((c) => c.name)))).map((color) => (
              <option key={color} value={color}>{color}</option>
            ))
          ) : (
            <option value="">All Colors</option>
          )}
        </select>

        {/* Size filter */}
        <select
          className="bg-white border border-cream-200 rounded-full px-4 py-2 text-sm text-ink-700 focus:outline-none focus:ring-2 focus:ring-black/20 appearance-none cursor-pointer"
          value={selectedSize}
          onChange={(e) => {
            setSelectedSize(e.target.value);
            setPage(1);
          }}
          aria-label="Filter by size"
        >
          <option value="">All Sizes</option>
          {data?.length ? (
            Array.from(new Set(data.flatMap((p: Product) => p.sizes.map((s) => s.label)))).map((size) => (
              <option key={size} value={size}>{size}</option>
            ))
          ) : (
            <option value="">All Sizes</option>
          )}
        </select>

        {/* In stock toggle */}
        <button
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            showOnlyInStock
              ? "bg-black text-white"
              : "bg-cream-100 text-ink-700 hover:bg-cream-200"
          }`}
          onClick={() => {
            setShowOnlyInStock((v) => !v);
            setPage(1);
          }}
        >
          In Stock Only
        </button>

        {/* Sale toggle */}
        <button
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            showSale
              ? "bg-black text-white"
              : "bg-cream-100 text-ink-700 hover:bg-cream-200"
          }`}
          onClick={() => {
            setShowSale((v) => !v);
            setPage(1);
          }}
        >
          Sale Only
        </button>

        <div className="ml-auto flex items-center gap-2">
          {/* Sort */}
          <div className="relative">
            <select
              className="bg-cream-100 border border-cream-200 rounded-full px-4 py-2 text-sm text-ink-700 focus:outline-none focus:ring-2 focus:ring-black/20 appearance-none cursor-pointer pr-8"
              value={selectedSort}
              onChange={handleSortChange}
              aria-label="Sort products"
            >
              <option value="featured">Featured</option>
              <option value="newest">Newest</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name">Name: A-Z</option>
            </select>
            <SortAsc size={14} color="#6b6b6b" />
          </div>
        </div>
      </div>

      {/* Product grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="skeleton aspect-[4/5]" />
          ))}
        </div>
      ) : paginatedProducts.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-2xl font-bold text-ink-700 mb-2">No Products Found</p>
          <p className="text-ink-500">Try adjusting your filters</p>
          <button
            className="mt-4 text-sm font-medium text-black hover:underline"
            onClick={resetFilters}
          >
            Reset all filters
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {paginatedProducts.map((product: Product, index: number) => (
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

          {/* Load more */}
          {page < totalPages && (
            <div className="text-center mt-8">
              <button
                className="flex items-center gap-2 text-sm font-medium text-black hover:text-ink-900"
                onClick={loadMore}
              >
                Load More
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M4 12 L8 4 L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default ProductGrid;
