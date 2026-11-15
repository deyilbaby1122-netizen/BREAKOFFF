import { Metadata } from "next";
import { CategoryPage } from "@/components/category-page";

export const metadata: Metadata = {
  title: "Women's Hoodies | BREAKOFF",
  description: "The complete women's Hoodies collection from BREAKOFF. Premium minimalist fashion.",
};

export default function WomenHoodiesPage() {
  return (
    <CategoryPage
      gender="women"
      category="Hoodies"
      bannerImage="/images/products/women/hoodie-hoodie-1.jpg"
      bannerAlt="Women's BREAKOFF Hoodies fashion campaign"
      breadcrumb="Women's Hoodies"
    />
  );
}
