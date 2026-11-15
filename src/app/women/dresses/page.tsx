import { Metadata } from "next";
import { CategoryPage } from "@/components/category-page";

export const metadata: Metadata = {
  title: "Women's Dresses | BREAKOFF",
  description: "The complete women's Dresses collection from BREAKOFF. Premium minimalist fashion.",
};

export default function WomenDressesPage() {
  return (
    <CategoryPage
      gender="women"
      category="Dresses"
      bannerImage="/images/products/women/dress-pleat-1.jpg"
      bannerAlt="Women's BREAKOFF Dresses fashion campaign"
      breadcrumb="Women's Dresses"
    />
  );
}
