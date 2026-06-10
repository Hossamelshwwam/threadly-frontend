"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  RiArrowLeftLine,
  RiLoader4Line,
  RiInboxArchiveLine,
} from "react-icons/ri";

import { useSellerOrderItem } from "../hooks/useSellerOrders";
import CustomButton from "@/shared/components/custom-button/custom-button";
import { OrderItemStatusBadge } from "../components/list/OrderStatusBadge";
import { SellerOrderStatusManager } from "../components/seller-detail/SellerOrderStatusManager";
import { SellerOrderCustomerDetails } from "../components/seller-detail/SellerOrderCustomerDetails";

interface Props {
  id: string;
}

export default function SellerOrderDetailPage({ id }: Props) {
  const { data: itemResponse, isLoading } = useSellerOrderItem(id);
  const item = itemResponse?.data;

  const product = item?.productId;
  const parentOrder = item?.orderId as any; // Safe evaluation for population maps

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-32 font-sans gap-3">
        <RiLoader4Line className="text-3xl text-amber-500 animate-spin" />
        <p className="text-sm font-semibold text-zinc-500">
          Loading order details...
        </p>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center font-sans bg-white border border-zinc-200 rounded-lg">
        <p className="text-zinc-500 font-bold text-lg">Order item not found</p>
        <Link href="/seller/orders" className="mt-4">
          <CustomButton variant="outline" theme="neutral" size="sm">
            Back to Orders
          </CustomButton>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 font-sans max-w-7xl mx-auto pb-12">
      {/* Navigation Breadcrumb */}
      <div className="flex items-center justify-between">
        <Link
          href="/seller/orders"
          className="inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-800 transition-colors w-fit"
        >
          <RiArrowLeftLine /> Back to My Orders
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">
        {/* LEFT COLUMN: Item Information Manifest */}
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-white border border-zinc-200 rounded-lg p-6 space-y-5 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-100 pb-4">
              <div>
                <h1 className="text-xl font-black text-zinc-900 tracking-tight">
                  Item Details
                </h1>
                <p className="text-xs font-mono text-zinc-400 mt-1">
                  Item Reference ID: {item._id}
                </p>
              </div>
              <OrderItemStatusBadge status={item.status} />
            </div>

            {/* Product Snapshot Frame */}
            <div className="flex items-start gap-4 bg-zinc-50/50 border border-zinc-200/60 rounded-lg p-4">
              <div className="h-16 w-16 relative rounded-md overflow-hidden bg-white border border-zinc-200 shrink-0">
                {product?.images?.[0] ? (
                  <Image
                    src={product.images[0]}
                    alt="Product"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <RiInboxArchiveLine className="absolute inset-0 m-auto text-zinc-300" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-bold text-zinc-900 truncate">
                  {product?.name || item.productName}
                </h3>
                <div className="flex items-center gap-3 text-xs text-zinc-500 mt-1 font-semibold">
                  <span className="bg-white px-2 py-0.5 rounded border border-zinc-200">
                    Size: {item.size}
                  </span>
                  <span>•</span>
                  <div className="flex items-center gap-1 bg-white px-2 py-0.5 rounded border border-zinc-200">
                    <span>Color:</span>
                    <span
                      style={{ backgroundColor: item.color }}
                      className="w-2.5 h-2.5 rounded-full border border-black/10"
                    />
                    <span>{item.color}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Financial Calculations Table */}
            <div className="space-y-2.5 pt-2">
              <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider block">
                Financial Accounting
              </span>
              <div className="border border-zinc-100 rounded-lg divide-y divide-zinc-50">
                <div className="flex items-center justify-between p-3 text-sm font-medium text-zinc-600">
                  <span>Unit Price</span>
                  <span className="font-bold text-zinc-800">
                    EGP {item.unitPrice.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 text-sm font-medium text-zinc-600">
                  <span>Quantity ordered</span>
                  <span className="font-bold text-zinc-800">
                    {item.quantity} units
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-zinc-50/60 text-sm font-bold text-zinc-900 rounded-b-lg">
                  <span>Total settlement</span>
                  <span className="text-base font-black">
                    EGP {item.total.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Actions and Context Summary */}
        <div className="col-span-2 space-y-4">
          {/* Logistics Status Update Panel */}
          <SellerOrderStatusManager item={item} />

          {/* Delivery coordinates address panel */}
          {parentOrder?.shippingAddress && (
            <SellerOrderCustomerDetails
              address={parentOrder.shippingAddress}
              buyer={parentOrder.buyerId}
            />
          )}
        </div>
      </div>
    </div>
  );
}
