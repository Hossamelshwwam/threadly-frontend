"use client";

import Image from "next/image";
import { useListCategories } from "@/domains/categories/hooks/useCategories";
import { RiArrowRightLine } from "react-icons/ri";

function CategorySkeleton() {
  return (
    <section className="container mx-auto px-8 py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className={`rounded-2xl bg-zinc-100 animate-pulse ${
              i === 0
                ? "md:col-span-2 md:row-span-2 aspect-square"
                : "aspect-[4/5]"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

const categoryImages: Record<string, string> = {
  mens: "https://images.unsplash.com/photo-1617137968427-85924d1c0614?w=800&q=80",
  womens:
    "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80",
  accessories:
    "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=800&q=80",
  shoes:
    "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&q=80",
};

export function CategoryGrid() {
  const { data, isLoading } = useListCategories();

  const categories = (data?.data ?? [])
    .filter((c: any) => c.isActive)
    .slice(0, 4);

  if (isLoading) return <CategorySkeleton />;
  if (categories.length === 0) return null;

  return (
    <section className="container mx-auto px-8 py-20">
      <div className="text-center mb-14">
        <span className="text-xs font-semibold tracking-[0.25em] uppercase text-amber-500">
          Curated Collections
        </span>
        <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 mt-3 text-balance">
          Shop by Category
        </h2>
      </div>
      <div className="max-w-5xl mx-auto space-y-0 divide-y divide-zinc-100">
        {categories.slice(0, 4).map((category: any, i: number) => {
          const imgSrc = categoryImages[category.slug?.toLowerCase()] || category.image;
          const isReversed = i % 2 === 1;
          return (
            <a key={category._id} href={`/products?category=${category.slug}`}
              className="group flex flex-col sm:flex-row items-stretch py-6 sm:py-0 sm:h-48 transition-colors hover:bg-amber-50/40 -mx-8 px-8">
              <div className={`sm:w-2/5 relative overflow-hidden rounded-xl sm:rounded-2xl ${isReversed ? 'sm:order-2' : ''}`}>
                {imgSrc ? (
                  <Image src={imgSrc} alt={category.name}
                    width={400} height={300}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, 40vw" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-zinc-50">
                    <span className="text-4xl font-black text-zinc-200">{category.name?.charAt(0)}</span>
                  </div>
                )}
              </div>
              <div className={`sm:w-3/5 flex flex-col justify-center py-4 sm:py-0 sm:px-8 ${isReversed ? 'sm:order-1 sm:items-end sm:text-right' : ''}`}>
                <h3 className="text-2xl sm:text-3xl font-bold text-zinc-900 group-hover:text-amber-600 transition-colors">
                  {category.name}
                </h3>
                <p className="text-zinc-500 text-sm mt-1 line-clamp-2">
                  Discover our curated {category.name?.toLowerCase()} collection — crafted for style and comfort.
                </p>
                <span className="inline-flex items-center gap-1 text-amber-600 text-sm font-medium mt-2">
                  Explore <RiArrowRightLine size={14} />
                </span>
              </div>
            </a>
          );
        })}
      </div>
      <div className="text-center mt-10">
        <a href="/products"
          className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-zinc-900 hover:bg-zinc-800 px-8 py-3 rounded-lg transition-all duration-300">
          View All Categories <RiArrowRightLine size={16} />
        </a>
      </div>
    </section>
  );
}
