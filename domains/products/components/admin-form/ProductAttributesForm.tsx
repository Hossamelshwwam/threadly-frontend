"use client";

import React, { useState } from "react";
import { RiAddLine, RiDeleteBin6Line } from "react-icons/ri";
import type { CreateProductInput } from "../../schemas/product.schema";
import CustomInput from "@/shared/components/custom-input/CustomInput";
import CustomTextarea from "@/shared/components/custom-textarea/CustomTextarea";
import CustomButton from "@/shared/components/custom-button/custom-button";

interface ProductAttributesFormProps {
  attributes: CreateProductInput["attributes"];
  onAttributesChange: (updated: { key: string; value: string }[]) => void;
}

export function ProductAttributesForm({
  attributes = [],
  onAttributesChange,
}: ProductAttributesFormProps) {
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

  const handleRemoveAttribute = (index: number) => {
    const updated = attributes.filter((_, i) => i !== index);
    onAttributesChange(updated);
  };

  return (
    <div className="bg-white border border-zinc-200 rounded-lg p-6 space-y-5 shadow-xs font-sans">
      <div>
        <h2 className="text-sm font-bold text-zinc-900">
          Custom Product Attributes
        </h2>
        <p className="text-xs text-on-surface-muted mt-0.5">
          Define platform specific parameter pairs or extensive care profiles.
        </p>
      </div>

      <div className="bg-zinc-50 border border-zinc-200/60 rounded-lg p-4 space-y-4">
        <CustomInput
          name="attrKey"
          type="text"
          label="Attribute Specification Key"
          placeholder="e.g. Composition & Care, Sizing Guide Note"
          value={newKey}
          onChange={(e) => setNewKey(e.target.value)}
          InputClassName="bg-white h-11 text-sm border-zinc-200"
        />

        <CustomTextarea
          name="attrValue"
          label="Detailed Value Profile Description"
          placeholder="e.g. 100% premium combed organic cotton. Machine wash cold with similar colors."
          value={newValue}
          onChange={(e) => setNewValue(e.target.value)}
          TextareaClassName="bg-white text-sm border-zinc-200"
          rows={3}
        />

        <div className="flex justify-end">
          <CustomButton
            type="button"
            variant="solid"
            theme="neutral"
            className="h-10 px-4 font-semibold text-sm cursor-pointer"
            leftIcon={<RiAddLine />}
            onClick={handleAddAttribute}
          >
            Add Attribute Parameter
          </CustomButton>
        </div>
      </div>

      {attributes.length > 0 && (
        <div className="flex flex-col gap-4 pt-2">
          {attributes.map((attr, idx) => (
            <div
              key={idx}
              className="bg-white border border-zinc-200 rounded-lg overflow-hidden flex flex-col hover:border-zinc-300 transition-colors group relative"
            >
              <div className="bg-zinc-50/80 border-b border-zinc-100 px-4 py-2.5 flex items-center justify-between gap-2">
                <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider truncate">
                  {attr.key}
                </span>
                <button
                  type="button"
                  onClick={() => handleRemoveAttribute(idx)}
                  className="text-zinc-400 hover:text-error transition-colors p-1 cursor-pointer rounded hover:bg-zinc-100"
                  title={`Remove ${attr.key}`}
                >
                  <RiDeleteBin6Line size={15} />
                </button>
              </div>

              <div className="p-4 flex-1 bg-white">
                <p className="text-sm text-on-surface leading-relaxed whitespace-pre-wrap max-h-32 overflow-y-auto font-medium pr-1 custom-scrollbar">
                  {attr.value}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
