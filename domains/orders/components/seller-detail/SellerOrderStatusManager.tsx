"use client";

import React, { useState } from "react";
import { RiShipLine } from "react-icons/ri";
import { toast } from "sonner";
import type { OrderItem, OrderItemStatus } from "../../types/order.types";
import { useUpdateSellerOrderStatus } from "../../hooks/useSellerOrders";
import CustomButton from "@/shared/components/custom-button/custom-button";
import { OrderItemStatusBadge } from "../OrderStatusBadge";
import SellerOrderItemTracking from "./SellerOrderItemTracking";

// Your exact transition mapping matrix
const STATUS_TRANSITIONS: Record<OrderItemStatus, OrderItemStatus[]> = {
  pending: ["processing", "cancelled"],
  processing: ["shipped", "cancelled"],
  shipped: ["delivered"],
  delivered: [],
  cancelled: [],
};

interface Props {
  item: OrderItem;
}

export function SellerOrderStatusManager({ item }: Props) {
  const { mutateAsync: updateStatusAsync, isPending } =
    useUpdateSellerOrderStatus(item._id);

  // Local tracking input state if seller chooses to type a carrier number before moving to shipped
  const [trackingNumber, setTrackingNumber] = useState(
    item.trackingNumber || "",
  );
  const [isEditingTracking, setIsEditingTracking] = useState(false);

  const availableTransitions = STATUS_TRANSITIONS[item.status] || [];

  const handleTransitionClick = async (targetStatus: OrderItemStatus) => {
    // If the seller clicks 'shipped' but hasn't filled a tracking code, let's open the input view first
    if (targetStatus === "shipped" && !trackingNumber.trim()) {
      setIsEditingTracking(true);
      toast.info(
        "Please supply a courier tracking number to mark this item as shipped.",
      );
      return;
    }

    const payload = {
      status: targetStatus,
      trackingNumber: trackingNumber.trim() || undefined,
    };

    toast.promise(updateStatusAsync(payload), {
      loading: `Moving item status to ${targetStatus}...`,
      success: () => {
        setIsEditingTracking(false);
        return `Item successfully updated to ${targetStatus}.`;
      },
      error: (err: any) =>
        err?.response?.data?.message || "Failed to update fulfillment state.",
    });
  };

  const handleSaveTrackingOnly = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      status: item.status,
      trackingNumber: trackingNumber.trim() || undefined,
    };

    toast.promise(updateStatusAsync(payload), {
      loading: "Saving tracking details...",
      success: () => {
        setIsEditingTracking(false);
        return "Tracking number linked successfully.";
      },
      error: (err: any) =>
        err?.response?.data?.message || "Failed to update tracking details.",
    });
  };

  const formatStatus = (status: string) => {
    return status.replace("_", " ");
  };

  return (
    <div className="bg-white border border-zinc-200 rounded-lg p-5 space-y-4 font-sans shadow-xs">
      <div className="flex items-center gap-2 pb-2 border-b border-zinc-100">
        <RiShipLine className="text-amber-500 text-lg" />
        <h2 className="text-sm font-bold text-zinc-900">
          Logistics Fulfillment Action
        </h2>
      </div>

      {/* 1. Display Current Status & Dynamic Transition Buttons */}
      <div className="flex flex-col gap-3.5">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 bg-zinc-50/50 p-3 rounded-xl border border-zinc-100">
          <div className="flex items-center gap-2 pr-3 sm:border-r border-zinc-200 shrink-0">
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
              Current:
            </span>
            <OrderItemStatusBadge status={item.status} />
          </div>

          <div className="flex items-center gap-2">
            {availableTransitions.length > 0 ? (
              availableTransitions.map((status) => (
                <CustomButton
                  key={status}
                  type="button"
                  size="sm"
                  variant="outline"
                  theme={status === "cancelled" ? "danger" : "neutral"}
                  onClick={() => handleTransitionClick(status)}
                  disabled={isPending}
                  className="capitalize text-xs h-8 px-3 rounded-lg hover:bg-zinc-100 font-semibold"
                >
                  {formatStatus(status)}
                </CustomButton>
              ))
            ) : (
              <span className="text-xs text-zinc-400 font-semibold italic">
                Finalized (No further transitions)
              </span>
            )}
          </div>
        </div>

        {/* 2. Interactive Tracking Section (Shows if item is in transit or if user is adding it) */}
        <SellerOrderItemTracking
          handleSaveTrackingOnly={handleSaveTrackingOnly}
          isEditingTracking={isEditingTracking}
          isPending={isPending}
          item={item}
          setIsEditingTracking={setIsEditingTracking}
          setTrackingNumber={setTrackingNumber}
          trackingNumber={trackingNumber}
        />
      </div>
    </div>
  );
}
