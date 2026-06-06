"use client";

import React, { useState } from "react";
import {
  RiWallet3Line,
  RiBankCardLine,
  RiTimeLine,
  RiCheckDoubleLine,
} from "react-icons/ri";

import { useAdminPayouts } from "../hooks/useAdminPayouts";
import { useAdminPayoutsColumns } from "../hooks/useAdminPayoutsColumns";
import {
  PayoutsFilterBar,
  type PayoutFiltersState,
} from "../components/PayoutsFilterBar";
import type { AdminPayoutsParams } from "../types/payout.types";
import CustomTable from "@/shared/components/custom-table/CustomTable";
import { StatCard } from "@/shared/components/admin/StatCard";

export default function AdminPayoutsPage() {
  const [activeFilters, setActiveFilters] = useState<PayoutFiltersState>({
    status: "",
    seller: "",
    from: "",
    to: "",
  });

  const [page, setPage] = useState(1);
  const limit = 10;

  const params: AdminPayoutsParams = {
    status: activeFilters.status || undefined,
    seller: activeFilters.seller || undefined,
    from: activeFilters.from || undefined,
    to: activeFilters.to || undefined,
    page,
    limit,
  };

  const { data: response, isLoading } = useAdminPayouts(params);

  // ✨ CRITICAL FIX: Extracting from the new nested API response structure
  const payouts = response?.data?.payouts ?? [];
  const summary = response?.data?.summary;
  const pagination = response?.pagination;

  const columns = useAdminPayoutsColumns();

  const handleApplyFilters = (newFilters: PayoutFiltersState) => {
    setActiveFilters(newFilters);
    setPage(1);
  };

  const handleClearFilters = () => {
    setActiveFilters({ status: "", seller: "", from: "", to: "" });
    setPage(1);
  };

  const formatCurrency = (val?: number) =>
    `EGP ${(val || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}`;

  return (
    <div className="space-y-6 font-sans">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
          <RiWallet3Line size={20} />
        </div>
        <div>
          <h1 className="text-xl font-bold text-zinc-900">
            Seller Settlements
          </h1>
          <p className="text-xs text-zinc-500 mt-0.5">
            Manage and process payout requests to vendor bank accounts.
          </p>
        </div>
      </div>

      {/* Financial Dashboard Summary Ribbon */}
      {!isLoading && summary && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* 1. Total Net Due to Vendors (Platform Liability) */}
          <StatCard
            label="Total Net Payable"
            value={formatCurrency(summary?.totalNet)}
            icon={RiWallet3Line}
            variant="brand" // Solid Amber Accent
            loading={isLoading}
            trend={{
              label: `EGP ${(summary?.totalAmount ?? 0).toLocaleString()} Gross sales volume`,
            }}
          />

          {/* 2. Payouts Waiting to be Wire Transferred */}
          <StatCard
            label="Pending Settlements"
            value={formatCurrency(summary?.totalPending)}
            icon={RiTimeLine}
            variant="warning" // Soft Orange/Amber Background
            loading={isLoading}
            trend={{
              label: `${summary?.totalProcessing ?? 0} transfers currently processing`,
            }}
          />

          {/* 3. Platform's Cut (Pure Platform Profit) */}
          <StatCard
            label="Platform Revenue"
            value={formatCurrency(summary?.totalFees)}
            icon={RiBankCardLine}
            variant="info" // Soft Blue Background
            loading={isLoading}
            trend={{ label: "Total commission fees earned" }}
          />

          {/* 4. Money Successfully Disbursed and Closed */}
          <StatCard
            label="Successful Settlements"
            value={formatCurrency(summary?.totalPaid)} // 🌟 FIXED: Changed from totalFees to totalPaid
            icon={RiCheckDoubleLine}
            variant="success" // Soft Green Background
            loading={isLoading}
            trend={{
              label: summary?.totalRejected
                ? `${summary.totalRejected} requests rejected by admin`
                : "All cleared disbursements",
            }}
          />
        </div>
      )}

      {/* Filter Bar */}
      <PayoutsFilterBar
        key={JSON.stringify(activeFilters)}
        initialFilters={activeFilters}
        onApply={handleApplyFilters}
        onReset={handleClearFilters}
      />

      {/* Data Table */}
      <div className="bg-white border border-zinc-200 rounded-lg shadow-xs overflow-hidden">
        <CustomTable
          columns={columns}
          data={payouts}
          isLoading={isLoading}
          page={page}
          limit={limit}
          totalPages={pagination?.pages}
          totalItems={pagination?.total}
          onPageChange={(newPage) => setPage(newPage)}
          emptyStateIcon={
            <RiWallet3Line className="text-5xl text-zinc-300 mx-auto" />
          }
          emptyStateTitle="No payouts found"
          emptyStateDescription="Try adjusting your date range or status filters."
          onClearFilters={handleClearFilters}
          title="Payout Requests Ledger"
        />
      </div>
    </div>
  );
}
