import { Metadata } from "next";
import { CategoryPage } from "@/components/category-page";

export const metadata: Metadata = {
  title: "Men's Trousers | BREAKOFF",
  description: "The complete men's Trousers collection from BREAKOFF. Premium minimalist fashion.",
};

export default function MenTrousersPage() {
  return (
    <CategoryPage
      gender="men"
      category="Trousers"
      bannerImage="/images/products/men/trouser-slim-1.jpg"
      bannerAlt="Men's BREAKOFF Trousers fashion campaign"
      breadcrumb="Men's Trousers"
    />
  );
}
