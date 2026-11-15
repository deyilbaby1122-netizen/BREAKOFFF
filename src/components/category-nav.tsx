"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CATEGORIES } from "@/lib/products";

interface CategoryNavProps {
  gender?: "men" | "women";
  onCategoryChange?: (category: string) => void;
  selectedCategory?: string;
}

export function CategoryNav({ gender = "men", selectedCategory }: CategoryNavProps) {
  const pathname = usePathname();

  const categoryList =
    gender === "men" ? CATEGORIES.men : CATEGORIES.women;

  const isSelected = (cat: string) => {
    if (!selectedCategory) return false;
    if (selectedCategory === "women" && gender === "men") return false;
    if (selectedCategory === "men" && gender === "women") return false;
    return selectedCategory === cat;
  };

  return (
    <nav className="flex flex-wrap gap-2" aria-label="Categories">
      {gender === "men" && (
        <Link
          href="/men"
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            isSelected("men")
              ? "bg-black text-white"
              : "bg-cream-100 text-ink-700 hover:bg-cream-200 hover:text-ink-900"
          }`}
        >
          Men
        </Link>
      )}
      {gender === "women" && (
        <Link
          href="/women"
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            isSelected("women")
              ? "bg-black text-white"
              : "bg-cream-100 text-ink-700 hover:bg-cream-200 hover:text-ink-900"
          }`}
        >
          Women
        </Link>
      )}
      {categoryList.map((cat) => (
        <Link
          key={cat}
          href={`/${gender === "men" ? "men" : "women"}/${cat.toLowerCase().replace(/\s+/g, "-")}`}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            isSelected(cat)
              ? "bg-black text-white"
              : "bg-cream-100 text-ink-700 hover:bg-cream-200 hover:text-ink-900"
          }`}
        >
          {cat}
        </Link>
      ))}
    </nav>
  );
}

export default CategoryNav;
