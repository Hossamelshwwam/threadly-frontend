"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { RiAddLine, RiSearchLine, RiWallet3Line } from "react-icons/ri";

import CustomButton from "@/shared/components/custom-button/custom-button";
import CustomTable from "@/shared/components/custom-table/CustomTable";

import { useSellerProducts } from "../hooks/useSellerProducts";
import useSellerProductsColumns from "../hooks/columns/useSellerProductsColumns";
import CustomInput from "@/shared/components/custom-input/CustomInput";
import { ProductsParams, ProductStatus } from "../types/product.types";
import { ProductFilterBar } from "../components/ProductFilterBar";
import { useGetMe } from "@/domains/users/hooks/useGetMe";
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

  const products = data?.data || [];
  const pagination = data?.pagination;

  const { data: categories } = useListCategories();

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header Area */}

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
          <RiWallet3Line className="text-5xl text-zinc-300 mx-auto" />
        }
        emptyStateTitle="No products found"
        emptyStateDescription="Try another status filters."
        title="Seller Products"
      />
    </div>
  );
}
