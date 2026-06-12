"use client";

import Link from "next/link";
import { RiArrowLeftLine, RiLoader4Line } from "react-icons/ri";

import { useSellerOrderItem } from "../hooks/useSellerOrders";
import CustomButton from "@/shared/components/custom-button/custom-button";
import { SellerOrderStatusManager } from "../components/seller-detail/SellerOrderStatusManager";
import { SellerOrderCustomerDetails } from "../components/seller-detail/SellerOrderCustomerDetails";
import SellerOrderItemDetails from "../components/seller-detail/SellerOrderItemDetails";

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
          <SellerOrderItemDetails item={item} product={product} />
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
