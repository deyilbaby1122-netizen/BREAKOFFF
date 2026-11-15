import { Metadata } from "next";
import { CategoryPage } from "@/components/category-page";

export const metadata: Metadata = {
  title: "Men's Accessories | BREAKOFF",
  description: "The complete men's Accessories collection from BREAKOFF. Premium minimalist fashion.",
};

export default function MenAccessoriesPage() {
  return (
    <CategoryPage
      gender="men"
      category="Accessories"
      bannerImage="/images/products/men/accessory-watch-1.jpg"
      bannerAlt="Men's BREAKOFF Accessories fashion campaign"
      breadcrumb="Men's Accessories"
    />
  );
}
