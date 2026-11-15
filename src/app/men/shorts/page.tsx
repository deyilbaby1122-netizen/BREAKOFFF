import { Metadata } from "next";
import { CategoryPage } from "@/components/category-page";

export const metadata: Metadata = {
  title: "Men's Shorts | BREAKOFF",
  description: "The complete men's Shorts collection from BREAKOFF. Premium minimalist fashion.",
};

export default function MenShortsPage() {
  return (
    <CategoryPage
      gender="men"
      category="Shorts"
      bannerImage="/images/products/men/shorts-look-1.jpg"
      bannerAlt="Men's BREAKOFF Shorts fashion campaign"
      breadcrumb="Men's Shorts"
    />
  );
}
