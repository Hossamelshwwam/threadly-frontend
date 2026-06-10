// domains/products/components/seller-detail/SellerEditVariantForm.tsx
"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RiCheckLine, RiCloseLine } from "react-icons/ri";

import type { ProductVariant } from "../../types/inventory.types";
import {
  updateVariantSchema,
  type UpdateVariantInput,
} from "../../schemas/inventory.schema";
import CustomInput from "@/shared/components/custom-input/CustomInput";
import CustomButton from "@/shared/components/custom-button/custom-button";

interface Props {
  variant: ProductVariant;
  isPending: boolean;
  onSave: (data: UpdateVariantInput) => unknown;
  onCancel: () => void;
}

export function SellerEditVariantForm({
  variant,
  isPending,
  onSave,
  onCancel,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateVariantInput>({
    resolver: zodResolver(updateVariantSchema),
    defaultValues: {
      sku: variant.sku,
      size: variant.size,
      color: variant.color,
      price: variant.price,
    },
  });

  return (
    <form
      onSubmit={handleSubmit(onSave)}
      className="bg-zinc-50 border border-zinc-200 rounded-xl p-5 space-y-4 animate-fadeIn font-sans h-full flex flex-col justify-between"
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-zinc-200 pb-2">
          <div>
            <h3 className="text-sm font-bold text-zinc-900">Edit Variant</h3>
            <span className="text-xs text-zinc-500 font-mono">
              ID: {variant._id}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <CustomInput
            name="sku"
            type="text"
            label="SKU"
            half
            error={errors.sku?.message}
            registerProps={register("sku")}
            InputClassName="bg-white"
          />
          <CustomInput
            name="size"
            type="text"
            label="Size"
            half
            error={errors.size?.message}
            registerProps={register("size")}
            InputClassName="bg-white"
          />
          <CustomInput
            name="color"
            type="text"
            label="Color"
            half
            error={errors.color?.message}
            registerProps={register("color")}
            InputClassName="bg-white"
          />
          <CustomInput
            name="price"
            type="number"
            label="Price (EGP)"
            half
            min={0}
            step={0.01}
            error={errors.price?.message}
            registerProps={register("price", { valueAsNumber: true })}
            InputClassName="bg-white"
          />
        </div>
      </div>

      <div className="flex items-center justify-end gap-2 mt-4 pt-2">
        <CustomButton
          type="button"
          variant="soft"
          theme="neutral"
          size="sm"
          onClick={onCancel}
          leftIcon={<RiCloseLine />}
        >
          Cancel
        </CustomButton>
        <CustomButton
          type="submit"
          variant="solid"
          theme="primary"
          size="sm"
          disabled={isPending}
          leftIcon={<RiCheckLine />}
        >
          {isPending ? "Saving..." : "Save Changes"}
        </CustomButton>
      </div>
    </form>
  );
}
