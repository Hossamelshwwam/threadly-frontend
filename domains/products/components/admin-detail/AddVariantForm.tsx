"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RiAddLine, RiCloseLine } from "react-icons/ri";
import {
  createVariantSchema,
  type CreateVariantInput,
} from "../../schemas/inventory.schema";
import CustomInput from "@/shared/components/custom-input/CustomInput";
import CustomButton from "@/shared/components/custom-button/custom-button";
import { useCreateVariant } from "../../hooks/useProductInventory";
import { toast } from "sonner";

interface AddVariantFormProps {
  productId: string;
  onCancel: () => void;
}

export function AddVariantForm({ productId, onCancel }: AddVariantFormProps) {
  const { mutateAsync: createVariantAsync, isPending: isCreating } =
    useCreateVariant(productId);
  const handleCreateVariantSave = (data: CreateVariantInput) => {
    return toast.promise(createVariantAsync(data), {
      loading: "Publishing SKU allocation details...",
      success: () => {
        reset();
        return "Variant option appended to stock matrix successfully.";
      },
      error: (err: any) =>
        err?.response?.data?.message ||
        "Failed to finalize variant SKU creation.",
    });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateVariantInput>({
    resolver: zodResolver(createVariantSchema),
    defaultValues: {
      stock: 0,
    },
  });

  return (
    <form
      onSubmit={handleSubmit(handleCreateVariantSave)}
      className="bg-zinc-50 border border-zinc-200 rounded-lg p-5 space-y-4 animate-fadeIn font-sans"
    >
      <div className="flex items-center justify-between border-b border-zinc-200/60 pb-2">
        <h3 className="text-xs font-bold text-zinc-700 uppercase tracking-wider">
          Configure New Item Variant SKU
        </h3>
        <button
          type="button"
          onClick={onCancel}
          className="text-zinc-400 hover:text-zinc-600 cursor-pointer"
        >
          <RiCloseLine size={20} />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <CustomInput
          name="sku"
          type="text"
          label="Unique Variant SKU Identifier *"
          placeholder="e.g. TSHRT-LNN-SLIM-BLK-XL"
          half
          error={errors.sku?.message}
          registerProps={register("sku")}
          InputClassName="bg-white"
        />

        <CustomInput
          name="size"
          type="text"
          label="Size Attribute Dimension *"
          placeholder="e.g. M, XL, 34, OneSize"
          half
          error={errors.size?.message}
          registerProps={register("size")}
          InputClassName="bg-white"
        />

        <CustomInput
          name="color"
          type="text"
          label="Color Variant Label *"
          placeholder="e.g. Pure Black, Midnight Blue"
          error={errors.color?.message}
          registerProps={register("color")}
          InputClassName="bg-white"
          half
        />

        <CustomInput
          name="price"
          type="number"
          label="Variant Level Price (EGP) *"
          placeholder="0.00"
          min={0}
          step={0.01}
          error={errors.price?.message}
          InputClassName="bg-white"
          half
          registerProps={register("price", { valueAsNumber: true })}
        />

        <CustomInput
          name="stock"
          type="number"
          label="Initial Physical Floor Stock *"
          placeholder="0"
          min={0}
          error={errors.stock?.message}
          InputClassName="bg-white"
          registerProps={register("stock", { valueAsNumber: true })}
        />
      </div>

      <div className="flex justify-end gap-2 border-t border-zinc-200/40 pt-3">
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
          disabled={isCreating}
          leftIcon={<RiAddLine />}
        >
          {isCreating ? "Configuring SKU..." : "Append Variant Allocation"}
        </CustomButton>
      </div>
    </form>
  );
}
