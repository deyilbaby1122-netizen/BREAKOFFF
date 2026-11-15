import { Metadata } from "next";
import { CategoryPage } from "@/components/category-page";

export const metadata: Metadata = {
  title: "Women's Jeans | BREAKOFF",
  description: "The complete women's Jeans collection from BREAKOFF. Premium minimalist fashion.",
};

export default function WomenJeansPage() {
  return (
    <CategoryPage
      gender="women"
      category="Jeans"
      bannerImage="/images/products/women/jeans-high-1.jpg"
      bannerAlt="Women's BREAKOFF Jeans fashion campaign"
      breadcrumb="Women's Jeans"
    />
  );
}
