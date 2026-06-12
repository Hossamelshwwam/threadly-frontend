import React from "react";
import CustomButton from "@/shared/components/custom-button/custom-button";
import CustomInput from "@/shared/components/custom-input/CustomInput";
import { OrderItem } from "../../types/order.types";
import { RiCheckLine, RiTruckLine } from "react-icons/ri";

interface Props {
  item: OrderItem;
  isPending: boolean;
  isEditingTracking: boolean;
  setIsEditingTracking: React.Dispatch<React.SetStateAction<boolean>>;
  trackingNumber: string;
  setTrackingNumber: React.Dispatch<React.SetStateAction<string>>;
  handleSaveTrackingOnly: (e: React.FormEvent) => Promise<void>;
}

export default function SellerOrderItemTracking({
  item,
  isPending,
  isEditingTracking,
  setIsEditingTracking,
  handleSaveTrackingOnly,
  trackingNumber,
  setTrackingNumber,
}: Props) {
  return (
    (item.status === "processing" ||
      item.status === "shipped" ||
      isEditingTracking) && (
      <div className="border-t border-zinc-100 pt-3.5 space-y-3">
        {isEditingTracking ? (
          <form onSubmit={handleSaveTrackingOnly} className="space-y-2.5">
            <CustomInput
              name="trackingNumber"
              type="text"
              label="Courier Tracking Serial Code *"
              placeholder="e.g. EG123456789"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              InputClassName="bg-white"
            />
            <div className="flex gap-2 justify-end">
              <CustomButton
                type="button"
                variant="outline"
                theme="neutral"
                size="sm"
                className="h-8 text-xs rounded-lg"
                onClick={() => {
                  setIsEditingTracking(false);
                  setTrackingNumber(item.trackingNumber || "");
                }}
              >
                Cancel
              </CustomButton>
              <CustomButton
                type="submit"
                variant="solid"
                theme="primary"
                size="sm"
                className="h-8 text-xs rounded-lg"
                disabled={isPending || !trackingNumber.trim()}
                leftIcon={<RiCheckLine />}
              >
                Save & Apply
              </CustomButton>
            </div>
          </form>
        ) : (
          <div className="flex items-center justify-between bg-zinc-50/50 border border-zinc-100 rounded-xl p-3 text-sm">
            <div className="flex items-center gap-2 text-zinc-600 font-medium">
              <RiTruckLine className="text-zinc-400 text-base" />
              {item.trackingNumber ? (
                <span className="text-zinc-800">
                  Tracking:{" "}
                  <span className="font-mono font-bold bg-white border border-zinc-200 px-1.5 py-0.5 rounded text-xs">
                    {item.trackingNumber}
                  </span>
                </span>
              ) : (
                <span className="text-zinc-400 italic text-xs">
                  No tracking number linked
                </span>
              )}
            </div>
            {item.status !== "delivered" && item.status !== "cancelled" && (
              <button
                type="button"
                onClick={() => setIsEditingTracking(true)}
                className="text-xs text-amber-600 hover:text-amber-700 font-bold underline transition-colors cursor-pointer"
              >
                {item.trackingNumber ? "Update code" : "Link code"}
              </button>
            )}
          </div>
        )}
      </div>
    )
  );
}
