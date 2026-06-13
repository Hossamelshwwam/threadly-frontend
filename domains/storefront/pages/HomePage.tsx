"use client";

import { useState } from "react";
import { usePublicProducts } from "@/domains/products/hooks/usePublicProducts";
import { HeroSection } from "../components/sections/HeroSection";
import { CategoryGrid } from "../components/sections/CategoryGrid";
import { ProductSection } from "../components/sections/ProductSection";
import { NewsletterSection } from "../components/sections/NewsletterSection";

export default function HomePage() {
  const [wishlist, setWishlist] = useState<Set<string>>(new Set());

  const { data: featuredData, isLoading: featuredLoading } = usePublicProducts({
    limit: 8,
    sort: "rating",
  });

  const { data: newArrivalsData, isLoading: newArrivalsLoading } =
    usePublicProducts({
      limit: 8,
      sort: "newest",
    });

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const next = new Set(prev);
      if (next.has(productId)) {
        next.delete(productId);
      } else {
        next.add(productId);
      }
      return next;
    });
  };

  return (
    <div>
      <HeroSection />
      <CategoryGrid />
      <ProductSection
        title="Featured Arrivals"
        subtitle="Selected Works"
        products={featuredData?.data ?? []}
        loading={featuredLoading}
        onWishlistToggle={toggleWishlist}
        wishlistedIds={wishlist}
      />
      <ProductSection
        title="New Arrivals"
        subtitle="Fresh Drops"
        products={newArrivalsData?.data ?? []}
        loading={newArrivalsLoading}
        onWishlistToggle={toggleWishlist}
        wishlistedIds={wishlist}
      />
      <NewsletterSection />
    </div>
  );
}
