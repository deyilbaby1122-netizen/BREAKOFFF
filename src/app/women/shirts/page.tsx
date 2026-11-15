import { Metadata } from "next";
import { CategoryPage } from "@/components/category-page";

export const metadata: Metadata = {
  title: "Women's Shirts | BREAKOFF",
  description: "The complete women's Shirts collection from BREAKOFF. Premium minimalist fashion.",
};

export default function WomenShirtsPage() {
  return (
    <CategoryPage
      gender="women"
      category="Shirts"
      bannerImage="/images/products/women/shirt-batik-1.jpg"
      bannerAlt="Women's BREAKOFF Shirts fashion campaign"
      breadcrumb="Women's Shirts"
    />
  );
}
