"use client";

import React, { useState } from "react";
import {
  RiWallet3Line,
  RiExchangeDollarLine,
  RiBankCardLine,
  RiCheckDoubleLine,
} from "react-icons/ri";

import { useSellerPayouts } from "../hooks/useSellerPayouts";
import { SellerPayoutsFilterBar } from "../components/SellerPayoutsFilterBar";
import type { SellerPayoutsParams, PayoutStatus } from "../types/payout.types";
import CustomTable from "@/shared/components/custom-table/CustomTable";
import { StatCard } from "@/shared/components/StatCard";
import { useSellerPayoutsColumns } from "../hooks/useSellerPayoutsColumns";

interface FilterState {
  status: PayoutStatus | "";
  from: string;
  to: string;
}

export default function SellerEarningsPage() {
  const [filters, setFilters] = useState<FilterState>({
    status: "",
    from: "",
    to: "",
  });
  const [page, setPage] = useState(1);
  const limit = 10;

  const params: SellerPayoutsParams = {
    status: filters.status || undefined,
    from: filters.from || undefined,
    to: filters.to || undefined,
    page,
    limit,
  };

  const { data: response, isLoading } = useSellerPayouts(params);
  const columns = useSellerPayoutsColumns();

  const payouts = response?.data?.payouts ?? [];
  const summary = response?.data?.summary;
  const pagination = response?.data?.pagination;

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    setPage(1);
  };

  const formatCurrency = (val?: number) =>
    `EGP ${(val || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}`;

  return (
    <div className="space-y-6 font-sans max-w-6xl pb-12 mx-auto">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
          <RiWallet3Line size={20} />
        </div>
        <div>
          <h1 className="text-xl font-bold text-zinc-900">Earnings</h1>
          <p className="text-xs text-zinc-500 mt-0.5">
            Track your sales revenue, fees, and payout history.
          </p>
        </div>
      </div>

      {!isLoading && summary && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            label="Total Earned"
            value={formatCurrency(summary.totalEarned)}
            icon={RiExchangeDollarLine}
            variant="brand"
            loading={isLoading}
            trend={{ label: "Gross sales before fees" }}
          />
          <StatCard
            label="Platform Fees"
            value={formatCurrency(summary.totalFees)}
            icon={RiBankCardLine}
            variant="info"
            loading={isLoading}
            trend={{ label: "Total commission deducted" }}
          />
          <StatCard
            label="Net Revenue"
            value={formatCurrency(summary.totalNet)}
            icon={RiWallet3Line}
            variant="success"
            loading={isLoading}
            trend={{
              label: `${summary.totalPaid > 0 ? `EGP ${summary.totalPaid.toLocaleString()} settled` : "Awaiting settlement"}`,
            }}
          />
          <StatCard
            label="Paid"
            value={formatCurrency(summary.totalPaid)}
            icon={RiCheckDoubleLine}
            variant="default"
            loading={isLoading}
            trend={{ label: "Successfully disbursed" }}
          />
        </div>
      )}

      <SellerPayoutsFilterBar
        filters={filters}
        onFilterChange={handleFilterChange}
      />

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
          emptyStateTitle="No payouts yet"
          emptyStateDescription="Sales will appear here once admin processes your payouts."
          onClearFilters={() => {
            setFilters({ status: "", from: "", to: "" });
            setPage(1);
          }}
          title="Payout History"
        />
      </div>
    </div>
  );
}
