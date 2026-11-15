import { Metadata } from "next";
import { CategoryPage } from "@/components/category-page";

export const metadata: Metadata = {
  title: "Women's Jackets | BREAKOFF",
  description: "The complete women's Jackets collection from BREAKOFF. Premium minimalist fashion.",
};

export default function WomenJacketsPage() {
  return (
    <CategoryPage
      gender="women"
      category="Jackets"
      bannerImage="/images/products/woman/jacket-leather-1.jpg"
      bannerAlt="Women's BREAKOFF Jackets fashion campaign"
      breadcrumb="Women's Jackets"
    />
  );
}
