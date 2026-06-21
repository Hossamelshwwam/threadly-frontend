"use client";

import React from "react";
import { RiFolderAddLine } from "react-icons/ri";
import type { Category } from "../types/category.types";
import CustomInput from "@/shared/components/custom-input/CustomInput";
import CustomButton from "@/shared/components/custom-button/custom-button";
import CustomSelect from "@/shared/components/custom-select/CustomSelect";

interface CategoryFormPanelProps {
  isEditing: boolean;
  name: string;
  onNameChange: (val: string) => void;
  parentId: string | undefined;
  onParentIdChange: (val: string) => void;
  categories: Category[];
  selectedCategory: Category | null;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
}

export function CategoryFormPanel({
  isEditing,
  name,
  onNameChange,
  parentId,
  onParentIdChange,
  categories,
  selectedCategory,
  onSubmit,
  onCancel,
}: CategoryFormPanelProps) {
  return (
    <div className="bg-white border border-zinc-200 rounded-lg p-5 sticky top-22 font-sans">
      <div className="flex items-center gap-2 mb-4">
        <RiFolderAddLine className="text-amber-500 text-lg" />
        <h2 className="text-base font-bold text-zinc-900">
          {isEditing ? "Modify Classification" : "Publish Category Node"}
        </h2>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        <CustomInput
          name="name"
          type="text"
          label="Category Name"
          placeholder="e.g. Leather Accessories"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
        />

        <CustomSelect
          name="parentId"
          label="Parent Category"
          placeholder="— Select Parent Category —"
          options={categories
            .filter((c) => !selectedCategory || c._id !== selectedCategory._id)
            .map((c) => ({
              label: c.name,
              value: c._id,
            }))}
          value={parentId}
          onChange={(e) => onParentIdChange(e.target.value)}
        />

        <div className="flex items-center gap-2 pt-2">
          <CustomButton
            type="submit"
            variant="solid"
            theme="primary"
            className="flex-1"
          >
            {isEditing ? "Save Adjustments" : "Create Node"}
          </CustomButton>

          {isEditing && (
            <CustomButton variant="outline" theme="neutral" onClick={onCancel}>
              Cancel
            </CustomButton>
          )}
        </div>
      </form>
    </div>
  );
}
