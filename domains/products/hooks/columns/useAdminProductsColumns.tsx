"use client";

import { useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import Image from "next/image";
import { RiEyeLine, RiArchiveDrawerLine, RiImageLine } from "react-icons/ri";
import { toast } from "sonner";

import CustomButton from "@/shared/components/custom-button/custom-button";
import { ConfirmationDialog } from "@/shared/components/confirmation-dialog/ConfirmationDialog";
import { Product } from "../../types/product.types";
import ProductStatusBadge from "../../components/ProductStatusBadge";

interface UseAdminProductsColumnsProps {
  isArchiving: boolean;
  onForceArchive: (id: string) => Promise<any>;
}

export default function useAdminProductsColumns({
  isArchiving,
  onForceArchive,
}: UseAdminProductsColumnsProps) {
  return useMemo<ColumnDef<Product>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Product Item",
        cell: ({ row }) => {
          const product = row.original;
          const thumbnail = product.images?.[0];

          return (
            <div className="flex items-center gap-3 font-sans">
              <div className="w-10 h-10 rounded-md bg-zinc-50 border border-zinc-200 flex items-center justify-center shrink-0 overflow-hidden relative">
                {thumbnail ? (
                  <Image
                    src={thumbnail}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <RiImageLine className="text-zinc-400 text-lg" />
                )}
              </div>
              <div>
                <p
                  className="font-semibold text-zinc-800 line-clamp-1 max-w-50"
                  title={product.name}
                >
                  {product.name}
                </p>
                <p className="text-xs font-mono text-zinc-400 mt-0.5">
                  slug: {product.slug}
                </p>
              </div>
            </div>
          );
        },
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
        id: "seller",
        header: "Seller Store",
        cell: ({ row }) => {
          const seller = row.original.sellerId;
          console.log(seller);

          const storeName =
            typeof seller === "object" && seller
              ? seller.storeName
              : "Platform Direct";
          return (
            <span className="text-sm font-medium text-zinc-600 whitespace-nowrap">
              {storeName}
            </span>
          );
        },
      },
      {
        accessorKey: "basePrice",
        header: "Base Price",
        cell: ({ row }) => (
          <span className="font-semibold text-zinc-800 whitespace-nowrap">
            EGP {row.original.basePrice.toLocaleString()}
          </span>
        ),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => <ProductStatusBadge status={row.original.status} />,
      },
      {
        id: "actions",
        header: "Actions",
        enableSorting: false,
        cell: ({ row }) => {
          const product = row.original;

          const handleArchive = () => {
            toast.promise(onForceArchive(product._id), {
              loading: "Archiving product globally...",
              success: "Product forcefully archived",
              error: (err: any) =>
                err?.response?.data?.message || "Failed to archive product",
            });
          };

          return (
            <Link href={`/admin/products/${product._id}`}>
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
    [isArchiving, onForceArchive],
  );
}
