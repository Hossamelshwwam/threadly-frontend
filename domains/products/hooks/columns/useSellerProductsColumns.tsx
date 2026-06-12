"use client";

import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  RiEditBoxLine,
  RiDeleteBinLine,
  RiImage2Line,
  RiEyeLine,
} from "react-icons/ri";

import type { Product } from "../../types/product.types";
import CustomButton from "@/shared/components/custom-button/custom-button";
import ProductStatusBadge from "../../components/ProductStatusBadge";

// ── Hook Interface ───────────────────────────────────────────────────────────

export default function useSellerProductsColumns() {
  const columns = useMemo<ColumnDef<Product>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Product",
        cell: ({ row }) => {
          const product = row.original;
          const mainImage = product.images?.[0];

          return (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg border border-zinc-200 bg-zinc-50 overflow-hidden flex items-center justify-center shrink-0 relative">
                {mainImage ? (
                  <Image
                    src={mainImage}
                    alt={product.name}
                    width={40}
                    height={40}
                    className="object-cover"
                  />
                ) : (
                  <RiImage2Line className="text-zinc-400 text-lg" />
                )}
              </div>
              <div>
                <p className="font-semibold text-zinc-800 truncate max-w-50">
                  {product.name}
                </p>
                <p className="text-xs text-zinc-400 truncate max-w-50">
                  {(product.categoryId &&
                    typeof product.categoryId === "object" &&
                    product.categoryId.name) ||
                    "Uncategorized"}
                </p>
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: "basePrice",
        header: "Price",
        cell: ({ row }) => (
          <span className="text-sm font-medium text-zinc-700">
            ${row.original.basePrice?.toFixed(2)}
          </span>
        ),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => <ProductStatusBadge status={row.original.status} />,
      },

      {
        id: "category",
        header: "Category",
        cell: ({ row }) => {
          const cat = row.original.categoryId;
          const categoryName = typeof cat === "object" ? cat.name : "Unknown";
          return (
            <span className="text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200/40 px-2 py-1 rounded-md whitespace-nowrap">
              {categoryName}
            </span>
          );
        },
      },
      {
        id: "actions",
        header: () => <div className="text-right">Actions</div>,
        enableSorting: false,
        cell: ({ row }) => {
          const product = row.original;

          return (
            <Link href={`/seller/products/${product._id}`}>
              <CustomButton
                variant="soft"
                theme="neutral"
                size="sm"
                leftIcon={<RiEyeLine />}
              >
                View Details
              </CustomButton>
            </Link>
          );
        },
      },
    ],
    [],
  );

  return { columns };
}
