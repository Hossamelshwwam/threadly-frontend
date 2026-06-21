"use client";

import React, { useState } from "react";
import { RiCheckLine, RiCloseLine } from "react-icons/ri";
import { toast } from "sonner";

import CustomButton from "@/shared/components/custom-button/custom-button";
import CustomInput from "@/shared/components/custom-input/CustomInput";
import { useAdminUpdateOrderItem } from "../../hooks/useAdminOrders";
import type { OrderItem, OrderItemStatus } from "../../types/order.types";
import { OrderItemStatusBadge } from "../OrderStatusBadge";

const STATUS_TRANSITIONS: Record<string, string[]> = {
  pending: ["processing", "cancelled"],
  processing: ["shipped", "cancelled"],
  shipped: ["delivered"],
};

interface AdminOrderItemEditFormProps {
  orderId: string;
  item: OrderItem;
  onCancel: () => void;
}

export function AdminOrderItemEditForm({
  orderId,
  item,
  onCancel,
}: AdminOrderItemEditFormProps) {
  const { mutateAsync: updateOrderItem, isPending } =
    useAdminUpdateOrderItem(orderId);

  const [draftStatus, setDraftStatus] = useState<OrderItemStatus>(item.status);
  const [draftTracking, setDraftTracking] = useState(item.trackingNumber || "");

  const availableTransitions = [
    ...(STATUS_TRANSITIONS[item.status] || []),
  ] as OrderItemStatus[];

  const formatStatus = (s: string) =>
    s.charAt(0).toUpperCase() + s.slice(1).replace(/_/g, " ");

  const handleSaveItem = async () => {
    toast.promise(
      updateOrderItem({
        itemId: item._id,
        payload: {
          status: draftStatus,
          trackingNumber: draftTracking.trim() || undefined,
        },
      }),
      {
        loading: "Updating item fulfillment...",
        success: () => {
          onCancel();
          return "Item status and tracking updated successfully.";
        },
        error: (err: any) =>
          err?.response?.data?.message || "Failed to update item.",
      },
    );
  };

  return (
    <div className="mt-4 pt-4 border-t border-amber-200/40 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 animate-fadeIn bg-white rounded-xl">
      {/* Item Logistics Status Controls */}
      <div className="space-y-2 flex flex-col justify-center">
        <label className="text-[10px] sm:text-xs font-bold text-zinc-700 uppercase tracking-wider block">
          Item Logistics Status
        </label>

        {/* FIX: flex-col on mobile so Current Status and Buttons don't fight for width. flex-row on sm+ */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          {/* 1. Display Current Status securely */}
          <div className="flex items-center gap-2 sm:pr-3 sm:border-r border-zinc-200 shrink-0">
            <span className="text-[10px] sm:text-xs font-semibold text-zinc-400">
              Current:
            </span>
            <OrderItemStatusBadge status={item.status} />
          </div>

          {/* 2. Display Transition Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            {availableTransitions.length > 0 ? (
              availableTransitions.map((status) => {
                const isSelected = draftStatus === status;
                return (
                  <CustomButton
                    key={status}
                    type="button"
                    size="sm"
                    variant={isSelected ? "solid" : "outline"}
                    theme={isSelected ? "primary" : "neutral"}
                    onClick={() =>
                      setDraftStatus(isSelected ? item.status : status)
                    }
                    disabled={isPending}
                    // FIX: px-3 py-1.5 to make them better touch targets on mobile
                    className="capitalize text-[11px] sm:text-xs px-3 py-1.5 sm:h-7"
                  >
                    {formatStatus(status)}
                  </CustomButton>
                );
              })
            ) : (
              <span className="text-xs text-zinc-400 italic bg-zinc-50 px-2 py-1 rounded-md">
                Finalized (No further transitions)
              </span>
            )}
          </div>
        </div>
      </div>

      <CustomInput
        name={`trackingNumber-${item._id}`}
        type="text"
        label="Tracking / Waybill Number"
        placeholder="e.g. ARAMEX-123456"
        value={draftTracking}
        onChange={(e) => setDraftTracking(e.target.value)}
        disabled={isPending}
      />

      {/* FIX: flex-col-reverse on mobile (Cancel on bottom, Save on top), right-aligned row on desktop */}
      <div className="md:col-span-2 flex flex-col-reverse sm:flex-row justify-end gap-2 mt-2 sm:mt-1 pt-4 sm:pt-0 border-t sm:border-t-0 border-zinc-100">
        <CustomButton
          type="button"
          variant="outline"
          theme="neutral"
          size="sm"
          onClick={onCancel}
          disabled={isPending}
          leftIcon={<RiCloseLine />}
          className="w-full sm:w-auto"
        >
          Cancel
        </CustomButton>
        <CustomButton
          type="button"
          variant="solid"
          theme="primary"
          size="sm"
          onClick={handleSaveItem}
          disabled={isPending}
          leftIcon={<RiCheckLine />}
          className="w-full sm:w-auto"
        >
          {isPending ? "Saving..." : "Save Item Updates"}
        </CustomButton>
      </div>
    </div>
  );
}
