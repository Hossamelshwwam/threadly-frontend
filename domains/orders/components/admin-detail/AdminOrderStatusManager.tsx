"use client";

import React, { useState } from "react";
import {
  RiSave3Line,
  RiCloseLine,
  RiEdit2Line,
  RiAlertLine,
} from "react-icons/ri";
import { toast } from "sonner";
import CustomSelect from "@/shared/components/custom-select/CustomSelect";
import CustomButton from "@/shared/components/custom-button/custom-button";
import { ConfirmationDialog } from "@/shared/components/confirmation-dialog/ConfirmationDialog";
import { useAdminUpdateOrderStatus } from "../../hooks/useAdminOrders";
import type { OrderStatus, PaymentStatus } from "../../types/order.types";
import { OrderStatusBadge, PaymentStatusBadge } from "../OrderStatusBadge";

interface AdminOrderStatusManagerProps {
  orderId: string;
  currentStatus: OrderStatus;
  currentPaymentStatus: PaymentStatus;
}

export function AdminOrderStatusManager({
  orderId,
  currentStatus,
  currentPaymentStatus,
}: AdminOrderStatusManagerProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [status, setStatus] = useState<OrderStatus>(currentStatus);
  const [paymentStatus, setPaymentStatus] =
    useState<PaymentStatus>(currentPaymentStatus);

  const { mutateAsync: updateOrder, isPending } = useAdminUpdateOrderStatus();

  const handleOpenEdit = () => {
    setStatus(currentStatus);
    setPaymentStatus(currentPaymentStatus);
    setIsEditing(true);
  };

  const handleCancel = () => setIsEditing(false);

  const handleSaveOverride = () => {
    toast.promise(
      updateOrder({ id: orderId, payload: { status, paymentStatus } }),
      {
        loading: "Overriding global order status...",
        success: () => {
          setIsEditing(false);
          return "Global statuses overridden successfully.";
        },
        error: (err: any) =>
          err?.response?.data?.message || "Failed to update order.",
      },
    );
  };

  return (
    <div className="bg-white border border-zinc-200 rounded-xl p-4 sm:p-5 space-y-4 shadow-sm font-sans min-w-0">
      {/* FIX: flex-wrap so the override button doesn't squish text on tiny screens */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-100 pb-3">
        <h3 className="text-sm font-bold text-zinc-900">
          Global Fulfillment State
        </h3>
        {!isEditing && (
          <button
            type="button"
            onClick={handleOpenEdit}
            className="text-[10px] font-bold text-amber-600 hover:text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200/50 px-2.5 py-1.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
          >
            <RiEdit2Line size={12} />
            Manual Override
          </button>
        )}
      </div>

      {!isEditing ? (
        <div className="space-y-4">
          <div className="bg-zinc-50 border border-zinc-100 rounded-lg p-3 flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
              Logistics
            </span>
            <OrderStatusBadge status={currentStatus} />
          </div>
          <div className="bg-zinc-50 border border-zinc-100 rounded-lg p-3 flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
              Payment
            </span>
            <PaymentStatusBadge status={currentPaymentStatus} />
          </div>
          <p className="text-[10px] text-zinc-400 leading-relaxed pt-1 flex items-start gap-1.5">
            <RiAlertLine className="shrink-0 mt-0.5 text-zinc-300" />
            These statuses update automatically based on the individual
            fulfillment states of the purchased items.
          </p>
        </div>
      ) : (
        <div className="space-y-4 animate-fadeIn">
          <div className="bg-amber-50 border border-amber-200/60 p-3 rounded-lg flex items-start gap-2.5 text-amber-800 text-xs mb-2">
            <RiAlertLine className="shrink-0 mt-0.5 text-amber-600" size={14} />
            <p className="leading-relaxed">
              <strong>Warning:</strong> You are manually overriding the global
              status. This may break automated item-level tracking syncs.
            </p>
          </div>

          <CustomSelect
            name="status"
            label="Override Logistics Status"
            value={status}
            onChange={(e) => setStatus(e.target.value as OrderStatus)}
            options={[
              { label: "Pending", value: "pending" },
              { label: "Confirmed", value: "confirmed" },
              { label: "Partially Shipped", value: "partially_shipped" },
              { label: "Shipped", value: "shipped" },
              { label: "Delivered", value: "delivered" },
              { label: "Cancelled", value: "cancelled" },
            ]}
            disabled={isPending}
          />

          <CustomSelect
            name="paymentStatus"
            label="Override Payment Status"
            value={paymentStatus}
            onChange={(e) => setPaymentStatus(e.target.value as PaymentStatus)}
            options={[
              { label: "Unpaid", value: "unpaid" },
              { label: "Paid", value: "paid" },
              { label: "Refunded", value: "refunded" },
            ]}
            disabled={isPending}
          />

          {/* FIX: flex-col on mobile, flex-row on desktop. Avoids truncated button text! */}
          <div className="pt-4 border-t border-zinc-100 flex flex-col sm:flex-row items-stretch gap-2">
            <CustomButton
              type="button"
              variant="outline"
              theme="neutral"
              size="sm"
              className="flex-1 order-2 sm:order-1" // Put cancel on bottom for mobile
              disabled={isPending}
              onClick={handleCancel}
              leftIcon={<RiCloseLine />}
            >
              Cancel
            </CustomButton>

            <ConfirmationDialog
              title="Confirm Manual Status Override"
              description="You are manually forcing the global status of this order. Are you absolutely sure you want to bypass the automated system?"
              confirmText="Yes, Force Override"
              cancelText="Cancel"
              variant="warning"
              isLoading={isPending}
              onConfirm={handleSaveOverride}
            >
              <CustomButton
                type="button"
                variant="solid"
                theme="primary"
                size="sm"
                className="w-full sm:flex-1 order-1 sm:order-2"
                disabled={isPending}
                leftIcon={<RiSave3Line />}
              >
                Save Override
              </CustomButton>
            </ConfirmationDialog>
          </div>
        </div>
      )}
    </div>
  );
}
