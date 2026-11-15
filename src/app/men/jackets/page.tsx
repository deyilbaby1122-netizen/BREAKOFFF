import { Metadata } from "next";
import { CategoryPage } from "@/components/category-page";

export const metadata: Metadata = {
  title: "Men's Jackets | BREAKOFF",
  description: "The complete men's Jackets collection from BREAKOFF. Premium minimalist fashion.",
};

export default function MenJacketsPage() {
  return (
    <CategoryPage
      gender="men"
      category="Jackets"
      bannerImage="/images/products/men/jacket-canvas-1.jpg"
      bannerAlt="Men's BREAKOFF Jackets fashion campaign"
      breadcrumb="Men's Jackets"
    />
  );
}
