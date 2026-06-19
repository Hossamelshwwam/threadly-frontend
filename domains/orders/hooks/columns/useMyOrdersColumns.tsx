import { useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { RiEyeLine } from "react-icons/ri";

import { OrderStatusBadge } from "../../components/OrderStatusBadge";
import CustomButton from "@/shared/components/custom-button/custom-button";

export default function useMyOrdersColumns() {
  const columns = useMemo<ColumnDef<any>[]>(
    () => [
      {
        accessorKey: "_id",
        header: "Order ID",
        cell: ({ row }) => (
          <span className="font-mono font-bold text-sm text-zinc-800">
            #{row.original._id.slice(-8).toUpperCase()}
          </span>
        ),
      },
      {
        accessorKey: "createdAt",
        header: "Date Placed",
        cell: ({ row }) => (
          <span className="text-sm font-medium text-zinc-600">
            {new Date(row.original.createdAt).toLocaleDateString("en-EG", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </span>
        ),
      },
      {
        accessorKey: "itemCount",
        header: "Items",
        cell: ({ row }) => (
          <span className="text-sm font-medium text-zinc-600">
            {row.original.itemCount}{" "}
            {row.original.itemCount === 1 ? "item" : "items"}
          </span>
        ),
      },
      {
        accessorKey: "total",
        header: "Total Amount",
        cell: ({ row }) => (
          <span className="text-sm font-bold text-zinc-900">
            EGP {row.original.total.toLocaleString()}
          </span>
        ),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => <OrderStatusBadge status={row.original.status} />,
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <Link href={`/account/orders/${row.original._id}`}>
            <CustomButton
              variant="soft"
              theme="neutral"
              size="sm"
              leftIcon={<RiEyeLine />}
            >
              View Details
            </CustomButton>
          </Link>
        ),
      },
    ],
    [],
  );

  return { columns };
}
