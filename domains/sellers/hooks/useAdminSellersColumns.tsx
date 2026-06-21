"use client";

import { useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import Image from "next/image";
import { RiEyeLine, RiStoreLine } from "react-icons/ri";

import type { SellerProfile } from "../types/seller.types";
import CustomButton from "@/shared/components/custom-button/custom-button";

import SellerStatusBadge from "../components/SellerStatusBadge";

export default function useAdminSellersColumns() {
  return useMemo<ColumnDef<SellerProfile>[]>(
    () => [
      {
        accessorKey: "storeName",
        header: "Store",
        cell: ({ row }) => {
          const seller = row.original;
          return (
            <div className="flex items-center gap-3 font-sans">
              <div className="w-9 h-9 rounded-md bg-amber-50 border border-amber-100 flex items-center justify-center shrink-0 overflow-hidden relative">
                {seller.logo ? (
                  <Image
                    src={seller.logo}
                    alt={seller.storeName}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <RiStoreLine className="text-amber-500 text-base" />
                )}
              </div>
              <div>
                <p className="font-semibold text-zinc-800">
                  {seller.storeName}
                </p>
                <p className="text-xs text-zinc-400">
                  {seller.userId?.name ?? "Unknown Seller"}
                </p>
              </div>
            </div>
          );
        },
      },
      {
        id: "email",
        header: "Owner Email",
        cell: ({ row }) => (
          <span className="text-sm font-normal text-zinc-600">
            {row.original.userId?.email ?? "—"}
          </span>
        ),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => <SellerStatusBadge status={row.original.status} />,
      },
      {
        accessorKey: "createdAt",
        header: "Registered",
        cell: ({ row }) => (
          <span className="text-zinc-400 text-xs whitespace-nowrap">
            {new Date(row.original.createdAt).toLocaleDateString("en-EG", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </span>
        ),
      },
      {
        id: "actions",
        header: "Actions",
        enableSorting: false,
        cell: ({ row }) => {
          const seller = row.original;

          return (
            <Link href={`/admin/sellers/${seller._id}`}>
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
}
