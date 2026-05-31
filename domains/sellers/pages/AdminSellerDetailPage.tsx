"use client";

import React from "react";
import Link from "next/link";
import { RiArrowLeftLine, RiBox3Line } from "react-icons/ri";

import { useAdminSeller } from "../hooks/useAdminSellers";
import { SellerProfileSidebar } from "../components/detail/SellerProfileSidebar";
import { SellerBankDetails } from "../components/detail/SellerBankDetails";

import CustomButton from "@/shared/components/custom-button/custom-button";
import CustomTable from "@/shared/components/custom-table/CustomTable";
import { toast } from "sonner";
import { useUpdateSellerStatus } from "../hooks/useUpdateSellerStatus";

function DetailSkeleton() {
  return (
    <div className="lg:grid-cols-3 grid gap-6">
      <div className="col-span-1 space-y-4">
        <div className="bg-white border border-zinc-200 rounded-lg h-100 animate-pulse" />
        <div className="bg-white border border-zinc-200 rounded-lg h-50 animate-pulse" />
      </div>
      <div className="col-span-2 space-y-4">
        <div className="bg-white border border-zinc-200 rounded-lg h-37.5 animate-pulse" />
        <div className="bg-white border border-zinc-200 rounded-lg h-75 animate-pulse" />
      </div>
    </div>
  );
}

interface Props {
  id: string;
}

export default function AdminSellerDetailPage({ id }: Props) {
  const { data, isLoading } = useAdminSeller(id);
  const { mutateAsync: updateStatus, isPending: isUpdating } =
    useUpdateSellerStatus();

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-5 w-32 rounded bg-zinc-100 animate-pulse" />
        <DetailSkeleton />
      </div>
    );
  }

  const seller = data?.data;

  const updateStatusHandler = (data: {
    status: "approved" | "suspended";
    note?: string;
  }) => {
    toast.promise(
      updateStatus({
        id,
        status: data.status,
        adminNote: data.note || undefined,
      }),
      {
        loading: "Updating status...",
        success: "Status updated successfully",
        error: "Failed to update status",
      },
    );
  };

  if (!seller) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center font-sans">
        <p className="text-zinc-500 font-600 text-lg">
          Seller profile data not found
        </p>
        <Link href="/admin/sellers" className="mt-4">
          <CustomButton variant="outline" theme="neutral" size="sm">
            Back to Sellers
          </CustomButton>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 font-sans">
      {/* Return Anchor Navigation Node */}
      <Link
        href="/admin/sellers"
        className="inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-800 transition-colors w-fit"
      >
        <RiArrowLeftLine />
        Back to Sellers
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Informational Sidebar Column */}
        <div className="col-span-1">
          <SellerProfileSidebar
            seller={seller}
            isUpdating={isUpdating}
            onUpdateStatus={updateStatusHandler}
          />
        </div>

        {/* Right Tabular Ledger Details Block Matrix Column */}
        <div className="col-span-1 lg:col-span-2 flex flex-col gap-6">
          <SellerBankDetails seller={seller} />

          {/* Placeholder for Seller Catalog Analytics (Items/Payout Streams) */}
          <CustomTable
            title="Listed Inventory Overview"
            columns={[]}
            data={[]}
            isLoading={false}
            emptyStateIcon={
              <RiBox3Line className="text-5xl text-zinc-300 mx-auto" />
            }
            emptyStateTitle="No public products assigned"
            emptyStateDescription="Product catalog management structures will display here"
          />
        </div>
      </div>
    </div>
  );
}
