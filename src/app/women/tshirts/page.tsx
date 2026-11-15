import { Metadata } from "next";
import { CategoryPage } from "@/components/category-page";

export const metadata: Metadata = {
  title: "Women's T-Shirts | BREAKOFF",
  description: "The complete women's T-Shirts collection from BREAKOFF. Premium minimalist fashion.",
};

export default function WomenTShirtsPage() {
  return (
    <CategoryPage
      gender="women"
      category="T-Shirts"
      bannerImage="/images/products/women/tshirt-ennie-1.jpg"
      bannerAlt="Women's BREAKOFF T-Shirts fashion campaign"
      breadcrumb="Women's T-Shirts"
    />
  );
}
