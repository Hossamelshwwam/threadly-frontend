"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { RiArrowLeftLine, RiLoader4Line } from "react-icons/ri";

import { useAdminOrderDetail } from "../hooks/useAdminOrders";
import {
  OrderStatusBadge,
  PaymentStatusBadge,
} from "../components/OrderStatusBadge";
import { AdminOrderStatusManager } from "../components/admin-detail/AdminOrderStatusManager";
import { AdminOrderCustomerDetails } from "../components/admin-detail/AdminOrderCustomerDetails";
import { AdminOrderItemsTable } from "../components/admin-detail/AdminOrderItemsTable";
import CustomButton from "@/shared/components/custom-button/custom-button";

export default function AdminOrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const orderId = params.id as string;

  const { data: response, isLoading, isError } = useAdminOrderDetail(orderId);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-3">
        <RiLoader4Line className="animate-spin text-amber-500 text-3xl" />
        <p className="text-sm font-medium text-zinc-500">
          Retrieving secure transaction ledger...
        </p>
      </div>
    );
  }

  if (isError || !response?.data) {
    return (
      <div className="text-center py-12 space-y-3">
        <p className="text-error font-semibold">
          Failed to load order details.
        </p>
        <CustomButton variant="outline" onClick={() => router.back()}>
          Go Back
        </CustomButton>
      </div>
    );
  }

  const { order, items } = response.data;
  const orderDate = new Date(order.createdAt).toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return (
    <div className="space-y-6 font-sans max-w-6xl mx-auto pb-12">
      {/* Header Strip */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push("/admin/orders")}
            className="w-9 h-9 flex items-center justify-center rounded-lg border border-zinc-200 text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900 transition-colors"
          >
            <RiArrowLeftLine size={18} />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-zinc-900">
                Order {order.orderNumber}
              </h1>
              <OrderStatusBadge status={order.status} />
              <PaymentStatusBadge status={order.paymentStatus} />
            </div>
            <p className="text-xs text-zinc-400 mt-1">Placed on {orderDate}</p>
          </div>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Items */}
        <div className="lg:col-span-2 space-y-6">
          <AdminOrderItemsTable items={items} order={order} />
        </div>

        {/* Right Column: Summaries & Controls */}
        <div className="space-y-6">
          <AdminOrderStatusManager
            orderId={order._id}
            currentStatus={order.status}
            currentPaymentStatus={order.paymentStatus}
          />
          <AdminOrderCustomerDetails order={order} />
        </div>
      </div>
    </div>
  );
}
