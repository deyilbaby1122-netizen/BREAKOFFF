import { Metadata } from "next";
import { CategoryPage } from "@/components/category-page";

export const metadata: Metadata = {
  title: "Men's T-Shirts | BREAKOFF",
  description: "The complete men's T-Shirts collection from BREAKOFF. Premium minimalist fashion.",
};

export default function MenTShirtsPage() {
  return (
    <CategoryPage
      gender="men"
      category="T-Shirts"
      bannerImage="/images/products/men/tshirt-classic-1.jpg"
      bannerAlt="Men's BREAKOFF T-Shirts fashion campaign"
      breadcrumb="Men's T-Shirts"
    />
  );
}
