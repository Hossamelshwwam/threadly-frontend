// domains/products/components/seller-detail/SellerProductVariants.tsx
"use client";

import { useState } from "react";
import { RiStockLine, RiAddLine, RiLoader4Line } from "react-icons/ri";

import {
  useProductVariants,
  useRestockVariant,
  useDeleteVariant,
  useUpdateVariant,
} from "../../hooks/useProductInventory";
import { VariantRowItem } from "../admin-detail/VariantRowItem"; // Reusing the inner row logic is fine, or you can style it further later
import { AddVariantForm } from "../admin-detail/AddVariantForm";
import CustomButton from "@/shared/components/custom-button/custom-button";
import { SellerAddVariantForm } from "./SellerAddVariantForm";
import { SellerVariantRowItem } from "./SellerVariantRowItem";

export function SellerProductVariants({ productId }: { productId: string }) {
  const [showAddForm, setShowAddForm] = useState(false);
  const { data: variantsResponse, isLoading } = useProductVariants(productId);
  const { mutateAsync: restockVariantAsync, isPending: isRestocking } =
    useRestockVariant(productId);
  const { mutateAsync: deleteVariantAsync, isPending: isDeleting } =
    useDeleteVariant(productId);
  const { mutateAsync: updateVariantAsync, isPending: isUpdating } =
    useUpdateVariant(productId);

  const variants = variantsResponse?.data ?? [];

  return (
    <div className="bg-white border border-zinc-100 rounded-2xl p-6 md:p-8 space-y-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-main-subtle rounded-lg">
            <RiStockLine className="text-main text-xl" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-zinc-900 tracking-tight">
              Inventory & Variants
            </h2>
            <p className="text-xs text-zinc-500">
              Manage sizes, colors, and stock levels.
            </p>
          </div>
        </div>

        {!showAddForm && (
          <CustomButton
            variant="outline"
            theme="neutral"
            size="sm"
            leftIcon={<RiAddLine />}
            onClick={() => setShowAddForm(true)}
            className="rounded-xl font-semibold"
          >
            Add Variant
          </CustomButton>
        )}
      </div>

      {showAddForm && (
        <div className="bg-zinc-50 p-4 rounded-xl border border-zinc-200">
          <SellerAddVariantForm
            productId={productId}
            onCancel={() => setShowAddForm(false)}
          />
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center py-8">
          <RiLoader4Line size={24} className="animate-spin text-zinc-400" />
        </div>
      ) : variants.length === 0 ? (
        <div className="text-center py-12 bg-zinc-50 rounded-xl border border-dashed border-zinc-200">
          <p className="text-sm font-medium text-zinc-500">
            No inventory variants added yet.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {variants.map((v) => (
            <div
              key={v._id}
              className="bg-white border border-zinc-100 rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden"
            >
              <SellerVariantRowItem
                variant={v}
                isRestocking={isRestocking}
                isDeleting={isDeleting}
                isUpdating={isUpdating}
                onRestock={(id, qty) =>
                  restockVariantAsync({
                    variantId: id,
                    payload: { quantity: qty },
                  })
                }
                onDelete={(id) => deleteVariantAsync(id)}
                onUpdate={(id, payload) =>
                  updateVariantAsync({ variantId: id, payload })
                }
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
