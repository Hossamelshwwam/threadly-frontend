"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import { RiCloseCircleLine } from "react-icons/ri";

import { useCancelOrderItem } from "../../hooks/useMyOrders";
import CustomButton from "@/shared/components/custom-button/custom-button";
import { ConfirmationDialog } from "@/shared/components/confirmation-dialog/ConfirmationDialog";

interface Props {
  orderId: string;
  itemId: string;
  itemName: string;
}

export function CancelOrderItemButton({ orderId, itemId, itemName }: Props) {
  const { mutateAsync: cancelItem, isPending } = useCancelOrderItem(orderId);

  const handleCancel = async () => {
    toast.promise(cancelItem(itemId), {
      loading: "Processing cancellation...",
      success: () => {
        return "Item successfully cancelled and refunded.";
      },
      error: (err: any) =>
        err?.response?.data?.message || "Failed to cancel item.",
    });
  };

  return (
    <ConfirmationDialog
      onConfirm={handleCancel}
      title="Cancel Order Item"
      description={`Are you sure you want to cancel "${itemName}"? This action cannot be undone, and the stock will be released.`}
      confirmText={isPending ? "Cancelling..." : "Yes, Cancel Item"}
      cancelText="No, Keep It"
      isLoading={isPending}
    >
      <CustomButton
        type="button"
        variant="outline"
        theme="danger"
        size="sm"
        leftIcon={<RiCloseCircleLine />}
        className="font-bold text-xs"
      >
        Cancel Item
      </CustomButton>
    </ConfirmationDialog>
  );
}
