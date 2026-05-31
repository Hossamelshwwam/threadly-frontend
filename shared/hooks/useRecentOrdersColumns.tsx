"use client";

import { useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { cn } from "@/shared/lib";
import type { Order } from "@/domains/orders/types/order.types";

const statusConfig: Record<string, { label: string; className: string }> = {
  pending: {
    label: "Pending",
    className: "bg-amber-50 text-amber-700 border-amber-200",
  },
  confirmed: {
    label: "Confirmed",
    className: "bg-blue-50 text-blue-700 border-blue-200",
  },
  processing: {
    label: "Processing",
    className: "bg-zinc-100 text-zinc-700 border-zinc-200",
  },
  shipped: {
    label: "Shipped",
    className: "bg-purple-50 text-purple-700 border-purple-200",
  },
  delivered: {
    label: "Delivered",
    className: "bg-green-50 text-green-700 border-green-200",
  },
  cancelled: {
    label: "Cancelled",
    className: "bg-red-50 text-red-700 border-red-200",
  },
};

export function useRecentOrdersColumns() {
  const columns = useMemo<ColumnDef<Order>[]>(
    () => [
      {
        accessorKey: "_id",
        header: "Order ID",
        cell: ({ row }) => {
          const id = row.original._id;
          return (
            <Link
              href={`/admin/orders/${id}`}
              className="font-600 text-zinc-700 hover:text-main transition-colors font-mono text-xs"
            >
              #{id.slice(-6).toUpperCase()}
            </Link>
          );
        },
      },
      {
        id: "buyer",
        header: "Buyer",
        cell: ({ row }) => {
          const buyer = row.original.buyerId;
          return (
            <div>
              <p className="font-500 text-zinc-800">{buyer?.name ?? "—"}</p>
              <p className="text-xs text-zinc-400">{buyer?.email ?? ""}</p>
            </div>
          );
        },
      },
      {
        accessorKey: "total",
        header: "Amount",
        cell: ({ row }) => {
          const total = row.original.total;
          return (
            <span className="font-600 text-zinc-800">
              EGP {total.toLocaleString()}
            </span>
          );
        },
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
          const statusVal = row.original.status;
          const status = statusConfig[statusVal] ?? {
            label: statusVal,
            className: "bg-zinc-100 text-zinc-600 border-zinc-200",
          };
          return (
            <span
              className={cn(
                "inline-flex items-center px-2 py-0.5 rounded-md text-xs font-600 border capitalize",
                status.className,
              )}
            >
              {status.label}
            </span>
          );
        },
      },
      {
        accessorKey: "createdAt",
        header: "Date",
        cell: ({ row }) => {
          const dateStr = row.original.createdAt;
          return (
            <span className="text-zinc-400 text-xs whitespace-nowrap">
              {new Date(dateStr).toLocaleDateString("en-EG", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </span>
          );
        },
      },
    ],
    [],
  );

  return { columns };
}
