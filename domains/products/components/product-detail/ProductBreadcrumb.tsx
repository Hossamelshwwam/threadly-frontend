"use client";

import Link from "next/link";
import { RiArrowRightSLine, RiHome4Line } from "react-icons/ri";
import type { Product } from "../../types/product.types";

export function ProductBreadcrumb({ product }: { product: Product }) {
  const categoryName =
    typeof product.categoryId === "object" ? product.categoryId.name : "Shop";

  return (
    <nav className="flex items-center text-xs font-bold text-zinc-400">
      <Link
        href="/"
        className="flex items-center hover:text-amber-600 transition-colors"
      >
        <RiHome4Line size={14} className="mr-1" />
        Home
      </Link>
      <RiArrowRightSLine size={16} className="mx-1.5 text-zinc-300" />

      <Link href="/products" className="hover:text-amber-600 transition-colors">
        {categoryName}
      </Link>
      <RiArrowRightSLine size={16} className="mx-1.5 text-zinc-300" />

      <span className="text-zinc-900 truncate max-w-[200px] sm:max-w-xs">
        {product.name}
      </span>
    </nav>
  );
}
