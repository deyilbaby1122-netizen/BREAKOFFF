import { Metadata } from "next";
import { CategoryPage } from "@/components/category-page";

export const metadata: Metadata = {
  title: "Women's Tops | BREAKOFF",
  description: "The complete women's Tops collection from BREAKOFF. Premium minimalist fashion.",
};

export default function WomenTopsPage() {
  return (
    <CategoryPage
      gender="women"
      category="Tops"
      bannerImage="/images/products/women/top-knit-1.jpg"
      bannerAlt="Women's BREAKOFF Tops fashion campaign"
      breadcrumb="Women's Tops"
    />
  );
}
