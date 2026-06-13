"use client";

import Link from "next/link";
import Image from "next/image";
import {
  RiHeartLine,
  RiHeartFill,
  RiShoppingBagLine,
  RiStore2Line,
} from "react-icons/ri";
import type { Product } from "@/domains/products/types/product.types";

interface ProductCardProps {
  product: Product;
  onWishlistToggle?: (productId: string) => void;
  isWishlisted?: boolean;
}

export function ProductCard({
  product,
  onWishlistToggle,
  isWishlisted,
}: ProductCardProps) {
  // Safely extract populated fields based on the types
  const categoryName =
    typeof product.categoryId === "object" ? product.categoryId.name : null;
  const storeName =
    typeof product.sellerId === "object" && product.sellerId !== null
      ? product.sellerId.storeName
      : null;

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl bg-white border border-zinc-200 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-amber-400/50 hover:shadow-lg hover:shadow-amber-100">
      {/* 1. Image Section */}
      <Link
        href={`/products/${product.slug || product._id}`}
        className="relative aspect-square overflow-hidden bg-zinc-100"
      >
        {product.images?.[0] ? (
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <RiShoppingBagLine className="text-4xl text-zinc-400" />
          </div>
        )}

        {/* Top-Left Badges Overlay - Using light frost effect */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {categoryName && (
            <span className="bg-white/80 backdrop-blur-md text-zinc-900 text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-md shadow-sm border border-zinc-100">
              {categoryName}
            </span>
          )}
        </div>
      </Link>

      {/* Wishlist Action Button - Light theme version */}
      {onWishlistToggle && (
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onWishlistToggle(product._id);
          }}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          className="absolute top-3 right-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/70 backdrop-blur-md text-zinc-600 transition-all border border-zinc-200 hover:border-amber-500 hover:bg-amber-500 hover:text-white"
        >
          {isWishlisted ? (
            <RiHeartFill
              size={18}
              className="text-amber-500 group-hover:text-white"
            />
          ) : (
            <RiHeartLine size={18} />
          )}
        </button>
      )}

      {/* 2. Content Section - Light theme */}
      <Link
        href={`/products/${product.slug || product._id}`}
        className="flex flex-col flex-1 p-4 bg-white"
      >
        {/* Store/Seller Name */}
        {storeName && (
          <div className="flex items-center gap-1.5 text-zinc-600 mb-2">
            <RiStore2Line size={14} className="text-amber-600" />
            <span className="text-xs font-medium truncate">{storeName}</span>
          </div>
        )}

        {/* Product Title - Darker text for readability */}
        <h3 className="text-sm font-bold text-zinc-950 leading-snug line-clamp-2 mb-3 group-hover:text-amber-700 transition-colors">
          {product.name}
        </h3>

        {/* Price & Action Row - Accent colors updated */}
        <div className="mt-auto flex items-end justify-between pt-3 border-t border-zinc-100">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-0.5">
              Price
            </span>
            <p className="text-lg font-black text-amber-600 leading-none">
              EGP {product.basePrice.toLocaleString()}
            </p>
          </div>

          {/* Visual indicator - Light background, icon turns white on hover */}
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-100 text-zinc-700 transition-colors group-hover:bg-amber-500 group-hover:text-white">
            <RiShoppingBagLine size={16} />
          </div>
        </div>
      </Link>
    </div>
  );
}
