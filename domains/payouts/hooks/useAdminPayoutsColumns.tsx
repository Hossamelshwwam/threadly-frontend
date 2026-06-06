"use client";

import { useMemo } from "react";
import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import { RiEyeLine } from "react-icons/ri";

import type { Payout } from "../types/payout.types";
import { PayoutStatusBadge } from "../components/PayoutStatusBadge";
import CustomButton from "@/shared/components/custom-button/custom-button";

export function useAdminPayoutsColumns() {
  return useMemo<ColumnDef<Payout>[]>(
    () => [
      {
        id: "order",
        header: "Source Order",
        cell: ({ row }) => {
          const payout = row.original;
          return (
            <div className="font-sans">
              {payout.orderId ? (
                <Link
                  href={`/admin/orders/${payout.orderId._id}`}
                  className="text-sm font-bold text-main hover:text-main-warm hover:underline block truncate"
                >
                  {payout.orderId.orderNumber}
                </Link>
              ) : (
                <span className="italic text-zinc-400 text-sm font-medium">
                  No Order Attached
                </span>
              )}
            </div>
          );
        },
      },
      {
        accessorKey: "sellerId",
        header: "Seller / Vendor",
        cell: ({ row }) => {
          const seller = row.original.sellerId;
          return (
            <div className="font-sans flex items-center h-full">
              <span className="text-sm font-bold text-zinc-900 block truncate max-w-[160px]">
                {seller.storeName}
              </span>
            </div>
          );
        },
      },
      {
        accessorKey: "createdAt",
        header: "Requested Date",
        cell: ({ row }) => {
          const date = new Date(row.original.createdAt);
          return (
            <div className="font-sans text-xs text-zinc-500 whitespace-nowrap">
              <span className="block font-medium">
                {date.toLocaleDateString("en-EG", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </span>
              <span className="block text-[10px] text-zinc-400 mt-0.5">
                {date.toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          );
        },
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => <PayoutStatusBadge status={row.original.status} />,
      },
      {
        id: "financials",
        header: () => <div className="text-right">Settlement Breakdown</div>,
        cell: ({ row }) => {
          const { amount, platformFee, netAmount } = row.original;
          return (
            <div className="font-sans flex flex-col gap-1 w-full">
              <span className="text-sm font-bold text-success block">
                + EGP{" "}
                {netAmount.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                })}
              </span>
              <div className="text-[10px] font-medium text-zinc-400 flex items-center gap-1.5">
                <span>Gross: {amount.toLocaleString()}</span>
                <span className="text-zinc-300">•</span>
                <span className="text-error font-semibold">
                  Fee: -{platformFee.toLocaleString()}
                </span>
              </div>
            </div>
          );
        },
      },
      {
        id: "actions",
        header: "actions",
        enableSorting: false,
        cell: ({ row }) => {
          const payout = row.original;
          return (
            <div className="flex items-center">
              <Link href={`/admin/payouts/${payout._id}`}>
                <CustomButton
                  variant="outline"
                  theme="neutral"
                  size="sm"
                  className="h-8 gap-1.5 text-xs font-bold"
                  leftIcon={<RiEyeLine size={14} />}
                  iconOnly
                />
              </Link>
            </div>
          );
        },
      },
    ],
    [],
  );
}
