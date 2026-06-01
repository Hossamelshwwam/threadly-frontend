"use client";

import React, { useState } from "react";
import { RiListCheck3 } from "react-icons/ri";
import { toast } from "sonner";

import {
  useAdminCategories,
  useCreateCategory,
  useUpdateCategory,
  useDeleteCategory,
  useUploadCategoryImage,
} from "../hooks/useAdminCategories";
import useAdminCategoriesColumns from "../hooks/useAdminCategoriesColumns";
import type {
  Category,
  AdminCategoriesQueryParams,
} from "../types/category.types";

import { CategoryFilterBar } from "../components/CategoryFilterBar";
import { CategoryFormPanel } from "../components/CategoryFormPanel";
import CustomTable from "@/shared/components/custom-table/CustomTable";

export default function AdminCategoriesPage() {
  const [activeFilter, setActiveFilter] = useState<boolean | "">("");
  const [page, setPage] = useState(1);

  // Form State Configurations
  const [isEditing, setIsEditing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );
  const [name, setName] = useState("");
  const [parentId, setParentId] = useState("");

  const params: AdminCategoriesQueryParams = {
    page,
    limit: 10,
    active: activeFilter !== "" ? (activeFilter as boolean) : undefined,
  };

  const { data: listData, isLoading: isListLoading } =
    useAdminCategories(params);
  const { mutateAsync: createCategory } = useCreateCategory();
  const { mutateAsync: updateCategory, isPending: isUpdating } =
    useUpdateCategory();
  const { mutateAsync: deleteCategory } = useDeleteCategory();
  const { mutateAsync: uploadImageAsync } = useUploadCategoryImage();

  const categories = listData?.data ?? [];
  const pagination = listData?.pagination;

  const handleOpenCreate = () => {
    setIsEditing(false);
    setSelectedCategory(null);
    setName("");
    setParentId("");
  };

  const handleOpenEdit = (category: Category) => {
    setIsEditing(true);
    setSelectedCategory(category);
    setName(category.name);
    const pid =
      typeof category.parentId === "object"
        ? category.parentId?._id
        : category.parentId;
    setParentId(pid || "");
  };

  const handleFilterChange = (value: boolean | "") => {
    setActiveFilter(value);
    setPage(1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    if (isEditing && selectedCategory) {
      toast.promise(
        updateCategory({
          id: selectedCategory._id,
          payload: { name, parentId: parentId || null },
        }),
        {
          loading: "Updating structural configuration...",
          success: () => {
            handleOpenCreate();
            return "Category updated successfully";
          },
          error: (err: any) =>
            err?.response?.data?.message || "Failed to update category",
        },
      );
    } else {
      toast.promise(createCategory({ name, parentId: parentId || null }), {
        loading: "Publishing category element...",
        success: () => {
          handleOpenCreate();
          return "Category created successfully";
        },
        error: (err: any) =>
          err?.response?.data?.message || "Failed to create category",
      });
    }
  };

  const handleToggleStatus = (category: Category) => {
    toast.promise(
      updateCategory({
        id: category._id,
        payload: { isActive: !category.isActive },
      }),
      {
        loading: "Adjusting visibility lifecycle...",
        success: "Category status modified successfully",
        error: (err: any) =>
          err?.response?.data?.message || "Failed to alter status",
      },
    );
  };

  const columns = useAdminCategoriesColumns({
    isUpdating,
    onEdit: handleOpenEdit,
    onToggleStatus: handleToggleStatus,
    onDelete: deleteCategory,
    onUploadImage: (id, file) => uploadImageAsync({ id, file }),
  });

  return (
    <div className="space-y-4 font-sans">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* LEFT VIEW: Interactive Data Grid Panel */}
        <div className="flex-1 space-y-4">
          <CategoryFilterBar
            activeFilter={activeFilter}
            onFilterChange={handleFilterChange}
          />

          <CustomTable
            title="Product Categories"
            columns={columns}
            data={categories}
            isLoading={isListLoading}
            page={page}
            limit={10}
            totalPages={pagination?.pages}
            totalItems={pagination?.total}
            onPageChange={(newPage) => setPage(newPage)}
            emptyStateIcon={
              <RiListCheck3 className="text-5xl text-zinc-300 mx-auto" />
            }
            emptyStateTitle="No matching categories found"
            onClearFilters={handleOpenCreate}
          />
        </div>

        {/* RIGHT VIEW: Sticky Form panel controls descriptor layout */}
        <div className="w-full lg:w-80 shrink-0">
          <CategoryFormPanel
            isEditing={isEditing}
            name={name}
            onNameChange={setName}
            parentId={parentId}
            onParentIdChange={setParentId}
            categories={categories}
            selectedCategory={selectedCategory}
            onSubmit={handleSubmit}
            onCancel={handleOpenCreate}
          />
        </div>
      </div>
    </div>
  );
}
