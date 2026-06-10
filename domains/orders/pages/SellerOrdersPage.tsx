// domains/orders/pages/SellerOrdersPage.tsx
"use client";

import React, { useEffect, useState } from "react";
import { RiInboxArchiveLine } from "react-icons/ri";

import CustomTable from "@/shared/components/custom-table/CustomTable";
import { useSellerOrders } from "../hooks/useSellerOrders";
import useSellerOrdersColumns from "../hooks/columns/useSellerOrdersColumns";
import {
  SellerOrdersFilterBar,
  SellerOrderFiltersState,
} from "../components/seller-list/SellerOrdersFilterBar";
import type { OrdersItemsParams } from "../types/order.types";

export default function SellerOrdersPage() {
  const [filters, setFilters] = useState<SellerOrderFiltersState>({
    status: "",
    from: "",
    to: "",
  });

  const [page, setPage] = useState(1);
  const limit = 10;

  const params: OrdersItemsParams = {
    status: filters.status || undefined,
    from: filters.from || undefined,
    to: filters.to || undefined,
    page,
    limit,
  };

  const { data, isLoading } = useSellerOrders(params);
  const { columns } = useSellerOrdersColumns();

  const orders = data?.data || [];
  const pagination = data?.pagination;

  const handleApplyFilters = (newFilters: SellerOrderFiltersState) => {
    setFilters(newFilters);
    setPage(1);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 font-sans pb-12">
      {/* Merchant Style Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-extrabold text-zinc-900 tracking-tight">
              Customer Orders
            </h1>
            {!isLoading && pagination?.total !== undefined && (
              <span className="bg-blue-50 text-blue-700 text-xs font-black px-3 py-1 rounded-lg border border-blue-200/50 shadow-sm">
                {pagination.total.toLocaleString()} Items
              </span>
            )}
          </div>
          <p className="text-sm text-zinc-500 mt-1.5 font-medium">
            Manage fulfillments, update shipping statuses, and track deliveries.
          </p>
        </div>
      </div>

      <SellerOrdersFilterBar
        filters={filters}
        onFiltersChange={handleApplyFilters}
      />

      <div className="bg-white border border-zinc-100 rounded-2xl shadow-sm overflow-hidden">
        <CustomTable
          columns={columns}
          data={orders}
          isLoading={isLoading}
          page={page}
          limit={limit}
          totalPages={pagination?.pages}
          totalItems={pagination?.total}
          onPageChange={(newPage) => setPage(newPage)}
          emptyStateIcon={
            <RiInboxArchiveLine className="text-6xl text-zinc-300 mx-auto" />
          }
          emptyStateTitle="No orders found"
          emptyStateDescription="You don't have any customer orders matching this criteria."
        />
      </div>
    </div>
  );
}
