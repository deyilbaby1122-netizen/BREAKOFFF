import { Metadata } from "next";
import { CategoryPage } from "@/components/category-page";

export const metadata: Metadata = {
  title: "Men's Shoes | BREAKOFF",
  description: "The complete men's Shoes collection from BREAKOFF. Premium minimalist fashion.",
};

export default function MenShoesPage() {
  return (
    <CategoryPage
      gender="men"
      category="Shoes"
      bannerImage="/images/products/men/shoe-sneaker-1.jpg"
      bannerAlt="Men's BREAKOFF Shoes fashion campaign"
      breadcrumb="Men's Shoes"
    />
  );
}
