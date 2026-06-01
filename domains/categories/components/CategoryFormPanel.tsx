"use client";

import React from "react";
import { RiFolderAddLine } from "react-icons/ri";
import type { Category } from "../types/category.types";
import CustomInput from "@/shared/components/custom-input/CustomInput";
import CustomButton from "@/shared/components/custom-button/custom-button";

interface CategoryFormPanelProps {
  isEditing: boolean;
  name: string;
  onNameChange: (val: string) => void;
  parentId: string;
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
        <h2 className="text-base font-700 text-zinc-900">
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

        <div className="flex flex-col">
          <label className="block text-xs font-medium text-zinc-500 uppercase tracking-wider mb-1.5">
            Parent Scope Placement
          </label>
          <select
            value={parentId}
            onChange={(e) => onParentIdChange(e.target.value)}
            className="w-full h-12 px-4 border border-zinc-200 rounded bg-zinc-50 text-base text-zinc-800 outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all cursor-pointer"
          >
            <option value="">— Root Level Domain Category —</option>
            {categories
              .filter(
                (c) => !selectedCategory || c._id !== selectedCategory._id,
              )
              .map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
          </select>
        </div>

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
