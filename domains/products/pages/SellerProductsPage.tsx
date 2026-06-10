"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { RiAddLine, RiStore2Line, RiWallet3Line } from "react-icons/ri";

import CustomButton from "@/shared/components/custom-button/custom-button";
import CustomTable from "@/shared/components/custom-table/CustomTable";

import { useSellerProducts } from "../hooks/useSellerProducts";
import useSellerProductsColumns from "../hooks/columns/useSellerProductsColumns";
import { ProductsParams, ProductStatus } from "../types/product.types";
import { ProductFilterBar } from "../components/ProductFilterBar";
import { useListCategories } from "@/domains/categories/hooks/useCategories";

export default function SellerProductsPage() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<ProductStatus | "">("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [page, setPage] = useState(1);
  const limit = 10;

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 400);
    return () => clearTimeout(timer);
  }, [search]);

  const params: ProductsParams = {
    search: debouncedSearch || undefined,
    status: statusFilter || undefined,
    category: categoryFilter || undefined,
    page,
    limit,
  };

  const { data, isLoading } = useSellerProducts(params);
  const { columns } = useSellerProductsColumns();
  const { data: categories } = useListCategories();

  const products = data?.data || [];
  const pagination = data?.pagination;

  return (
    <div className="max-w-7xl mx-auto space-y-8 font-sans pb-12">
      {/* Merchant Style Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-extrabold text-zinc-900 tracking-tight">
              My Inventory
            </h1>
            {!isLoading && pagination?.total !== undefined && (
              <span className="bg-amber-100 text-amber-800 text-xs font-black px-3 py-1 rounded-lg border border-amber-200/50 shadow-sm">
                {pagination.total.toLocaleString()} Items
              </span>
            )}
          </div>
          <p className="text-sm text-zinc-500 mt-1.5 font-medium">
            Manage your product catalog, tracking, and visibility.
          </p>
        </div>

        <Link href="/seller/products/create" className="w-fit">
          <CustomButton
            variant="solid"
            theme="primary"
            size="md"
            leftIcon={<RiAddLine className="text-lg" />}
            className="rounded-xl shadow-md hover:shadow-lg transition-all px-6"
          >
            Add New Product
          </CustomButton>
        </Link>
      </div>

      {/* New Soft UI Filter Bar */}
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
        enableSeller={false}
        categories={categories?.data || []}
      />

      {/* Data Table */}
      <div className="bg-white border border-zinc-100 rounded-2xl shadow-sm overflow-hidden">
        <CustomTable
          columns={columns}
          data={products}
          isLoading={isLoading}
          page={page}
          limit={limit}
          totalPages={pagination?.pages}
          totalItems={pagination?.total}
          onPageChange={(newPage) => setPage(newPage)}
          emptyStateIcon={
            <RiStore2Line className="text-6xl text-zinc-300 mx-auto" />
          }
          emptyStateTitle="No products found"
          emptyStateDescription="Try adjusting your filters, or add a new product to your catalog to start selling."
        />
      </div>
    </div>
  );
}
