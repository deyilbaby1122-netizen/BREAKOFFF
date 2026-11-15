import { Metadata } from "next";
import { CategoryPage } from "@/components/category-page";

export const metadata: Metadata = {
  title: "Women's Co-ord Sets | BREAKOFF",
  description: "The complete women's Co-ord Sets collection from BREAKOFF. Premium minimalist fashion.",
};

export default function WomenCoordSetPage() {
  return (
    <CategoryPage
      gender="women"
      category="Co-ord Sets"
      bannerImage="/images/products/women/coord-set-1.jpg"
      bannerAlt="Women's BREAKOFF Co-ord Sets fashion campaign"
      breadcrumb="Women's Co-ord Sets"
    />
  );
}
