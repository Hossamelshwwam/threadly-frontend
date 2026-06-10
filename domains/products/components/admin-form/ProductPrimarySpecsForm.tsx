"use client";

import type { Category } from "@/domains/categories/types/category.types";
import CustomInput from "@/shared/components/custom-input/CustomInput";
import CustomTextarea from "@/shared/components/custom-textarea/CustomTextarea";
import CustomSelect from "@/shared/components/custom-select/CustomSelect";
import { FieldValues, Path, useFormContext } from "react-hook-form";

interface ProductPrimarySpecsFormProps {
  categories: Category[];
}

export function ProductPrimarySpecsForm<T extends FieldValues>({
  categories,
}: ProductPrimarySpecsFormProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext<T>();
  return (
    <div className="bg-white border border-zinc-200 rounded-lg p-5 space-y-4 shadow-xs font-sans">
      <h2 className="text-sm font-bold text-zinc-800 border-b border-zinc-100 pb-2">
        Primary Specifications
      </h2>

      <CustomInput
        name="name"
        type="text"
        label="Product Title *"
        placeholder="e.g. Slim-Fit Linen Casual Shirt"
        error={errors.name?.message as string}
        registerProps={register("name" as Path<T>)}
      />

      <CustomTextarea
        name="description"
        label="Detailed Description *"
        placeholder="Write an extensive product profile description details..."
        error={errors.description?.message as string}
        registerProps={register("description" as Path<T>)}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
        />

        <CustomSelect
          name="categoryId"
          label="Category Classification *"
          placeholder="— Select Category Range —"
          options={categories.map((cat) => ({
            label: cat.name,
            value: cat._id,
          }))}
          error={errors.categoryId?.message as string}
          registerProps={register("categoryId" as Path<T>)}
        />
      </div>
    </div>
  );
}
