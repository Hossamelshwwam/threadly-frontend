"use client";

import { useEffect, useState } from "react";
import { RiSearchLine, RiStoreLine } from "react-icons/ri";

import { useAdminSellers } from "../hooks/useAdminSellers";
import useAdminSellersColumns from "../hooks/useAdminSellersColumns";
import type { SellerStatus, AdminSellersParams } from "../types/seller.types";

import CustomInput from "@/shared/components/custom-input/CustomInput";
import CustomTable from "@/shared/components/custom-table/CustomTable";
import { cn } from "@/shared/lib";
import { useUpdateSellerStatus } from "../hooks/useUpdateSellerStatus";

const STATUS_FILTERS: { label: string; value: SellerStatus | "" }[] = [
  { label: "All", value: "" },
  { label: "Pending", value: "pending" },
  { label: "Approved", value: "approved" },
  { label: "Suspended", value: "suspended" },
];

export default function AdminSellersPage() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<SellerStatus | "">("");
  const [page, setPage] = useState(1);

  // Consume Async Mutation Actions for our Toaster Tracking Pipeline
  const { mutateAsync: updateStatusAsync, isPending: isUpdating } =
    useUpdateSellerStatus();

  const columns = useAdminSellersColumns({ isUpdating, updateStatusAsync });

  // Debounce filter modifications
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 400);
    return () => clearTimeout(timer);
  }, [search]);

  const params: AdminSellersParams = {
    search: debouncedSearch || undefined,
    status: statusFilter || undefined,
    page,
    limit: 20,
  };

  const { data, isLoading } = useAdminSellers(params);

  const sellers = data?.data ?? [];
  const pagination = data?.pagination;

  const clearFilters = () => {
    setSearch("");
    setStatusFilter("");
    setPage(1);
  };

  return (
    <div className="space-y-5 font-sans">
      {/* Page Header */}
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-bold text-zinc-900">Sellers</h1>
        {!isLoading && (
          <span className="bg-amber-100 text-amber-700 text-xs font-semibold px-2 py-0.5 rounded-full">
            {pagination?.total?.toLocaleString()}
          </span>
        )}
      </div>

      {/* Filter Action Strip */}
      <div className="bg-white border border-zinc-200 rounded-lg px-4 py-3 flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <CustomInput
            name="search"
            type="text"
            placeholder="Search by store name or owner..."
            Icon={RiSearchLine}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputClassName="bg-zinc-100"
          />
        </div>
        <div className="flex items-center gap-1.5 overflow-x-auto">
          {STATUS_FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => {
                setStatusFilter(f.value);
                setPage(1);
              }}
              className={cn(
                "text-sm font-semibold px-4 py-2 rounded-md transition-colors whitespace-nowrap cursor-pointer",
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

      {/* Table Presenter */}
      <CustomTable
        columns={columns}
        data={sellers}
        isLoading={isLoading}
        emptyStateIcon={
          <RiStoreLine className="text-5xl text-zinc-300 mx-auto" />
        }
        emptyStateTitle="No sellers found"
        onClearFilters={clearFilters}
        page={page}
        limit={20}
        totalPages={pagination?.pages}
        totalItems={pagination?.total}
        onPageChange={(newPage) => setPage(newPage)}
      />
    </div>
  );
}
