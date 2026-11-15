import { Metadata } from "next";
import { CategoryPage } from "@/components/category-page";

export const metadata: Metadata = {
  title: "Women's Skirts | BREAKOFF",
  description: "The complete women's Skirts collection from BREAKOFF. Premium minimalist fashion.",
};

export default function WomenSkirtsPage() {
  return (
    <CategoryPage
      gender="women"
      category="Skirts"
      bannerImage="/images/products/women/skirt-pleat-1.jpg"
      bannerAlt="Women's BREAKOFF Skirts fashion campaign"
      breadcrumb="Women's Skirts"
    />
  );
}
