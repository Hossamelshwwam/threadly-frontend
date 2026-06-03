"use client";

import React, { useState } from "react";
import { RiDeleteBin6Line, RiAddLine, RiEditLine } from "react-icons/ri";
import { toast } from "sonner";

import type { ProductVariant } from "../../types/inventory.types";
import type { UpdateVariantInput } from "../../schemas/inventory.schema";
import { EditVariantForm } from "./EditVariantForm";
import { ConfirmationDialog } from "@/shared/components/confirmation-dialog/ConfirmationDialog";
import CustomInput from "@/shared/components/custom-input/CustomInput";

interface VariantRowItemProps {
  variant: ProductVariant;
  isRestocking: boolean;
  isDeleting: boolean;
  isUpdating?: boolean;
  onRestock: (variantId: string, quantity: number) => Promise<any>;
  onDelete: (variantId: string) => Promise<any>;
  onUpdate: (variantId: string, payload: UpdateVariantInput) => Promise<any>;
}

export function VariantRowItem({
  variant,
  isRestocking,
  isDeleting,
  isUpdating = false,
  onRestock,
  onDelete,
  onUpdate,
}: VariantRowItemProps) {
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
      loading: "Incrementing physical inventory shelves...",
      success: () => {
        setRestockAmount("");
        return `Successfully appended ${amount} units to SKU: ${variant.sku}`;
      },
      error: (err: any) =>
        err?.response?.data?.message || "Failed to restock variant selection.",
    });
  };

  const handleUpdateSave = (data: UpdateVariantInput) => {
    return toast.promise(onUpdate(variant._id, data), {
      loading: "Updating variant specifications...",
      success: () => {
        setIsEditing(false);
        return "Variant data modified successfully.";
      },
      error: (err: any) =>
        err?.response?.data?.message || "Failed to save variant updates.",
    });
  };

  const handleDeleteTrigger = () => {
    toast.promise(onDelete(variant._id), {
      loading: "Removing variant stock reference from catalog database...",
      success: "Variant allocation dropped successfully.",
      error: (err: any) =>
        err?.response?.data?.message || "Failed to remove variant SKU.",
    });
  };

  // State A: Edit Mode Layer (Swaps completely into matching card layout size)
  if (isEditing) {
    return (
      <EditVariantForm
        variant={variant}
        isPending={isUpdating}
        onSave={handleUpdateSave}
        onCancel={() => setIsEditing(false)}
      />
    );
  }

  // State B: Completely Redesigned Dynamic Block Module Layout
  return (
    <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden flex flex-col justify-between transition-all hover:border-zinc-300 hover:shadow-sm font-sans h-full">
      {/* Upper Segment: Ribbon Frame Metadata Container */}
      <div className="bg-zinc-50/70 border-b border-zinc-100 p-4 space-y-2.5">
        <div className="flex items-center justify-between gap-2">
          <span
            className="font-mono text-[11px] font-bold bg-white text-zinc-700 px-2 py-0.5 rounded border border-zinc-200 truncate max-w-[140px]"
            title={variant.sku}
          >
            {variant.sku}
          </span>
          <span className="text-sm font-extrabold text-zinc-900 whitespace-nowrap">
            EGP {variant.price.toLocaleString()}
          </span>
        </div>

        {/* Dynamic Structural Attribute Grid Sub-strip */}
        <div className="flex items-center gap-4 text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
          <div className="bg-white px-2 py-0.5 rounded border border-zinc-100">
            Size:{" "}
            <span className="text-zinc-700 font-extrabold">{variant.size}</span>
          </div>
          <div
            className="bg-white px-2 py-0.5 rounded border border-zinc-100 truncate"
            title={variant.color}
          >
            Color:{" "}
            <div className="text-zinc-700 font-extrabold items-center gap-1 inline-flex">
              <span
                style={{
                  backgroundColor: variant.color,
                }}
                className="w-3 h-3 rounded-full"
              ></span>
              {variant.color}
            </div>
          </div>
        </div>
      </div>

      {/* Center Segment: Isolated Stocks Statistics Ledger Bar */}
      <div className="p-4 grid grid-cols-2 gap-2 bg-white">
        <div
          className={`rounded-lg p-2.5 text-center transition-colors border ${
            variant.stock === 0
              ? "bg-error-bg border-error/20 text-error"
              : "bg-success-bg border-success/10 text-success"
          }`}
        >
          <span className="block text-[9px] font-bold uppercase tracking-widest opacity-80 mb-0.5">
            Available Stock
          </span>
          <span className="text-sm font-extrabold block">
            {variant.stock} units
          </span>
        </div>

        <div
          className={`rounded-lg p-2.5 text-center transition-colors border ${
            variant.reserved > 0
              ? "bg-warning-bg border-warning/20 text-warning"
              : "bg-zinc-50 border-zinc-100 text-zinc-400"
          }`}
        >
          <span className="block text-[9px] font-bold uppercase tracking-widest opacity-80 mb-0.5">
            Reserved Units
          </span>
          <span className="text-sm font-extrabold block">
            {variant.reserved} units
          </span>
        </div>
      </div>

      {/* Bottom Segment: Seamless Interactive Control Panel Bar */}
      <div className="border-t border-zinc-100 px-4 py-3 bg-zinc-50/30 flex items-center gap-2 mt-auto">
        {/* Absolute-Inlined Action Form input field matching requested layout */}
        <form
          onSubmit={handleRestockSubmit}
          className="relative flex-1 font-sans"
        >
          <CustomInput
            name={`restock-${variant._id}`}
            type="number"
            placeholder="Restock count..."
            min={1}
            onChange={(e) => setRestockAmount(e.target.value)}
            value={restockAmount}
            disabled={isRestocking}
            InputClassName="bg-white rounded-lg h-9"
          />
          <button
            type="submit"
            disabled={isRestocking || !restockAmount}
            className="absolute right-1 top-1 h-7 w-7 bg-zinc-900 text-white rounded-md flex items-center justify-center transition-all cursor-pointer hover:bg-zinc-800 disabled:opacity-0 disabled:pointer-events-none scale-95"
            title="Execute inline restocking"
          >
            <RiAddLine size={14} />
          </button>
        </form>

        {/* Dropdown / Edit Menu shortcut triggers */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            disabled={isDeleting || isRestocking}
            className="h-9 w-9 flex items-center justify-center border border-zinc-200 bg-white text-zinc-500 hover:text-zinc-800 hover:bg-zinc-100 rounded-lg transition-colors cursor-pointer disabled:opacity-40"
            title="Modify attributes mapping"
          >
            <RiEditLine size={14} />
          </button>

          <ConfirmationDialog
            onConfirm={handleDeleteTrigger}
            title="Permanently Drop Variant Configuration"
            description={`Are you sure you want to drop SKU alignment "${variant.sku}"? Dropping this allocation removes all stock profiles and size tags instantly.`}
            confirmText="Delete SKU Allocation"
            cancelText="Cancel"
            variant="danger"
            isLoading={isDeleting}
          >
            <button
              type="button"
              disabled={isDeleting || isRestocking}
              className="h-9 w-9 flex items-center justify-center border border-zinc-200 bg-white text-zinc-400 hover:text-error hover:border-error/30 hover:bg-error-bg rounded-lg transition-colors cursor-pointer disabled:opacity-40"
              title="Drop assignment from catalog"
            >
              <RiDeleteBin6Line size={14} />
            </button>
          </ConfirmationDialog>
        </div>
      </div>
    </div>
  );
}
