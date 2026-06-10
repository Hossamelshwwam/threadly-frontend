// domains/products/components/seller-detail/SellerProductSidebar.tsx
"use client";

import React from "react";
import { RiEyeOffLine, RiPriceTag3Line } from "react-icons/ri";
import { toast } from "sonner";
import type { Product } from "../../types/product.types";
import CustomButton from "@/shared/components/custom-button/custom-button";
import { ConfirmationDialog } from "@/shared/components/confirmation-dialog/ConfirmationDialog";
import ProductStatusBadge from "../ProductStatusBadge";

interface Props {
  product: Product;
  isArchiving: boolean;
  onArchive: (id: string) => Promise<any>;
}

export function SellerProductSidebar({
  product,
  isArchiving,
  onArchive,
}: Props) {
  const categoryName =
    typeof product.categoryId === "object"
      ? product.categoryId.name
      : "Unassigned";

  const handleArchive = () => {
    toast.promise(onArchive(product._id), {
      loading: "Archiving product...",
      success:
        "Product successfully archived. It is no longer visible to buyers.",
      error: "Failed to archive product.",
    });
  };

  return (
    <div className="space-y-6 font-sans sticky top-6">
      {/* Price & Status Card */}
      <div className="bg-zinc-900 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
        <RiPriceTag3Line className="absolute -bottom-4 -right-4 text-8xl text-white/5 rotate-12" />

        <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1">
          Base Price
        </p>
        <h2 className="text-4xl font-extrabold tracking-tight mb-4">
          <span className="text-xl text-zinc-400 mr-1">EGP</span>
          {product.basePrice.toLocaleString()}
        </h2>

        <div className="flex items-center justify-between border-t border-white/10 pt-4 mt-2">
          <span className="text-sm text-zinc-300">Visibility</span>
          <ProductStatusBadge status={product.status} />
        </div>
      </div>

      {/* Details Card */}
      <div className="bg-white border border-zinc-100 rounded-2xl p-6 space-y-4 shadow-sm">
        <h3 className="text-sm font-bold text-zinc-800 border-b border-zinc-100 pb-2">
          Listing Details
        </h3>

        <div className="space-y-3">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-medium text-zinc-400">Category</span>
            <span className="text-sm font-semibold text-zinc-800">
              {categoryName}
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-xs font-medium text-zinc-400">
              Created On
            </span>
            <span className="text-sm font-semibold text-zinc-800">
              {new Date(product.createdAt).toLocaleDateString("en-EG", {
                dateStyle: "long",
              })}
            </span>
          </div>
        </div>
      </div>

      {/* Seller Action: Archive */}
      {product.status !== "archived" && (
        <div className="bg-error-bg/50 border border-error/20 rounded-2xl p-6 space-y-3">
          <h3 className="text-sm font-bold text-error">Danger Zone</h3>
          <p className="text-xs text-error/80 leading-relaxed mb-3">
            Archiving this product will hide it from your storefront
            immediately. You cannot un-archive it yourself.
          </p>

          <ConfirmationDialog
            variant="danger"
            title="Archive Product Listing"
            description={`Are you sure you want to archive "${product.name}"? Buyers will no longer be able to see or purchase it.`}
            confirmText="Yes, Archive"
            isLoading={isArchiving}
            onConfirm={handleArchive}
          >
            <CustomButton
              variant="outline"
              theme="danger"
              fullWidth
              leftIcon={<RiEyeOffLine />}
              className="bg-white hover:bg-error hover:text-white transition-all rounded-xl border-error/30"
            >
              Archive Product
            </CustomButton>
          </ConfirmationDialog>
        </div>
      )}
    </div>
  );
}
