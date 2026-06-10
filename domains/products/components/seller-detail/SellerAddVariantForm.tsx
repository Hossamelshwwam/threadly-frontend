// domains/products/components/seller-detail/SellerAddVariantForm.tsx
"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RiAddLine, RiCloseLine } from "react-icons/ri";
import { toast } from "sonner";

import {
  createVariantSchema,
  type CreateVariantInput,
} from "../../schemas/inventory.schema";
import CustomInput from "@/shared/components/custom-input/CustomInput";
import CustomButton from "@/shared/components/custom-button/custom-button";
import { useCreateVariant } from "../../hooks/useProductInventory";

interface Props {
  productId: string;
  onCancel: () => void;
}

export function SellerAddVariantForm({ productId, onCancel }: Props) {
  const { mutateAsync: createVariantAsync, isPending: isCreating } =
    useCreateVariant(productId);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateVariantInput>({
    resolver: zodResolver(createVariantSchema),
    defaultValues: { stock: 0 },
  });

  const handleCreateVariantSave = (data: CreateVariantInput) => {
    return toast.promise(createVariantAsync(data), {
      loading: "Adding new variant...",
      success: () => {
        reset();
        return "Variant successfully added to inventory.";
      },
      error: (err: any) =>
        err?.response?.data?.message || "Failed to add variant.",
    });
  };

  return (
    <form
      onSubmit={handleSubmit(handleCreateVariantSave)}
      className="bg-white border border-zinc-100 rounded-xl p-5 space-y-5 animate-fadeIn shadow-sm font-sans"
    >
      <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
        <div>
          <h3 className="text-sm font-bold text-zinc-900">Add New Variant</h3>
          <p className="text-xs text-zinc-500 mt-0.5">
            Define a new size or color option.
          </p>
        </div>
        <button
          type="button"
          onClick={onCancel}
          className="h-8 w-8 flex items-center justify-center bg-zinc-50 hover:bg-zinc-100 text-zinc-500 rounded-full transition-colors cursor-pointer"
        >
          <RiCloseLine size={20} />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <CustomInput
          name="sku"
          type="text"
          label="SKU (Stock Keeping Unit) *"
          placeholder="e.g. TSHIRT-BLK-XL"
          half
          error={errors.sku?.message}
          registerProps={register("sku")}
          InputClassName="bg-zinc-50/50"
        />

        <CustomInput
          name="size"
          type="text"
          label="Size *"
          placeholder="e.g. Medium, 42, One Size"
          half
          error={errors.size?.message}
          registerProps={register("size")}
          InputClassName="bg-zinc-50/50"
        />

        <CustomInput
          name="color"
          type="text"
          label="Color *"
          placeholder="e.g. Midnight Black"
          error={errors.color?.message}
          registerProps={register("color")}
          InputClassName="bg-zinc-50/50"
          half
        />

        <CustomInput
          name="price"
          type="number"
          label="Price (EGP) *"
          placeholder="0.00"
          min={0}
          step={0.01}
          error={errors.price?.message}
          InputClassName="bg-zinc-50/50"
          half
          registerProps={register("price", { valueAsNumber: true })}
        />

        <CustomInput
          name="stock"
          type="number"
          label="Initial Stock Quantity *"
          placeholder="0"
          min={0}
          error={errors.stock?.message}
          InputClassName="bg-zinc-50/50"
          registerProps={register("stock", { valueAsNumber: true })}
        />
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <CustomButton
          type="button"
          variant="outline"
          theme="neutral"
          size="md"
          onClick={onCancel}
        >
          Cancel
        </CustomButton>
        <CustomButton
          type="submit"
          variant="solid"
          theme="primary"
          size="md"
          disabled={isCreating}
          leftIcon={<RiAddLine />}
        >
          {isCreating ? "Saving..." : "Save Variant"}
        </CustomButton>
      </div>
    </form>
  );
}
