"use client";

import { useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import Image from "next/image";
import { RiEyeLine, RiInboxArchiveLine } from "react-icons/ri";

import CustomButton from "@/shared/components/custom-button/custom-button";
import { OrderItem } from "../../types/order.types";
import {
  OrderItemStatusBadge,
  OrderStatusBadge,
} from "../../components/OrderStatusBadge";

export default function useSellerOrdersColumns() {
  const columns = useMemo<ColumnDef<OrderItem>[]>(
    () => [
      {
        id: "product",
        header: "Item Details",
        cell: ({ row }) => {
          const item = row.original;
          const product = item.productId;

          return (
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 relative rounded-md overflow-hidden bg-zinc-100 border border-zinc-200 shrink-0">
                {product?.images?.[0] ? (
                  <Image
                    src={product.images[0]}
                    alt="Product"
                    width={40}
                    height={40}
                    className="object-cover"
                  />
                ) : (
                  <RiInboxArchiveLine className="absolute inset-0 m-auto text-zinc-300" />
                )}
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-zinc-900 truncate max-w-[200px]">
                  {product?.name || item.productName || "Unknown Product"}
                </span>
                {/* FIX 1: Use size and color instead of the non-existent sku */}
                <div className="flex items-center gap-1.5 text-xs text-zinc-500 mt-0.5">
                  <span className="font-semibold">{item.size}</span>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <span
                      style={{ backgroundColor: item.color }}
                      className="w-2.5 h-2.5 rounded-full border border-black/10 block"
                    />
                    <span>{item.color}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        },
      },
      {
        id: "orderInfo",
        header: "Order Reference",
        cell: ({ row }) => {
          const item = row.original;

          // FIX 2: Safely extract orderId whether it is a string or a populated object
          const orderIdString =
            typeof item.orderId === "object"
              ? (item.orderId as any)._id
              : item.orderId;

          return (
            <span className="text-xs font-mono font-bold text-zinc-700 bg-zinc-100 px-1.5 py-0.5 rounded w-fit">
              #{orderIdString ? orderIdString.slice(-8).toUpperCase() : "N/A"}
            </span>
          );
        },
      },
      {
        id: "financials",
        header: "Qty & Total",
        cell: ({ row }) => {
          const item = row.original;

          return (
            <div className="flex flex-col">
              <span className="text-sm font-bold text-zinc-900">
                {/* FIX 3: Directly use item.total from the backend */}
                EGP {item.total.toLocaleString()}
              </span>
              <span className="text-xs text-zinc-500 font-medium">
                {item.quantity}x @ EGP {item.unitPrice.toLocaleString()}
              </span>
            </div>
          );
        },
      },
      {
        accessorKey: "status",
        header: "Fulfillment Status",
        cell: ({ row }) => (
          <OrderItemStatusBadge status={row.original.status} />
        ),
      },
      {
        id: "actions",
        header: "actions",
        cell: ({ row }) => (
          <div className="flex">
            <Link href={`/seller/orders/${row.original._id}`}>
              <CustomButton
                variant="soft"
                theme="neutral"
                size="sm"
                leftIcon={<RiEyeLine />}
              >
                View Details
              </CustomButton>
            </Link>
          </div>
        ),
      },
    ],
    [],
  );

  return { columns };
}
