import { Metadata } from "next";
import { CategoryPage } from "@/components/category-page";

export const metadata: Metadata = {
  title: "Men's Shirts | BREAKOFF",
  description: "The complete men's Shirts collection from BREAKOFF. Premium minimalist fashion.",
};

export default function Men() {
  return (
    <CategoryPage
      gender="men"
      category="Shirts"
      bannerImage="/images/products/men/shirt-slim-1.jpg"
      bannerAlt="Men's BREAKOFF Shirts fashion campaign"
      breadcrumb="Men's Shirts"
    />
  );
}
