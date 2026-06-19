"use client";

import React from "react";
import CustomInput from "@/shared/components/custom-input/CustomInput";
import CustomSelect from "@/shared/components/custom-select/CustomSelect";
import type { OrdersParams } from "../../types/order.types";

interface Props {
  filters: Omit<OrdersParams, "page" | "limit">;
  onFiltersChange: (newFilters: Omit<OrdersParams, "page" | "limit">) => void;
}

export function BuyerOrdersFilterBar({ filters, onFiltersChange }: Props) {
  const handleChange = (key: keyof typeof filters, value: string) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  return (
    <div className="bg-white border border-zinc-200 rounded-2xl p-5 shadow-sm mb-6 gap-4 animate-fadeIn grid grid-cols-1 lg:grid-cols-2">
      <CustomSelect
        name="status"
        label="Order Status"
        options={[
          { label: "All Statuses", value: "" },
          { label: "Pending", value: "pending" },
          { label: "Processing", value: "processing" },
          { label: "Shipped", value: "shipped" },
          { label: "Delivered", value: "delivered" },
          { label: "Cancelled", value: "cancelled" },
        ]}
        value={filters.status || ""}
        half
        onChange={(e) => handleChange("status", e.target.value)}
      />

      <CustomSelect
        name="paymentStatus"
        label="Payment Status"
        options={[
          { label: "All Payments", value: "" },
          { label: "Pending", value: "pending" },
          { label: "Paid", value: "paid" },
          { label: "Failed", value: "failed" },
          { label: "Refunded", value: "refunded" },
        ]}
        half
        value={filters.paymentStatus || ""}
        onChange={(e) => handleChange("paymentStatus", e.target.value)}
      />

      <CustomInput
        name="from"
        type="date"
        label="From Date"
        value={filters.from || ""}
        half
        onChange={(e) => handleChange("from", e.target.value)}
      />

      <CustomInput
        name="to"
        type="date"
        label="To Date"
        value={filters.to || ""}
        half
        onChange={(e) => handleChange("to", e.target.value)}
      />
    </div>
  );
}
