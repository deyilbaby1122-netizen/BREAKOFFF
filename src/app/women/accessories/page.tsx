import { Metadata } from "next";
import { CategoryPage } from "@/components/category-page";

export const metadata: Metadata = {
  title: "Women's Accessories | BREAKOFF",
  description: "The complete women's Accessories collection from BREAKOFF. Premium minimalist fashion.",
};

export default function WomenAccessoriesPage() {
  return (
    <CategoryPage
      gender="women"
      category="Accessories"
      bannerImage="/images/products/women/accessory-scarf-1.jpg"
      bannerAlt="Women's BREAKOFF Accessories fashion campaign"
      breadcrumb="Women's Accessories"
    />
  );
}
