import { Metadata } from "next";
import { CategoryPage } from "@/components/category-page";

export const metadata: Metadata = {
  title: "Men's Jeans | BREAKOFF",
  description: "The complete men's Jeans collection from BREAKOFF. Premium minimalist fashion.",
};

export default function MenJeansPage() {
  return (
    <CategoryPage
      gender="men"
      category="Jeans"
      bannerImage="/images/products/men/jeans-slim-1.jpg"
      bannerAlt="Men's BREAKOFF Jeans fashion campaign"
      breadcrumb="Men's Jeans"
    />
  );
}
