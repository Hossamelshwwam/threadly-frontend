"use client";

import React from "react";
import Link from "next/link";
import { RiArrowLeftSLine } from "react-icons/ri";

import { useBuyerOrder } from "../hooks/useMyOrders";
import { OrderHeader } from "../components/buyer/OrderHeader";
import { OrderItemsList } from "../components/buyer/OrderItemsList";
import { OrderShippingCard } from "../components/buyer/OrderShippingCard";
import { OrderPaymentCard } from "../components/buyer/OrderPaymentCard";

interface Props {
  id: string; // From route params
}

export default function AccountOrderDetailPage({ id }: Props) {
  const { data: response, isLoading } = useBuyerOrder(id);

  if (isLoading) {
    return (
      <div className="py-32 flex flex-col items-center justify-center text-amber-600 font-medium animate-pulse flex-1">
        <div className="w-10 h-10 border-4 border-amber-100 border-t-amber-500 rounded-full animate-spin mb-4" />
        Loading your order...
      </div>
    );
  }

  const order = response?.data?.order;
  const items = response?.data?.items || [];

  if (!order) {
    return (
      <div className="py-20 text-center text-zinc-500 font-medium flex-1">
        Order not found.
      </div>
    );
  }

  return (
    <div className="flex-1 font-sans animate-fadeIn space-y-6 pb-12">
      <Link
        href="/account/orders"
        className="inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-800 transition-colors w-fit"
      >
        <RiArrowLeftSLine size={18} /> Back to Orders
      </Link>

      <OrderHeader order={order} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <OrderItemsList order={order} items={items} />

        {/* RIGHT COLUMN: Clear, distinct info cards */}
        <div className="lg:col-span-1 space-y-6">
          <OrderShippingCard order={order} />
          <OrderPaymentCard order={order} />
        </div>
      </div>
    </div>
  );
}
