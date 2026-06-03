"use client";

import { useState } from "react";
import { RiListSettingsLine, RiAddLine, RiLoader4Line } from "react-icons/ri";

import {
  useProductVariants,
  useRestockVariant,
  useDeleteVariant,
  useUpdateVariant,
} from "../../hooks/useProductInventory";
import { VariantRowItem } from "./VariantRowItem";
import { AddVariantForm } from "./AddVariantForm";
import CustomButton from "@/shared/components/custom-button/custom-button";

interface ProductVariantsManagerProps {
  productId: string;
}

export function ProductVariantsManager({
  productId,
}: ProductVariantsManagerProps) {
  const [showAddForm, setShowAddForm] = useState(false);

  // Connect active TanStack query hooks streams cleanly
  const { data: variantsResponse, isLoading } = useProductVariants(productId);

  const { mutateAsync: restockVariantAsync, isPending: isRestocking } =
    useRestockVariant(productId);
  const { mutateAsync: deleteVariantAsync, isPending: isDeleting } =
    useDeleteVariant(productId);
  const { mutateAsync: updateVariantAsync, isPending: isUpdating } =
    useUpdateVariant(productId);

  const variants = variantsResponse?.data ?? [];

  const handleRestockExecution = (variantId: string, quantity: number) => {
    return restockVariantAsync({ variantId, payload: { quantity } });
  };

  const handleDeleteExecution = (variantId: string) => {
    return deleteVariantAsync(variantId);
  };

  return (
    <div className="bg-white border border-zinc-200 rounded-lg p-5 space-y-4 shadow-xs font-sans">
      {/* Header Matrix Configuration Strip */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-100 pb-3">
        <div className="flex items-center gap-2">
          <RiListSettingsLine className="text-amber-500 text-lg" />
          <div>
            <h2 className="text-sm font-bold text-zinc-900">
              SKU Stock Allocation Matrix
            </h2>
            <p className="text-xs text-on-surface-muted mt-0.5">
              Manage individual dimension tags, unique SKU rules, and physical
              counter logs.
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
          >
            Add SKU Variant
          </CustomButton>
        )}
      </div>

      {/* Accordion Setup Add Form Block */}
      {showAddForm && (
        <AddVariantForm
          productId={productId}
          onCancel={() => setShowAddForm(false)}
        />
      )}

      {/* Dynamic Content Streams Placement Deck */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-12 text-zinc-400 gap-2">
          <RiLoader4Line size={24} className="animate-spin text-amber-500" />
          <p className="text-xs font-semibold">
            Scanning variant matrices lines...
          </p>
        </div>
      ) : variants.length === 0 ? (
        <div className="text-center py-10 border border-dashed border-zinc-200 bg-zinc-50/40 rounded-lg">
          <p className="text-sm font-medium text-zinc-400 italic">
            No distinct dimensions or variant mappings registered for this
            listing item yet.
          </p>
        </div>
      ) : (
        /* Rendered Ledger List Rows Group Element Block Container Loop */
        variants.length > 0 && (
          <div className="grid grid-cols-1 gap-4">
            {variants.map((v) => (
              <VariantRowItem
                key={v._id}
                variant={v}
                isRestocking={isRestocking}
                isDeleting={isDeleting}
                isUpdating={isUpdating}
                onRestock={handleRestockExecution}
                onDelete={handleDeleteExecution}
                onUpdate={(variantId, payload) =>
                  updateVariantAsync({ variantId, payload })
                }
              />
            ))}
          </div>
        )
      )}
    </div>
  );
}
