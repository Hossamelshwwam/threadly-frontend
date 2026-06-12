"use client";

import React, { useState } from "react";
import { RiShoppingBag3Line } from "react-icons/ri";

import { useAdminOrders } from "../hooks/useAdminOrders";
import { useAdminOrdersColumns } from "../hooks/columns/useAdminOrdersColumns";
import {
  AdminOrdersFilterBar,
  type AdminOrderFiltersState,
} from "../components/admin-list/AdminOrdersFilterBar";
import type { OrdersParams } from "../types/order.types";
import CustomTable from "@/shared/components/custom-table/CustomTable";

export default function AdminOrdersListPage() {
  // Master state containing applied filters
  const [activeFilters, setActiveFilters] = useState<AdminOrderFiltersState>({
    status: "",
    paymentStatus: "",
    from: "",
    to: "",
  });

  const [page, setPage] = useState(1);
  const limit = 20;

  // Aggregate API parameters using the active (applied) filters only
  const params: OrdersParams = {
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
  const handleApplyFilters = (newFilters: AdminOrderFiltersState) => {
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
      <AdminOrdersFilterBar
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
