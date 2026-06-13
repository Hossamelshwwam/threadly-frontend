import type { Product } from "@/domains/products/types/product.types";
import { ProductCard } from "../../../products/components/ProductCard";
import { RiArrowRightLine } from "react-icons/ri";

interface ProductSectionProps {
  title: string;
  subtitle?: string;
  products: Product[];
  loading?: boolean;
  onWishlistToggle?: (productId: string) => void;
  wishlistedIds?: Set<string>;
}

function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-2xl overflow-hidden shadow-sm border border-zinc-100"
        >
          <div className="aspect-[4/5] bg-zinc-100 animate-pulse" />
          <div className="p-4 pt-3 space-y-2">
            <div className="h-4 w-3/4 bg-zinc-100 animate-pulse" />
            <div className="flex items-center justify-between">
              <div className="h-6 w-24 bg-amber-200 animate-pulse" />
              <div className="h-5 w-12 bg-amber-100 animate-pulse rounded-full" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function ProductSection({
  title,
  subtitle,
  products,
  loading,
  onWishlistToggle,
  wishlistedIds,
}: ProductSectionProps) {
  return (
    <section className="container mx-auto px-8 py-20">
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
        <div className="w-full lg:w-2/5 lg:sticky lg:top-32 lg:self-start">
          <span className="text-sm font-semibold text-amber-500">
            {subtitle || "Collection"}
          </span>
          <h2 className="text-5xl lg:text-6xl font-bold text-zinc-900 mt-4 text-balance leading-[1.05]">
            {title}
          </h2>
          <p className="text-zinc-500 mt-4 text-base leading-relaxed max-w-sm">
            Curated with care, designed to last. Each piece tells its own story.
          </p>
          <a
            href="/products"
            className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-white transition-all duration-300 hover:scale-[1.02]"
            style={{ background: "#d99a4a" }}
          >
            View All Products <RiArrowRightLine size={16} />
          </a>
        </div>
        <div className="w-full lg:w-3/5">
          {loading ? (
            <ProductGridSkeleton />
          ) : products.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-zinc-400 text-lg">
                No products available yet.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {products.slice(0, 4).map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  onWishlistToggle={onWishlistToggle}
                  isWishlisted={wishlistedIds?.has(product._id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="mt-12 text-center md:hidden">
        <a
          href="/products"
          className="inline-flex items-center gap-2 text-sm font-medium text-amber-600 transition-colors"
        >
          View All <RiArrowRightLine size={16} />
        </a>
      </div>
    </section>
  );
}
