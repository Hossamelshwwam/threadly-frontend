// domains/products/components/seller-form/SellerProductAttributes.tsx
"use client";

import React, { useState } from "react";
import {
  RiAddLine,
  RiDeleteBin6Line,
  RiListSettingsLine,
} from "react-icons/ri";
import type { CreateProductInput } from "../../schemas/product.schema";
import CustomInput from "@/shared/components/custom-input/CustomInput";
import CustomTextarea from "@/shared/components/custom-textarea/CustomTextarea";
import CustomButton from "@/shared/components/custom-button/custom-button";

interface Props {
  attributes: CreateProductInput["attributes"];
  onAttributesChange: (updated: { key: string; value: string }[]) => void;
}

export function SellerProductAttributes({
  attributes = [],
  onAttributesChange,
}: Props) {
  const [newKey, setNewKey] = useState("");
  const [newValue, setNewValue] = useState("");

  const handleAddAttribute = () => {
    if (!newKey.trim() || !newValue.trim()) return;
    onAttributesChange([
      ...attributes,
      { key: newKey.trim(), value: newValue.trim() },
    ]);
    setNewKey("");
    setNewValue("");
  };

  return (
    <div className="bg-white border border-zinc-100 rounded-2xl p-6 md:p-8 space-y-6 shadow-sm font-sans">
      <div className="flex items-center gap-3 pb-4 border-b border-zinc-100">
        <div className="p-2 bg-main-subtle rounded-lg">
          <RiListSettingsLine className="text-main text-xl" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-zinc-900 tracking-tight">
            Specifications & Features
          </h2>
          <p className="text-xs text-zinc-500 mt-0.5">
            Add care instructions, material details, or sizing notes.
          </p>
        </div>
      </div>

      {/* Add New Attribute Block */}
      <div className="bg-zinc-50/80 border border-zinc-200 rounded-xl p-5 space-y-4">
        <CustomInput
          name="attrKey"
          type="text"
          label="Feature Title"
          placeholder="e.g. Material & Care"
          value={newKey}
          onChange={(e) => setNewKey(e.target.value)}
          InputClassName="bg-white rounded-lg"
        />

        <CustomTextarea
          name="attrValue"
          label="Feature Description"
          placeholder="e.g. 100% Organic Cotton. Machine wash cold."
          value={newValue}
          onChange={(e) => setNewValue(e.target.value)}
          TextareaClassName="bg-white rounded-lg min-h-[80px]"
        />

        <div className="flex justify-end">
          <CustomButton
            type="button"
            variant="solid"
            theme="primary"
            size="sm"
            className="rounded-xl"
            leftIcon={<RiAddLine />}
            onClick={handleAddAttribute}
          >
            Add Feature
          </CustomButton>
        </div>
      </div>

      {/* List of Added Attributes */}
      {attributes.length > 0 && (
        <div className="grid grid-cols-1 gap-3 pt-2">
          {attributes.map((attr, idx) => (
            <div
              key={idx}
              className="bg-white border border-zinc-100 rounded-xl p-4 flex items-start justify-between gap-4 shadow-sm group hover:border-zinc-200 transition-colors"
            >
              <div>
                <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1">
                  {attr.key}
                </h4>
                <p className="text-sm text-zinc-800 font-medium whitespace-pre-wrap">
                  {attr.value}
                </p>
              </div>
              <button
                type="button"
                onClick={() =>
                  onAttributesChange(attributes.filter((_, i) => i !== idx))
                }
                className="text-zinc-300 hover:text-error hover:bg-error-bg p-2 rounded-lg transition-colors shrink-0"
              >
                <RiDeleteBin6Line size={18} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
