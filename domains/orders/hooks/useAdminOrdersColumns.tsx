"use client";

import { useMemo } from "react";
import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import { RiEyeLine } from "react-icons/ri";

import type { Order } from "../types/order.types";
import {
  OrderStatusBadge,
  PaymentStatusBadge,
} from "../components/list/OrderStatusBadge";
import CustomButton from "@/shared/components/custom-button/custom-button";

export function useAdminOrdersColumns() {
  return useMemo<ColumnDef<Order>[]>(
    () => [
      {
        accessorKey: "orderNumber",
        header: "Order Spec Code",
        cell: ({ row }) => {
          const order = row.original;
          return (
            <div className="font-sans">
              <span className="font-mono text-xs font-bold text-zinc-800 block">
                {order.orderNumber}
              </span>
            </div>
          );
        },
      },
      {
        accessorKey: "buyerId",
        header: "Buyer Consumer Profile",
        cell: ({ row }) => {
          const order = row.original;
          return (
            <div className="font-sans">
              <span className="text-sm font-bold text-zinc-900 block truncate max-w-[160px]">
                {order.shippingAddress.fullName || order.buyerId.name}
              </span>
              <span
                className="text-xs text-zinc-400 block truncate max-w-[160px]"
                title={order.buyerId.email}
              >
                {order.buyerId.email}
              </span>
            </div>
          );
        },
      },
      {
        accessorKey: "createdAt",
        header: "Logged Timestamp",
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
        header: "Fulfillment State",
        cell: ({ row }) => <OrderStatusBadge status={row.original.status} />,
      },
      {
        accessorKey: "paymentStatus",
        header: "Payment Settlement",
        cell: ({ row }) => {
          const order = row.original;
          return (
            <div className="flex flex-col items-start gap-1 font-sans">
              <PaymentStatusBadge status={order.paymentStatus} />
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest whitespace-nowrap">
                {order.paymentMethod.replace(/_/g, " ")}
              </span>
            </div>
          );
        },
      },
      {
        accessorKey: "total",
        header: "Financial Gross Total",
        cell: ({ row }) => {
          const order = row.original;
          return (
            <div className="font-sans pr-4">
              <span className="text-sm font-extrabold text-zinc-900 block">
                EGP{" "}
                {order.total.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
              {order.subtotal !== order.total && (
                <span className="text-[10px] font-medium text-zinc-400 block line-through">
                  EGP {order.subtotal.toLocaleString()}
                </span>
              )}
            </div>
          );
        },
      },
      {
        id: "actions",
        header: "Actions",
        enableSorting: false,
        cell: ({ row }) => {
          const order = row.original;
          return (
            <div className="flex items-center pr-2">
              <Link href={`/admin/orders/${order._id}`}>
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
