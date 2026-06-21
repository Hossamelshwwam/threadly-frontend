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
import Link from "next/link";

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
    <div className="space-y-4 sm:space-y-6 font-sans max-w-6xl mx-auto pb-12 min-w-0 w-full">
      {/* Header Strip */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        {/* FIX: items-start prevents the back button from centering weirdly if the title wraps to 2 lines */}
        <Link
          href="/admin/orders"
          className="inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-800 transition-colors w-fit"
        >
          <RiArrowLeftLine /> Back to Orders
        </Link>
        <div>
          {/* FIX: flex-wrap ensures badges drop to a new line on narrow phones instead of clipping off-screen */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-1">
            <h1 className="text-lg sm:text-xl font-bold text-zinc-900 leading-none">
              Order {order.orderNumber}
            </h1>
            <OrderStatusBadge status={order.status} />
            <PaymentStatusBadge status={order.paymentStatus} />
          </div>
          <p className="text-[10px] sm:text-xs text-zinc-400 mt-1">
            Placed on {orderDate}
          </p>
        </div>
      </div>

      {/* Main Grid Layout */}
      {/* 1 col on mobile, 3 cols on desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Left Column: Items */}
        <div className="lg:col-span-2 space-y-4 sm:space-y-6 min-w-0">
          <AdminOrderItemsTable items={items} order={order} />
        </div>

        {/* Right Column: Summaries & Controls */}
        <div className="space-y-4 sm:space-y-6 min-w-0">
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
