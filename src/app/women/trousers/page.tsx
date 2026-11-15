import { Metadata } from "next";
import { CategoryPage } from "@/components/category-page";

export const metadata: Metadata = {
  title: "Women's Trousers | BREAKOFF",
  description: "The complete women's Trousers collection from BREAKOFF. Premium minimalist fashion.",
};

export default function WomenTrousersPage() {
  return (
    <CategoryPage
      gender="women"
      category="Trousers"
      bannerImage="/images/products/women/trouser-tailor-1.jpg"
      bannerAlt="Women's BREAKOFF Trousers fashion campaign"
      breadcrumb="Women's Trousers"
    />
  );
}
