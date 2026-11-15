"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Search,
  Heart,
  ShoppingBag,
  User,
  Menu,
  X,
} from "@/components/icons";
import { useCartStore, useWishlistStore } from "@/lib/stores";
import { PRODUCTS } from "@/lib/products";

export function Navbar() {
  const pathname = usePathname();
  const { items, removeFromCart } = useCartStore();
  const { wishlist } = useWishlistStore();
  const searchRef = useRef<HTMLInputElement>(null);

  // Close mobile menu & search on route change
  useEffect(() => {
    setMobileOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  // Auto-focus search on mobile
  useEffect(() => {
    if (searchOpen && window.innerWidth < 768 && searchRef.current) {
      const timer = setTimeout(() => searchRef.current?.focus(), 100);
      return () => clearTimeout(timer);
    }
  }, [searchOpen]);

  const doSearch = (query: string) => {
    const q = query.toLowerCase().trim();
    return PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q)
    ).slice(0, 8);
  };

  const openResult = (id: string) => {
    setSearchOpen(false);
    window.location.href = `/products/${id}`;
  };

  const navLinks = [
    { label: "New In", href: "/new-in", icon: Search },
    { label: "Men", href: "/men", icon: User },
    { label: "Women", href: "/women", icon: ShoppingBag },
    { label: "Essentials", href: "/essentials", icon: Heart },
    { label: "Sale", href: "/sale", icon: Menu },
    { label: "Accessories", href: "/accessories", icon: X },
  ] as const;

  // Scroll effect for navbar shadow
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || searchOpen || mobileOpen
          ? "bg-cream-50/95 backdrop-blur-md shadow-sm border-b border-cream-200/60"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-3xl font-bold tracking-tight text-black">
              BREAKOFF
            </span>
            <span className="text-lg font-normal text-ink-500 hidden sm:block">
              TIMELESS CLOTHING
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
            {navLinks.map(({ label, href, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  pathname === href
                    ? "bg-black text-white"
                    : "text-ink-700 hover:bg-cream-100 hover:text-ink-900"
                }`}
              >
                <Icon size={16} strokeWidth={2} />
                {label}
                {href === "/new-in" && (
                  <span className="ml-1 text-[10px] font-semibold text-white bg-black px-1.5 py-0.5 rounded-full">
                    new
                  </span>
                )}
              </Link>
            ))}
          </nav>

          {/* Right side: search, icons, cart, account, mobile toggle */}
          <div className="flex items-center gap-2">
            {/* Search */}
            <div className="relative">
              <button
                type="button"
                className="p-2 rounded-full text-ink-600 hover:bg-cream-100 transition-colors"
                onClick={() => {
                  setSearchOpen((v) => !v);
                  setSearchQuery("");
                }}
                aria-label="Open search"
              >
                <Search size={20} strokeWidth={2} />
              </button>
              {searchOpen && (
                <>
                  <div
                    className="fixed inset-0 z-30"
                    onClick={() => setSearchOpen(false)}
                  />
                  <div className="absolute right-0 top-full mt-2 w-96 max-w-[92vw] bg-white rounded-2xl shadow-2xl border border-cream-200 overflow-hidden">
                    <div className="flex items-center border-b border-cream-100 px-4 py-3">
                      <input
                        ref={searchRef}
                        className="w-full bg-transparent border-none outline-none text-base placeholder:text-ink-400"
                        placeholder="Search products, categories..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Escape") setSearchOpen(false);
                          if (e.key === "Enter" && searchResults.length > 0) {
                            openResult(searchResults[0].id);
                          }
                        }}
                      />
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                      {searchQuery.trim() === "" ? (
                        <div className="px-4 py-6 text-sm text-ink-500 text-center">
                          Search for products or categories
                        </div>
                      ) : searchResults.length === 0 ? (
                        <div className="px-4 py-6 text-sm text-ink-500 text-center">
                          No results found for &quot;{searchQuery}&quot;
                        </div>
                      ) : (
                        <ul className="divide-y divide-cream-100">
                          {searchResults.map((r) => (
                            <li key={r.id}>
                              <button
                                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-cream-50 transition-colors text-left"
                                onClick={() => openResult(r.id)}
                              >
                                <img
                                  src={r.images[0] ?? "/images/products/men/tshirt-classic-1.jpg"}
                                  alt={r.name}
                                  className="w-12 h-12 object-cover rounded-lg"
                                />
                                <div className="min-w-0">
                                  <p className="text-sm font-medium text-ink-900 truncate">
                                    {r.name}
                                  </p>
                                  <p className="text-xs text-ink-500">
                                    {r.category} ·{" "}
                                    <span className="font-medium text-ink-900">
                                      ${r.price}
                                    </span>
                                  </p>
                                </div>
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Cart */}
            <Link
              href="/cart"
              className="relative p-2 rounded-full text-ink-600 hover:bg-cream-100 transition-colors"
              aria-label="Open cart"
            >
              <ShoppingBag size={20} strokeWidth={2} />
              {items.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-black text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {items.reduce((a, i) => a + i.qty, 0)}
                </span>
              )}
            </Link>

            {/* Wishlist */}
            <Link
              href="/wishlist"
              className="p-2 rounded-full text-ink-600 hover:bg-cream-100 transition-colors relative"
              aria-label="Open wishlist"
            >
              <Heart size={20} strokeWidth={2} />
              {wishlist.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-black text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Account */}
            <Link
              href="/account"
              className="p-2 rounded-full text-ink-600 hover:bg-cream-100 transition-colors"
              aria-label="Open account"
            >
              <User size={20} strokeWidth={2} />
            </Link>

            {/* Mobile menu toggle */}
            <button
              className="lg:hidden p-2 rounded-full text-ink-600 hover:bg-cream-100 transition-colors"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle navigation menu"
            >
              {mobileOpen ? <X size={20} strokeWidth={2} /> : <Menu size={20} strokeWidth={2} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="lg:hidden bg-cream-50/98 backdrop-blur-md border-t border-cream-200/60 px-4 pb-6 pt-2">
          <div className="flex flex-col gap-1">
            {navLinks.map(({ label, href, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-2 px-3 py-3 rounded-xl text-sm font-medium transition-colors ${
                  pathname === href
                    ? "bg-black text-white"
                    : "text-ink-700 hover:bg-cream-100"
                }`}
                onClick={() => setMobileOpen(false)}
              >
                <Icon size={18} strokeWidth={2} />
                {label}
                {href === "/new-in" && (
                  <span className="ml-auto text-[10px] font-semibold text-white bg-black px-1.5 py-0.5 rounded-full">
                    new
                  </span>
                )}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
