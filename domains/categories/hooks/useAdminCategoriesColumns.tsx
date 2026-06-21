"use client";

import React, { useMemo, useRef } from "react";
import { ColumnDef } from "@tanstack/react-table";
import {
  RiEditLine,
  RiDeleteBin6Line,
  RiToggleLine,
  RiImageAddLine,
  RiFolderLine,
} from "react-icons/ri";
import Image from "next/image";
import { toast } from "sonner";
import { cn } from "@/shared/lib";

import type { Category } from "../types/category.types";
import CustomButton from "@/shared/components/custom-button/custom-button";
import { ConfirmationDialog } from "@/shared/components/confirmation-dialog/ConfirmationDialog";

// ── STANDALONE CELL COMPONENT ───────────────────────────────────────────────
function CategoryNameCell({
  category,
  onUploadImage,
}: {
  category: Category;
  onUploadImage: (id: string, file: File) => Promise<any>;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    toast.promise(onUploadImage(category._id, file), {
      loading: "Uploading classification asset image...",
      success: "Category image uploaded successfully",
      error: (err: any) =>
        err?.response?.data?.message || "Failed to save category image",
    });

    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="flex items-center gap-3 font-sans min-w-[200px]">
      {/* FIX: Scaled down slightly on mobile (w-16 h-16) to save space, back to w-20 on tablet */}
      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded bg-zinc-50 border border-zinc-200 flex items-center justify-center shrink-0 overflow-hidden relative group/img shadow-sm">
        {category.image ? (
          <Image
            src={category.image}
            alt={category.name}
            fill
            sizes="(max-width: 640px) 64px, 80px"
            className="object-cover group-hover/img:opacity-30 transition-opacity"
          />
        ) : (
          <RiFolderLine className="text-zinc-400 text-lg group-hover/img:opacity-0 transition-opacity" />
        )}

        {/* FIX 1: Desktop Hover Overlay (Hidden on Mobile) */}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="hidden sm:flex absolute inset-0 items-center justify-center opacity-0 group-hover/img:opacity-100 bg-black/10 text-zinc-800 transition-all cursor-pointer z-10"
          title="Upload category artwork banner image"
        >
          <RiImageAddLine className="text-xl text-amber-500 bg-white p-1.5 rounded-full shadow-sm" />
        </button>

        {/* FIX 2: Mobile Persistent Button (Always visible on touch screens!) */}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="sm:hidden absolute bottom-1 right-1 bg-white/90 backdrop-blur-sm p-1 rounded-md shadow-sm border border-zinc-200 z-20"
        >
          <RiImageAddLine className="text-amber-500 text-sm" />
        </button>

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/png, image/jpeg, image/webp"
          className="hidden"
        />
      </div>

      <div className="flex flex-col min-w-0">
        <p className="font-bold text-zinc-900 leading-tight truncate">
          {category.name}
        </p>
        <p className="text-[10px] sm:text-xs font-mono text-zinc-400 mt-0.5 truncate">
          slug: {category.slug}
        </p>
      </div>
    </div>
  );
}

// ── MAIN HOOK ────────────────────────────────────────────────────────────────
interface UseAdminCategoriesColumnsProps {
  isUpdating: boolean;
  onEdit: (category: Category) => void;
  onToggleStatus: (category: Category) => void;
  onDelete: (id: string) => Promise<any>;
  onUploadImage: (id: string, file: File) => Promise<any>;
}

export default function useAdminCategoriesColumns({
  isUpdating,
  onEdit,
  onToggleStatus,
  onDelete,
  onUploadImage,
}: UseAdminCategoriesColumnsProps) {
  return useMemo<ColumnDef<Category>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Category Info",
        cell: ({ row }) => (
          <CategoryNameCell
            category={row.original}
            onUploadImage={onUploadImage}
          />
        ),
      },
      {
        id: "parentPath",
        header: "Hierarchy Placement",
        cell: ({ row }) => {
          const category = row.original;
          if (category.parentId && typeof category.parentId === "object") {
            return (
              <span className="text-[10px] sm:text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200/40 px-2 py-1 rounded-md whitespace-nowrap">
                {(category.parentId as any).name} &rarr; {category.name}
              </span>
            );
          }
          return (
            <span className="text-[10px] sm:text-xs font-bold bg-zinc-100 text-zinc-500 px-2 py-1 rounded-md whitespace-nowrap">
              Root Level Domain
            </span>
          );
        },
      },
      {
        accessorKey: "isActive",
        header: "Status",
        cell: ({ row }) => {
          const isActive = row.original.isActive;
          return (
            <span
              className={cn(
                "text-[10px] sm:text-xs font-bold px-2.5 py-1 rounded-md border whitespace-nowrap",
                isActive
                  ? "bg-success-bg text-success border-success/30"
                  : "bg-error-bg text-error border-error/20",
              )}
            >
              {isActive ? "Active" : "Inactive"}
            </span>
          );
        },
      },
      {
        id: "actions",
        header: "Actions",
        enableSorting: false,
        cell: ({ row }) => {
          const category = row.original;

          const handleQuickDelete = () => {
            toast.promise(onDelete(category._id), {
              loading: "Removing category element...",
              success: "Category deleted successfully",
              error: (err: any) =>
                err?.response?.data?.message || "Failed to purge category node",
            });
          };

          return (
            // FIX: Added whitespace-nowrap and flex-nowrap to prevent buttons from stacking
            <div className="flex items-center gap-1.5 flex-nowrap whitespace-nowrap">
              <CustomButton
                variant="ghost"
                theme="neutral"
                size="sm"
                iconOnly
                rightIcon={<RiEditLine />}
                onClick={() => onEdit(category)}
              />

              <CustomButton
                variant="ghost"
                theme={category.isActive ? "warning" : "success"}
                size="sm"
                iconOnly
                rightIcon={<RiToggleLine />}
                onClick={() => onToggleStatus(category)}
              />

              <ConfirmationDialog
                variant="danger"
                title="Delete Category"
                description={`Are you sure you want to permanently delete "${category.name}"? This action cannot be reverted.`}
                confirmText="Delete Category"
                isLoading={isUpdating}
                onConfirm={handleQuickDelete}
              >
                <CustomButton
                  variant="ghost"
                  theme="danger"
                  size="sm"
                  iconOnly
                  rightIcon={<RiDeleteBin6Line />}
                />
              </ConfirmationDialog>
            </div>
          );
        },
      },
    ],
    [isUpdating, onEdit, onToggleStatus, onDelete, onUploadImage],
  );
}
