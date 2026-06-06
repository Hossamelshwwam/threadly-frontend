"use client";

import React, { useState } from "react";
import { RiSave3Line, RiLock2Line } from "react-icons/ri";
import { toast } from "sonner";
import CustomSelect from "@/shared/components/custom-select/CustomSelect";
import CustomButton from "@/shared/components/custom-button/custom-button";
import { ConfirmationDialog } from "@/shared/components/confirmation-dialog/ConfirmationDialog";
import { useAdminUpdatePayout } from "../../hooks/useAdminPayouts";
import type { Payout, PayoutStatus } from "../../types/payout.types";
import CustomTextarea from "@/shared/components/custom-textarea/CustomTextarea";

export function PayoutActionPanel({ payout }: { payout: Payout }) {
  const [status, setStatus] = useState<PayoutStatus>(payout.status);
  const [note, setNote] = useState(payout.adminNote || "");

  const { mutateAsync: updatePayout, isPending } = useAdminUpdatePayout();

  // If the payout is already finalized, we shouldn't allow changing it easily.
  const isFinalized = payout.status === "paid" || payout.status === "rejected";
  const hasChanged =
    status !== payout.status || note !== (payout.adminNote || "");

  const handleSave = () => {
    toast.promise(
      updatePayout({
        id: payout._id,
        payload: { status, adminNote: note.trim() || undefined },
      }),
      {
        loading: "Updating payout status...",
        success: "Settlement record updated successfully.",
        error: (err: any) =>
          err?.response?.data?.message || "Failed to update payout.",
      },
    );
  };

  return (
    <div className="bg-white border border-zinc-200 rounded-xl p-5 space-y-4 shadow-xs font-sans">
      <h3 className="text-sm font-bold text-zinc-900 border-b border-zinc-100 pb-2">
        Settlement Processing
      </h3>

      {isFinalized && !hasChanged ? (
        <div className="bg-zinc-50 border border-zinc-200 p-4 rounded-lg flex flex-col gap-2">
          <div className="flex items-center gap-2 text-zinc-500 font-semibold text-sm">
            <RiLock2Line /> This payout has been finalized.
          </div>
          {payout.adminNote && (
            <div className="mt-2 text-xs text-zinc-600 bg-white p-3 rounded border border-zinc-100">
              <strong>Admin Note:</strong> {payout.adminNote}
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-4 animate-fadeIn">
          <CustomSelect
            name="payoutStatus"
            label="Action State"
            value={status}
            onChange={(e) => setStatus(e.target.value as PayoutStatus)}
            options={[
              { label: "Pending", value: "pending" },
              {
                label: "Processing (Bank Transfer Initiated)",
                value: "processing",
              },
              { label: "Paid (Settled)", value: "paid" },
              { label: "Rejected", value: "rejected" },
            ]}
            disabled={isPending}
          />

          <CustomTextarea
            name="adminNote"
            label="Internal Admin Note (Optional)"
            placeholder="Add transaction IDs, rejection reasons, or bank reference numbers here..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
            disabled={isPending}
            rows={3}
          />

          {hasChanged && (
            <div className="pt-3 border-t border-zinc-100 flex justify-end">
              <ConfirmationDialog
                title="Confirm Financial Update"
                description={`Are you sure you want to mark this payout as "${status}"? This action will update the seller's ledger.`}
                confirmText="Confirm Status Update"
                variant={status === "rejected" ? "danger" : "default"}
                isLoading={isPending}
                onConfirm={handleSave}
              >
                <CustomButton
                  type="button"
                  variant="solid"
                  theme="primary"
                  size="sm"
                  disabled={isPending}
                  leftIcon={<RiSave3Line />}
                >
                  {isPending ? "Saving..." : "Save Processing Update"}
                </CustomButton>
              </ConfirmationDialog>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
