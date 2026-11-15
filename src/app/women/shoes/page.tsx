import { Metadata } from "next";
import { CategoryPage } from "@/components/category-page";

export const metadata: Metadata = {
  title: "Women's Shoes | BREAKOFF",
  description: "The complete women's Shoes collection from BREAKOFF. Premium minimalist fashion.",
};

export default function WomenShoesPage() {
  return (
    <CategoryPage
      gender="women"
      category="Shoes"
      bannerImage="/images/products/women/shoe-heel-1.jpg"
      bannerAlt="Women's BREAKOFF Shoes fashion campaign"
      breadcrumb="Women's Shoes"
    />
  );
}
