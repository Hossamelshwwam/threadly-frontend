"use client";

import { useMemo, useRef } from "react";
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

import type { Category } from "../types/category.types";
import CustomButton from "@/shared/components/custom-button/custom-button";
import { ConfirmationDialog } from "@/shared/components/confirmation-dialog/ConfirmationDialog";
import { cn } from "@/shared/lib";

interface UseAdminCategoriesColumnsProps {
  isUpdating: boolean;
  onEdit: (category: Category) => void;
  onToggleStatus: (category: Category) => void;
  onDelete: (id: string) => Promise<any>;
  onUploadImage: (id: string, file: File) => Promise<any>;
}

// ── STANDALONE CELL COMPONENT (Fixes the ESLint Hook Error) ──────────────────
function CategoryNameCell({
  category,
  onUploadImage,
}: {
  category: Category;
  onUploadImage: (id: string, file: File) => Promise<any>;
}) {
  // Safe to call useRef here because this is a proper React Function Component!
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
  };

  return (
    <div className="flex items-center gap-3 font-sans">
      {/* Category Image Avatar Box Frame Wrapper */}
      <div className="w-20 h-20 rounded bg-zinc-50 border border-zinc-200 flex items-center justify-center shrink-0 overflow-hidden relative group/img">
        {category.image ? (
          <Image
            src={category.image}
            alt={category.name}
            fill
            className="object-cover group-hover/img:opacity-30 transition-opacity"
          />
        ) : (
          <RiFolderLine className="text-zinc-400 text-lg group-hover/img:opacity-0 transition-opacity" />
        )}

        {/* Trigger Button Overlay over Image box */}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/img:opacity-100 bg-black/10 text-zinc-800 transition-all cursor-pointer"
          title="Upload category artwork banner image"
        >
          <RiImageAddLine className="text-base text-amber-500 bg-white p-1 rounded-full shadow-sm" />
        </button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />
      </div>

      <div>
        <p className="font-semibold text-zinc-800 leading-tight">
          {category.name}
        </p>
        <p className="text-xs font-mono text-zinc-400 mt-0.5">
          slug: {category.slug}
        </p>
      </div>
    </div>
  );
}

// ── MAIN HOOK ────────────────────────────────────────────────────────────────
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
              <span className="text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200/40 px-2 py-1 rounded-md">
                {(category.parentId as any).name} &rarr; {category.name}
              </span>
            );
          }
          return (
            <span className="text-xs font-medium bg-zinc-100 text-zinc-500 px-2 py-1 rounded-md">
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
                "text-xs font-semibold px-2 py-0.5 rounded-md border",
                isActive
                  ? "bg-success-bg text-success border-success/30"
                  : "bg-error-bg text-error border-[#b03a2e33]",
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
            <div className="flex items-center gap-1.5">
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
