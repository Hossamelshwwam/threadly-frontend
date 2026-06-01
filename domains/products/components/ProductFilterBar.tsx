"use client";

import React from "react";
import { RiSearchLine } from "react-icons/ri";
import CustomInput from "@/shared/components/custom-input/CustomInput";
import type { ProductStatus } from "../types/product.types";
import type { SellerProfile } from "@/domains/sellers/types/seller.types";
import type { Category } from "@/domains/categories/types/category.types";
import { cn } from "@/shared/lib";
import CustomSelect from "@/shared/components/custom-select/CustomSelect";

const STATUS_FILTERS: { label: string; value: ProductStatus | "" }[] = [
  { label: "All Statuses", value: "" },
  { label: "Active", value: "active" },
  { label: "Draft", value: "draft" },
  { label: "Archived", value: "archived" },
];

interface ProductFilterBarProps {
  search: string;
  onSearchChange: (val: string) => void;
  statusFilter: ProductStatus | "";
  onStatusChange: (val: ProductStatus | "") => void;
  selectedCategory: string;
  onCategoryChange: (val: string) => void;
  selectedSeller: string;
  onSellerChange: (val: string) => void;
  sellers: SellerProfile[];
  categories: Category[];
}

export function ProductFilterBar({
  search,
  onSearchChange,
  statusFilter,
  onStatusChange,
  selectedCategory,
  onCategoryChange,
  selectedSeller,
  onSellerChange,
  sellers,
  categories,
}: ProductFilterBarProps) {
  return (
    <div className="bg-white border border-zinc-200 rounded-lg p-4 space-y-4 font-sans shadow-xs">
      {/* Upper Layer: Core search input and drop-down selectors */}
      <div className="flex flex-col md:flex-row gap-3 items-end">
        <div className="flex-1 w-full">
          <CustomInput
            name="search"
            type="text"
            label="Search Products"
            placeholder="Search products by name or slug..."
            Icon={RiSearchLine}
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        {/* Category Filter Selector */}
        <CustomSelect
          name="category"
          label="Category"
          placeholder="All Categories"
          options={categories.map((cat) => ({
            label: cat.name,
            value: cat._id,
          }))}
          value={selectedCategory}
          className="w-full md:w-56"
          onChange={(e) => onCategoryChange(e.target.value)}
        />

        {/* Merchant Store Filter Selector */}
        <CustomSelect
          name="seller"
          label="Seller"
          placeholder="All Sellers"
          options={sellers.map((seller) => ({
            label: seller.storeName,
            value: seller._id,
          }))}
          value={selectedSeller}
          className="w-full md:w-56"
          onChange={(e) => onSellerChange(e.target.value)}
        />
      </div>

      {/* Lower Layer: Status Filter Badge Controls */}
      <div className="border-t border-zinc-100 pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
          Product State Filter
        </span>
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {STATUS_FILTERS.map((f) => (
            <button
              key={f.label}
              type="button"
              onClick={() => onStatusChange(f.value)}
              className={cn(
                "text-xs font-semibold px-3.5 py-1.5 rounded-md transition-colors whitespace-nowrap cursor-pointer",
                statusFilter === f.value
                  ? "bg-amber-400 text-white"
                  : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200",
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
