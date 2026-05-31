"use client";

import Link from "next/link";
import { RiArrowRightLine, RiShoppingBag3Line } from "react-icons/ri";
import type { Order } from "@/domains/orders/types/order.types";
import CustomTable from "@/shared/components/custom-table/CustomTable";
import { useRecentOrdersColumns } from "@/shared/hooks/useRecentOrdersColumns";

interface RecentOrdersWidgetProps {
  orders: Order[];
  loading?: boolean;
}

export function RecentOrdersWidget({
  orders,
  loading = false,
}: RecentOrdersWidgetProps) {
  const { columns } = useRecentOrdersColumns();

  return (
    <CustomTable
      columns={columns}
      data={orders}
      isLoading={loading}
      emptyStateIcon={
        <RiShoppingBag3Line className="text-5xl text-zinc-300 mx-auto" />
      }
      emptyStateTitle="No recent orders"
      emptyStateDescription="Platform orders summary will appear here"
      href="/admin/orders"
      title="Recent Orders"
    />
  );
}
