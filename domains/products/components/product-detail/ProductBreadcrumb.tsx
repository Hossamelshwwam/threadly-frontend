import Link from "next/link";
import type { Product } from "@/domains/products/types/product.types";

interface ProductBreadcrumbProps {
  product: Product;
}

export function ProductBreadcrumb({ product }: ProductBreadcrumbProps) {
  return (
    <nav className="flex items-center gap-2 text-xs text-zinc-400 mb-8">
      <Link href="/" className="hover:text-amber-600 transition-colors">
        Home
      </Link>
      <span>/</span>
      <Link href="/products" className="hover:text-amber-600 transition-colors">
        Products
      </Link>
      {typeof product.categoryId === "object" && (
        <>
          <span>/</span>
          <span className="text-zinc-600">
            {product.categoryId.name}
          </span>
        </>
      )}
      <span>/</span>
      <span className="text-zinc-800 truncate max-w-[200px]">
        {product.name}
      </span>
    </nav>
  );
}
