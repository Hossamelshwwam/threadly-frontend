"use client";

import React, { useState } from "react";
import { RiShoppingBag3Line, RiListCheck } from "react-icons/ri";

import { useAdminOrders } from "../hooks/useAdminOrders";
import { useAdminOrdersColumns } from "../hooks/useAdminOrdersColumns";
import {
  OrdersFilterBar,
  type OrderFiltersState,
} from "../components/OrdersFilterBar";
import type { AdminOrdersParams } from "../types/order.types";
import CustomTable from "@/shared/components/custom-table/CustomTable";

export default function AdminOrdersListPage() {
  // Master state containing applied filters
  const [activeFilters, setActiveFilters] = useState<OrderFiltersState>({
    status: "",
    paymentStatus: "",
    from: "",
    to: "",
  });

  const [page, setPage] = useState(1);
  const limit = 20;

  // Aggregate API parameters using the active (applied) filters only
  const params: AdminOrdersParams = {
    status: activeFilters.status || undefined,
    paymentStatus: activeFilters.paymentStatus || undefined,
    from: activeFilters.from || undefined,
    to: activeFilters.to || undefined,
    page,
    limit,
  };

  // Fetch data cleanly
  const { data: listData, isLoading } = useAdminOrders(params);

  const orders = listData?.data ?? [];
  const pagination = listData?.pagination;
  const columns = useAdminOrdersColumns();

  // Handlers for the Action Buttons inside the Filter Bar
  const handleApplyFilters = (newFilters: OrderFiltersState) => {
    setActiveFilters(newFilters);
    setPage(1); // Always reset pagination on a fresh query
  };

  const handleClearFilters = () => {
    setActiveFilters({ status: "", paymentStatus: "", from: "", to: "" });
    setPage(1);
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Draft-State Filter Parameters Bar */}
      <OrdersFilterBar
        initialFilters={activeFilters}
        onApply={handleApplyFilters}
        onReset={handleClearFilters}
      />

      {/* Data Grid & Pagination Module */}
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
          <RiShoppingBag3Line className="text-5xl text-zinc-300 mx-auto" />
        }
        emptyStateTitle="No matching orders found"
        emptyStateDescription="Try adjusting your date range or status filters."
        onClearFilters={handleClearFilters}
        title="Transaction Ledger List"
      />
    </div>
  );
}
