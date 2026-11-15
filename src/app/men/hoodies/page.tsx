import { Metadata } from "next";
import { CategoryPage } from "@/components/category-page";

export const metadata: Metadata = {
  title: "Men's Hoodies | BREAKOFF",
  description: "The complete men's Hoodies collection from BREAKOFF. Premium minimalist fashion.",
};

export default function MenHoodiesPage() {
  return (
    <CategoryPage
      gender="men"
      category="Hoodies"
      bannerImage="/images/products/men/hoodie-hooded-1.jpg"
      bannerAlt="Men's BREAKOFF Hoodies fashion campaign"
      breadcrumb="Men's Hoodies"
    />
  );
}
