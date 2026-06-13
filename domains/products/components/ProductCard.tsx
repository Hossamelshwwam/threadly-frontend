"use client";

import Link from "next/link";
import Image from "next/image";
import { RiHeartLine, RiHeartFill, RiShoppingBagLine } from "react-icons/ri";
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
  return (
    <Link href={`/products/${product.slug || product._id}`}>
      <div className="group relative rounded-2xl overflow-hidden bg-zinc-900 shadow-sm hover:shadow-xl transition-all duration-500 hover:scale-[1.02]">
        <div className="relative aspect-[4/5] overflow-hidden">
          {product.images?.[0] ? (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover transition-all duration-700 group-hover:scale-110"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-zinc-800">
              <RiShoppingBagLine className="text-3xl text-zinc-600" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/20 to-transparent" />
          {onWishlistToggle && (
            <button
              onClick={(e) => {
                e.preventDefault();
                onWishlistToggle(product._id);
              }}
              aria-label={
                isWishlisted ? "Remove from wishlist" : "Add to wishlist"
              }
              className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white/15 backdrop-blur-md hover:bg-amber-500 shadow-sm transition-all z-10 flex items-center justify-center"
            >
              {isWishlisted ? (
                <RiHeartFill size={16} className="text-white" />
              ) : (
                <RiHeartLine
                  size={16}
                  className="text-white/80 hover:text-white transition-colors"
                />
              )}
            </button>
          )}
          {typeof product.categoryId === "object" && (
            <span className="absolute top-3 left-3 bg-amber-500 text-white text-[10px] font-bold tracking-wider uppercase px-3 py-1.5 rounded-lg shadow-sm">
              {product.categoryId.name}
            </span>
          )}
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <h3 className="text-lg font-bold text-white leading-snug line-clamp-2">
              {product.name}
            </h3>
            <div className="flex items-center justify-between mt-2">
              <p className="text-xl font-black text-amber-400">
                EGP {product.basePrice.toLocaleString()}
              </p>
              <span className="flex items-center gap-1.5 text-[11px] font-semibold text-amber-300 bg-amber-500/15 px-3 py-1 rounded-full backdrop-blur-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                New
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
