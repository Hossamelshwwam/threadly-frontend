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

interface EditVariantFormProps {
  variant: ProductVariant;
  isPending: boolean;
  onSave: (data: UpdateVariantInput) => unknown;
  onCancel: () => void;
}

export function EditVariantForm({
  variant,
  isPending,
  onSave,
  onCancel,
}: EditVariantFormProps) {
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
      className="bg-zinc-50 border border-amber-300 rounded-xl p-5 space-y-4 animate-fadeIn font-sans h-full flex flex-col justify-between"
    >
      <div className="space-y-3">
        <div className="flex items-center justify-between border-b border-zinc-200/60 pb-2">
          <div>
            <h3 className="text-xs font-bold text-zinc-700 uppercase tracking-wider">
              Modify Specifications
            </h3>
            <span className="text-[10px] font-mono text-zinc-400 block mt-0.5 truncate max-w-[180px]">
              ID: {variant._id}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <CustomInput
            name="sku"
            type="text"
            label="SKU Identifier *"
            placeholder="e.g. Variant SKU"
            half
            error={errors.sku?.message}
            registerProps={register("sku")}
            InputClassName="bg-white"
          />

          <CustomInput
            name="size"
            type="text"
            label="Size *"
            placeholder="e.g. XL"
            half
            error={errors.size?.message}
            registerProps={register("size")}
            InputClassName="bg-white"
          />
          <CustomInput
            name="color"
            type="text"
            label="Color *"
            placeholder="e.g. Black"
            half
            error={errors.color?.message}
            registerProps={register("color")}
            InputClassName="bg-white"
          />

          <CustomInput
            name="price"
            type="number"
            label="Price (EGP) *"
            placeholder="0.00"
            half
            min={0}
            step={0.01}
            error={errors.price?.message}
            registerProps={register("price", { valueAsNumber: true })}
            InputClassName="bg-white"
          />
        </div>
      </div>

      <div className="flex items-center justify-end gap-2 mt-4">
        <CustomButton
          type="button"
          variant="outline"
          theme="neutral"
          size="sm"
          onClick={onCancel}
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
          {isPending ? "Saving..." : "Save"}
        </CustomButton>
      </div>
    </form>
  );
}
