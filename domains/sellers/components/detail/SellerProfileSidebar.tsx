"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  RiStoreLine,
  RiCheckboxCircleLine,
  RiForbidLine,
} from "react-icons/ri";

import type { SellerProfile } from "../../types/seller.types";
import CustomButton from "@/shared/components/custom-button/custom-button";
import CustomInput from "@/shared/components/custom-input/CustomInput";
import { ConfirmationDialog } from "@/shared/components/confirmation-dialog/ConfirmationDialog";
import SellerStatusBadge from "../SellerStatusBadge";

interface SellerProfileSidebarProps {
  seller: SellerProfile;
  isUpdating: boolean;
  onUpdateStatus: (variables: {
    status: "approved" | "suspended";
    adminNote?: string;
  }) => void;
}

export function SellerProfileSidebar({
  seller,
  isUpdating,
  onUpdateStatus,
}: SellerProfileSidebarProps) {
  const [note, setNote] = useState("");

  return (
    <div className="flex flex-col gap-4 font-sans">
      {/* Visual Identity Card */}
      <div className="bg-white border border-zinc-200 rounded-lg overflow-hidden flex flex-col">
        {/* Banner Frame */}
        <div className="h-24 bg-zinc-100 relative shrink-0">
          {seller.banner ? (
            <Image
              src={seller.banner}
              alt="Store Banner"
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-linear-to-r from-zinc-200 to-zinc-100" />
          )}
          {/* Logo Frame Placement Overlap */}
          <div className="absolute -bottom-6 left-6 w-14 h-14 rounded-lg bg-white border border-zinc-200 flex items-center justify-center p-0.5 overflow-hidden shadow-sm">
            <div className="relative w-full h-full rounded bg-amber-50 flex items-center justify-center overflow-hidden">
              {seller.logo ? (
                <Image
                  src={seller.logo}
                  alt="Store Logo"
                  fill
                  className="object-cover"
                />
              ) : (
                <RiStoreLine className="text-amber-500 text-xl" />
              )}
            </div>
          </div>
        </div>

        {/* Info Metrics Fields Container */}
        <div className="px-6 pt-9 pb-6 space-y-4">
          <div>
            <h2 className="text-lg font-bold text-zinc-900">
              {seller.storeName}
            </h2>
            <p className="text-xs text-zinc-400 font-mono mt-0.5">
              @{seller.storeSlug}
            </p>
          </div>

          {seller.description && (
            <p className="text-sm font-normal text-zinc-500 leading-relaxed bg-zinc-50 rounded-md p-3">
              {seller.description}
            </p>
          )}

          <div className="border-t border-zinc-100 pt-3">
            {[
              { label: "Owner Name", value: seller.userId?.name ?? "—" },
              { label: "Owner Email", value: seller.userId?.email ?? "—" },
              {
                label: "Status",
                value: <SellerStatusBadge status={seller.status} />,
              },
              {
                label: "Rating",
                value: seller.rating ? `★ ${seller.rating}` : "No reviews",
              },
              {
                label: "Total Orders",
                value: seller.totalSales
                  ? `★ ${seller.totalSales}`
                  : "No Orders Yet",
              },
              {
                label: "Registered",
                value: new Date(seller.createdAt).toLocaleDateString("en-EG", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                }),
              },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="flex items-center justify-between py-2.5 border-b border-zinc-50 last:border-0"
              >
                <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                  {label}
                </span>
                <span className="text-sm font-medium text-zinc-700">
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Dynamic Structural Lifecycle Management Console Actions Card */}
      <div className="bg-white border border-zinc-200 rounded-lg p-5 space-y-4">
        <p className="text-sm font-bold text-zinc-700">
          Store Lifecycle Controls
        </p>

        <CustomInput
          name="adminNote"
          type="text"
          placeholder="Append decision feedback statement note..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />

        <div className="flex flex-col gap-2">
          {seller.status !== "approved" && (
            <ConfirmationDialog
              variant="success"
              title="Approve Seller Profile"
              description="This will allow the merchant to activate store configurations and publish inventory data streams."
              confirmText="Approve Store"
              isLoading={isUpdating}
              onConfirm={() =>
                onUpdateStatus({
                  status: "approved",
                  adminNote: note || undefined,
                })
              }
            >
              <CustomButton
                variant="solid"
                theme="success"
                size="md"
                fullWidth
                leftIcon={<RiCheckboxCircleLine />}
              >
                Approve Store
              </CustomButton>
            </ConfirmationDialog>
          )}

          {seller.status !== "suspended" && (
            <ConfirmationDialog
              variant="danger"
              title="Suspend Seller Profile"
              description="This will restrict the merchant from managing orders or listings. All listed items will immediately be made private."
              confirmText="Suspend Store"
              requireCheckbox
              checkboxLabel="I authorize freezing operations for this store profile"
              isLoading={isUpdating}
              onConfirm={() =>
                onUpdateStatus({
                  status: "suspended",
                  adminNote: note || undefined,
                })
              }
            >
              <CustomButton
                variant="soft"
                theme="danger"
                size="md"
                fullWidth
                leftIcon={<RiForbidLine />}
              >
                Suspend Store
              </CustomButton>
            </ConfirmationDialog>
          )}
        </div>

        {seller.adminNote && (
          <div className="text-xs font-medium text-zinc-500 border-t border-zinc-100 pt-3">
            <span className="font-semibold block text-zinc-400 uppercase tracking-wider mb-1">
              Active Admin Note:
            </span>
            <p className="font-mono bg-zinc-50 border border-zinc-100 rounded-md p-2 italic">
              &quot;{seller.adminNote}&quot;
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
