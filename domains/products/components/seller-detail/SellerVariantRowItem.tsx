// domains/products/components/seller-detail/SellerVariantRowItem.tsx
"use client";

import React, { useState } from "react";
import { RiDeleteBin6Line, RiAddLine, RiEdit2Line } from "react-icons/ri";
import { toast } from "sonner";

import type { ProductVariant } from "../../types/inventory.types";
import type { UpdateVariantInput } from "../../schemas/inventory.schema";
import { SellerEditVariantForm } from "./SellerEditVariantForm";
import { ConfirmationDialog } from "@/shared/components/confirmation-dialog/ConfirmationDialog";
import CustomInput from "@/shared/components/custom-input/CustomInput";

interface Props {
  variant: ProductVariant;
  isRestocking: boolean;
  isDeleting: boolean;
  isUpdating?: boolean;
  onRestock: (variantId: string, quantity: number) => Promise<any>;
  onDelete: (variantId: string) => Promise<any>;
  onUpdate: (variantId: string, payload: UpdateVariantInput) => Promise<any>;
}

export function SellerVariantRowItem({
  variant,
  isRestocking,
  isDeleting,
  isUpdating = false,
  onRestock,
  onDelete,
  onUpdate,
}: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [restockAmount, setRestockAmount] = useState("");

  const handleRestockSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseInt(restockAmount, 10);
    if (isNaN(amount) || amount < 1) {
      toast.error(
        "Please insert a valid restock increment of 1 or more units.",
      );
      return;
    }

    toast.promise(onRestock(variant._id, amount), {
      loading: "Adding stock...",
      success: () => {
        setRestockAmount("");
        return `Successfully added ${amount} units to ${variant.sku}`;
      },
      error: (err: any) =>
        err?.response?.data?.message || "Failed to add stock.",
    });
  };

  const handleUpdateSave = (data: UpdateVariantInput) => {
    return toast.promise(onUpdate(variant._id, data), {
      loading: "Updating variant...",
      success: () => {
        setIsEditing(false);
        return "Variant details saved.";
      },
      error: (err: any) =>
        err?.response?.data?.message || "Failed to update variant.",
    });
  };

  if (isEditing) {
    return (
      <SellerEditVariantForm
        variant={variant}
        isPending={isUpdating}
        onSave={handleUpdateSave}
        onCancel={() => setIsEditing(false)}
      />
    );
  }

  return (
    <div className="bg-white rounded-xl flex flex-col justify-between font-sans h-full">
      {/* Top Banner: Price & SKU */}
      <div className="p-4 flex items-center justify-between border-b border-zinc-50">
        <div className="flex flex-col gap-1">
          <span className="text-lg font-black text-zinc-900 tracking-tight">
            EGP {variant.price.toLocaleString()}
          </span>
          <span className="font-mono text-[10px] bg-zinc-100 text-zinc-600 px-2 py-0.5 rounded-md w-fit">
            {variant.sku}
          </span>
        </div>

        {/* Attributes Badge Group */}
        <div className="flex flex-col items-end gap-1.5">
          <span className="bg-amber-50 text-amber-700 border border-amber-200/50 px-2.5 py-0.5 rounded-md text-xs font-bold shadow-sm">
            Size: {variant.size}
          </span>
          <div className="flex items-center gap-1.5 bg-zinc-50 border border-zinc-200 px-2 py-0.5 rounded-md shadow-sm">
            <span
              style={{ backgroundColor: variant.color }}
              className="w-2.5 h-2.5 rounded-full border border-black/10"
            ></span>
            <span className="text-[11px] font-semibold text-zinc-700">
              {variant.color}
            </span>
          </div>
        </div>
      </div>

      {/* Middle: Stock Indicators */}
      <div className="p-4 grid grid-cols-2 gap-3 bg-zinc-50/50">
        <div
          className={`p-3 rounded-xl border ${variant.stock === 0 ? "bg-error-bg/50 border-error/20 text-error" : "bg-white border-zinc-200 text-zinc-800"} shadow-sm flex flex-col items-center justify-center`}
        >
          <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-0.5">
            Available
          </span>
          <span
            className={`text-xl font-black ${variant.stock === 0 ? "text-error" : "text-emerald-600"}`}
          >
            {variant.stock}
          </span>
        </div>

        <div
          className={`p-3 rounded-xl border ${variant.reserved > 0 ? "bg-warning-bg/50 border-warning/20 text-warning-800" : "bg-white border-zinc-200 text-zinc-500"} shadow-sm flex flex-col items-center justify-center`}
        >
          <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-0.5">
            Reserved
          </span>
          <span className="text-xl font-black">{variant.reserved}</span>
        </div>
      </div>

      {/* Bottom: Actions Strip */}
      <div className="border-t border-zinc-100 p-3 bg-white flex items-center gap-2 mt-auto rounded-b-xl">
        <form onSubmit={handleRestockSubmit} className="relative flex-1">
          <CustomInput
            name={`restock-${variant._id}`}
            type="number"
            placeholder="Add stock..."
            min={1}
            onChange={(e) => setRestockAmount(e.target.value)}
            value={restockAmount}
            disabled={isRestocking}
            InputClassName="bg-zinc-50 border-zinc-200 rounded-lg h-10 text-sm focus:bg-white"
          />
          <button
            type="submit"
            disabled={isRestocking || !restockAmount}
            className="absolute right-1 top-1 bottom-1 px-3 bg-zinc-900 text-white rounded-md flex items-center justify-center transition-all cursor-pointer hover:bg-amber-500 disabled:opacity-0 disabled:pointer-events-none font-bold text-xs"
          >
            Add
          </button>
        </form>

        <div className="flex items-center gap-2 shrink-0 border-l border-zinc-100 pl-2">
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            disabled={isDeleting || isRestocking}
            className="h-10 w-10 flex items-center justify-center bg-zinc-50 text-zinc-600 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors cursor-pointer disabled:opacity-40"
          >
            <RiEdit2Line size={18} />
          </button>

          <ConfirmationDialog
            onConfirm={() =>
              toast.promise(onDelete(variant._id), {
                loading: "Deleting...",
                success: "Variant deleted.",
                error: "Failed to delete variant.",
              })
            }
            title="Delete Variant"
            description={`Remove "${variant.sku}" completely?`}
            confirmText="Delete"
            variant="danger"
            isLoading={isDeleting}
          >
            <button
              type="button"
              disabled={isDeleting || isRestocking}
              className="h-10 w-10 flex items-center justify-center bg-zinc-50 text-zinc-400 hover:text-error hover:bg-error-bg rounded-lg transition-colors cursor-pointer disabled:opacity-40"
            >
              <RiDeleteBin6Line size={18} />
            </button>
          </ConfirmationDialog>
        </div>
      </div>
    </div>
  );
}
