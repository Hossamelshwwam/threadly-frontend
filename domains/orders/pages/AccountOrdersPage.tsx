"use client";

import React, { useState } from "react";
import { RiShoppingBag3Line } from "react-icons/ri";

import CustomTable from "@/shared/components/custom-table/CustomTable";
import { useMyOrders } from "../hooks/useMyOrders";
import useMyOrdersColumns from "../hooks/columns/useMyOrdersColumns";
import { OrdersParams } from "../types/order.types";
import { BuyerOrdersFilterBar } from "../components/buyer/BuyerOrdersFilterBar";

export default function AccountOrdersPage() {
  const [page, setPage] = useState(1);
  const limit = 10;

  const [filters, setFilters] = useState<Omit<OrdersParams, "page" | "limit">>({
    status: "",
    paymentStatus: "",
    from: "",
    to: "",
  });

  // Combine pagination and filters for the API call
  const params: OrdersParams = {
    page,
    limit,
    ...filters,
  };

  const { data: response, isLoading } = useMyOrders(params);
  const { columns } = useMyOrdersColumns();

  const orders = response?.data || [];
  const pagination = response?.pagination;

  const handleFiltersChange = (newFilters: any) => {
    setFilters(newFilters);
    setPage(1);
  };

  return (
    <div className="font-sans animate-fadeIn flex-1">
      {/* Header Section */}
      <div className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-zinc-900 tracking-tight">
            Order History
          </h1>
          <p className="text-xs text-zinc-500 font-medium mt-0.5">
            View and track the status of your recent purchases.
          </p>
        </div>
        <div className="h-12 w-12 rounded-full bg-amber-50 border border-amber-100 flex items-center justify-center shrink-0 hidden sm:flex">
          <RiShoppingBag3Line className="text-2xl text-amber-500" />
        </div>
      </div>

      {/* Reactive Filter Bar */}
      <BuyerOrdersFilterBar
        filters={filters}
        onFiltersChange={handleFiltersChange}
      />

      {/* Performant Data Table */}
      <div className="bg-white border border-zinc-200 rounded-2xl shadow-sm overflow-hidden">
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
            <RiShoppingBag3Line className="text-6xl text-zinc-300 mx-auto" />
          }
          emptyStateTitle="No orders found"
          emptyStateDescription="We couldn't find any orders matching your selected filters."
        />
      </div>
    </div>
  );
}
