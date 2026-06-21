"use client";

import React, { useEffect, useState } from "react";
import { RiAddLine, RiBox3Line } from "react-icons/ri";
import Link from "next/link";

import {
  useAdminProducts,
  useAdminForceArchiveProduct,
} from "../hooks/useAdminProducts";
import useAdminProductsColumns from "../hooks/columns/useAdminProductsColumns";
import { ProductFilterBar } from "../components/ProductFilterBar";
import type { ProductStatus, ProductsParams } from "../types/product.types";

import CustomTable from "@/shared/components/custom-table/CustomTable";
import { useAdminSellers } from "@/domains/sellers/hooks/useAdminSellers";
import { useAdminCategories } from "@/domains/categories/hooks/useAdminCategories";
import CustomButton from "@/shared/components/custom-button/custom-button";

export default function AdminProductsPage() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<ProductStatus | "">("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [sellerFilter, setSellerFilter] = useState("");
  const [page, setPage] = useState(1);

  // Debounce setup
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 400);
    return () => clearTimeout(timer);
  }, [search]);

  // Aggregate active selection values
  const params: ProductsParams = {
    search: debouncedSearch || undefined,
    status: statusFilter || undefined,
    category: categoryFilter || undefined,
    seller: sellerFilter || undefined,
    page,
    limit: 10,
  };

  // Fetch product collections data stream
  const { data: listData, isLoading } = useAdminProducts(params);
  const { data: sellers } = useAdminSellers({ page: 1, limit: 100 });
  const { data: categories } = useAdminCategories({ page: 1, limit: 100 });
  const { mutateAsync: forceArchiveAsync, isPending: isArchiving } =
    useAdminForceArchiveProduct();

  const products = listData?.data ?? [];
  const pagination = listData?.pagination;

  const columns = useAdminProductsColumns({
    isArchiving,
    onForceArchive: forceArchiveAsync,
  });

  const handleClearFilters = () => {
    setSearch("");
    setStatusFilter("");
    setCategoryFilter("");
    setSellerFilter("");
    setPage(1);
  };

  return (
    <div className="space-y-4 sm:space-y-5 font-sans min-w-0 w-full">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-0">
        <div className="flex items-center gap-3">
          <h1 className="text-xl sm:text-2xl font-bold text-zinc-900">
            Platform Products
          </h1>
          {!isLoading && (
            <span className="bg-amber-100 text-amber-700 text-xs font-semibold px-2.5 py-0.5 rounded-full">
              {pagination?.total?.toLocaleString()}
            </span>
          )}
        </div>

        {/* Task 1 Addition Link button shortcut layout */}
        <Link href="/admin/products/create" className="w-full sm:w-auto">
          <CustomButton
            variant="solid"
            theme="primary"
            size="md"
            leftIcon={<RiAddLine />}
            className="w-full sm:w-auto"
          >
            Create Product
          </CustomButton>
        </Link>
      </div>

      {/* Code Split Component Filter Bar */}
      <ProductFilterBar
        search={search}
        onSearchChange={(val) => {
          setSearch(val);
          setPage(1);
        }}
        statusFilter={statusFilter}
        onStatusChange={(val) => {
          setStatusFilter(val);
          setPage(1);
        }}
        selectedCategory={categoryFilter}
        onCategoryChange={(val) => {
          setCategoryFilter(val);
          setPage(1);
        }}
        selectedSeller={sellerFilter}
        onSellerChange={(val) => {
          setSellerFilter(val);
          setPage(1);
        }}
        sellers={sellers?.data || []}
        categories={categories?.data || []}
      />

      {/* Main Table Layout */}
      <CustomTable
        columns={columns}
        data={products}
        isLoading={isLoading}
        page={page}
        limit={20}
        totalPages={pagination?.pages}
        totalItems={pagination?.total}
        onPageChange={(newPage) => setPage(newPage)}
        emptyStateIcon={
          <RiBox3Line className="text-5xl text-zinc-300 mx-auto" />
        }
        emptyStateTitle="No products found"
        emptyStateDescription="Try adjusting your search query, seller channel, or parameter filters."
        onClearFilters={handleClearFilters}
      />
    </div>
  );
}
