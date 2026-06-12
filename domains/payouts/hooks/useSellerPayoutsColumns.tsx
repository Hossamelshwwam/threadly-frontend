"use client";

import { useMemo } from "react";
import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import { RiEyeLine } from "react-icons/ri";

import type { Payout } from "../types/payout.types";
import { PayoutStatusBadge } from "../components/PayoutStatusBadge";
import CustomButton from "@/shared/components/custom-button/custom-button";

export function useSellerPayoutsColumns() {
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
                <span className="text-sm font-bold text-zinc-900 block truncate">
                  {payout.orderId.orderNumber}
                </span>
              ) : (
                <span className="italic text-zinc-400 text-sm font-medium">
                  No Order
                </span>
              )}
            </div>
          );
        },
      },
      {
        accessorKey: "createdAt",
        header: "Date",
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
            </div>
          );
        },
      },
      {
        id: "financials",
        header: "Amount",
        cell: ({ row }) => {
          const { amount } = row.original;
          return (
            <div className="font-sans">
              <span className="text-sm font-bold text-zinc-900">
                EGP{" "}
                {amount.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
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
        id: "net",
        header: () => "Net Received",
        cell: ({ row }) => {
          const { netAmount } = row.original;
          return (
            <div className="font-sans">
              <span className="text-sm font-bold text-success">
                + EGP{" "}
                {netAmount.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                })}
              </span>
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
              <Link href={`/seller/payouts/${payout._id}`}>
                <CustomButton
                  variant="soft"
                  theme="neutral"
                  size="sm"
                  leftIcon={<RiEyeLine />}
                >
                  Details
                </CustomButton>
              </Link>
            </div>
          );
        },
      },
    ],
    [],
  );
}
