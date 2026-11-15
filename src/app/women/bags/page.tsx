import { Metadata } from "next";
import { CategoryPage } from "@/components/category-page";

export const metadata: Metadata = {
  title: "Women's Bags | BREAKOFF",
  description: "The complete women's Bags collection from BREAKOFF. Premium minimalist fashion.",
};

export default function WomenBagsPage() {
  return (
    <CategoryPage
      gender="women"
      category="Bags"
      bannerImage="/images/products/women/bag-mini-1.jpg"
      bannerAlt="Women's BREAKOFF Bags fashion campaign"
      breadcrumb="Women's Bags"
    />
  );
}
