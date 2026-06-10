// domains/products/components/seller-form/SellerProductPrimarySpecs.tsx
"use client";

import React from "react";
import { FieldValues, Path, useFormContext } from "react-hook-form";
import { RiInformationLine } from "react-icons/ri";
import type { Category } from "@/domains/categories/types/category.types";
import CustomInput from "@/shared/components/custom-input/CustomInput";
import CustomTextarea from "@/shared/components/custom-textarea/CustomTextarea";
import CustomSelect from "@/shared/components/custom-select/CustomSelect";

interface Props {
  categories: Category[];
}

export function SellerProductPrimarySpecs<T extends FieldValues>({
  categories,
}: Props) {
  const {
    register,
    formState: { errors },
  } = useFormContext<T>();

  return (
    <div className="bg-white border border-zinc-100 rounded-2xl p-6 md:p-8 space-y-6 shadow-sm font-sans">
      <div className="flex items-center gap-3 pb-4 border-b border-zinc-100">
        <div className="p-2 bg-amber-50 rounded-lg">
          <RiInformationLine className="text-amber-500 text-xl" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-zinc-900 tracking-tight">
            Basic Information
          </h2>
          <p className="text-xs text-zinc-500 mt-0.5">
            The core details that buyers will see first.
          </p>
        </div>
      </div>

      <div className="space-y-5">
        <CustomInput
          name="name"
          type="text"
          label="Product Title *"
          placeholder="e.g. Premium Cotton T-Shirt"
          error={errors.name?.message as string}
          registerProps={register("name" as Path<T>)}
          InputClassName="bg-zinc-50/50 rounded-xl"
        />

        <CustomTextarea
          name="description"
          label="Detailed Description *"
          placeholder="Describe your product's features, fit, and feel..."
          error={errors.description?.message as string}
          registerProps={register("description" as Path<T>)}
          TextareaClassName="bg-zinc-50/50 rounded-xl min-h-[120px]"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <CustomInput
            name="basePrice"
            type="number"
            label="Base Price (EGP) *"
            placeholder="0.00"
            min={0}
            step={0.01}
            error={errors.basePrice?.message as string}
            registerProps={register("basePrice" as Path<T>, {
              valueAsNumber: true,
            })}
            InputClassName="bg-zinc-50/50 rounded-xl font-medium"
          />

          <CustomSelect
            name="categoryId"
            label="Category *"
            placeholder="Select a category"
            options={categories.map((cat) => ({
              label: cat.name,
              value: cat._id,
            }))}
            error={errors.categoryId?.message as string}
            registerProps={register("categoryId" as Path<T>)}
          />
        </div>
      </div>
    </div>
  );
}
