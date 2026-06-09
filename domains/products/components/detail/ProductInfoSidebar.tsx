"use client";

import React from "react";
import { RiArchiveDrawerLine, RiBox3Line } from "react-icons/ri";
import { toast } from "sonner";
import type { Product } from "../../types/product.types";
import CustomButton from "@/shared/components/custom-button/custom-button";
import { ConfirmationDialog } from "@/shared/components/confirmation-dialog/ConfirmationDialog";
import { cn } from "@/shared/lib";
import ProductStatusBadge from "../ProductStatusBadge";

interface ProductInfoSidebarProps {
  product: Product;
  isArchiving: boolean;
  onForceArchive: (id: string) => Promise<any>;
}

export function ProductInfoSidebar({
  product,
  isArchiving,
  onForceArchive,
}: ProductInfoSidebarProps) {
  const categoryName =
    typeof product.categoryId === "object"
      ? product.categoryId.name
      : "Unassigned";
  const storeName =
    product.sellerId && typeof product.sellerId === "object"
      ? product.sellerId.storeName
      : "Platform Direct";

  const handleArchive = () => {
    toast.promise(onForceArchive(product._id), {
      loading: "Archiving product globally...",
      success: "Product forcefully archived",
      error: (err: any) =>
        err?.response?.data?.message || "Failed to archive product",
    });
  };

  return (
    <div className="space-y-4 font-sans">
      {/* Primary Context Card */}
      <div className="bg-white border border-zinc-200 rounded-lg p-5 space-y-4 shadow-xs">
        <div className="flex items-center gap-2 border-b border-zinc-100 pb-2">
          <RiBox3Line className="text-amber-500 text-base" />
          <h2 className="text-sm font-bold text-zinc-800">Lifecycle & Scope</h2>
        </div>

        <div className="space-y-3">
          {[
            {
              label: "Base Price",
              value: `EGP ${product.basePrice.toLocaleString()}`,
              className: "font-bold text-zinc-900",
            },
            {
              label: "Publish Status",
              value: <ProductStatusBadge status={product.status} />,
            },
            { label: "Category", value: categoryName },
            { label: "Seller Channel", value: storeName },
            {
              label: "Created At",
              value: new Date(product.createdAt).toLocaleDateString("en-EG", {
                day: "numeric",
                month: "short",
                year: "numeric",
              }),
            },
          ].map(({ label, value, className }) => (
            <div
              key={label}
              className="flex items-center justify-between py-2 border-b border-zinc-50 last:border-0"
            >
              <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                {label}
              </span>
              <span
                className={cn("text-sm font-medium text-zinc-700", className)}
              >
                {value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Moderation Controls Card */}
      {product.status !== "archived" && (
        <div className="bg-white border border-zinc-200 rounded-lg p-5 space-y-3 shadow-xs">
          <p className="text-sm font-bold text-zinc-700">
            Administrative Safeguards
          </p>
          <ConfirmationDialog
            variant="danger"
            title="Force Archive Product Listing"
            description={`Are you sure you want to globally archive "${product.name}"? It will instantly become invisible across all storefronts.`}
            confirmText="Force Archive"
            requireCheckbox
            checkboxLabel="I authorize archiving this inventory unit globally"
            isLoading={isArchiving}
            onConfirm={handleArchive}
          >
            <CustomButton
              variant="soft"
              theme="danger"
              fullWidth
              leftIcon={<RiArchiveDrawerLine />}
            >
              Force Archive Listing
            </CustomButton>
          </ConfirmationDialog>
        </div>
      )}
    </div>
  );
}
