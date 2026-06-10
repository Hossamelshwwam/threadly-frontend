"use client";

import { useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import Image from "next/image";
import {
  RiEyeLine,
  RiStoreLine,
  RiCheckboxCircleLine,
  RiForbidLine,
} from "react-icons/ri";

import type { SellerProfile } from "../types/seller.types";
import CustomButton from "@/shared/components/custom-button/custom-button";
import { ConfirmationDialog } from "@/shared/components/confirmation-dialog/ConfirmationDialog";
import { toast } from "sonner";
import SellerStatusBadge from "../components/SellerStatusBadge";

interface UseAdminSellersColumnsProps {
  isUpdating: boolean;
  updateStatusAsync: (variables: {
    id: string;
    status: "approved" | "suspended";
    adminNote?: string;
  }) => Promise<any>;
}

export default function useAdminSellersColumns({
  isUpdating,
  updateStatusAsync,
}: UseAdminSellersColumnsProps) {
  return useMemo<ColumnDef<SellerProfile>[]>(
    () => [
      {
        accessorKey: "storeName",
        header: "Store",
        cell: ({ row }) => {
          const seller = row.original;
          return (
            <div className="flex items-center gap-3 font-sans">
              <div className="w-9 h-9 rounded-md bg-amber-50 border border-amber-100 flex items-center justify-center shrink-0 overflow-hidden relative">
                {seller.logo ? (
                  <Image
                    src={seller.logo}
                    alt={seller.storeName}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <RiStoreLine className="text-amber-500 text-base" />
                )}
              </div>
              <div>
                <p className="font-semibold text-zinc-800">
                  {seller.storeName}
                </p>
                <p className="text-xs text-zinc-400">
                  {seller.userId?.name ?? "Unknown Seller"}
                </p>
              </div>
            </div>
          );
        },
      },
      {
        id: "email",
        header: "Owner Email",
        cell: ({ row }) => (
          <span className="text-sm font-normal text-zinc-600">
            {row.original.userId?.email ?? "—"}
          </span>
        ),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => <SellerStatusBadge status={row.original.status} />,
      },
      {
        accessorKey: "createdAt",
        header: "Registered",
        cell: ({ row }) => (
          <span className="text-zinc-400 text-xs whitespace-nowrap">
            {new Date(row.original.createdAt).toLocaleDateString("en-EG", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </span>
        ),
      },
      {
        id: "actions",
        header: "Actions",
        enableSorting: false,
        cell: ({ row }) => {
          const seller = row.original;

          const handleQuickStatusChange = (
            status: "approved" | "suspended",
          ) => {
            const loadingMessage =
              status === "approved"
                ? "Approving store..."
                : "Suspending store...";
            const successMessage =
              status === "approved"
                ? "Store approved successfully"
                : "Store suspended successfully";

            toast.promise(
              updateStatusAsync({
                id: seller._id,
                status,
                adminNote: "Updated from table dashboard list shortcut view.",
              }),
              {
                loading: loadingMessage,
                success: successMessage,
                error: (err: any) =>
                  err?.response?.data?.message ||
                  `Failed to update store to ${status}`,
              },
            );
          };

          return (
            <div className="flex items-center gap-1.5">
              <Link href={`/admin/sellers/${seller._id}`}>
                <CustomButton
                  variant="soft"
                  theme="neutral"
                  size="sm"
                  leftIcon={<RiEyeLine />}
                >
                  View Details
                </CustomButton>
              </Link>

              {seller.status !== "approved" && (
                <ConfirmationDialog
                  variant="success"
                  title="Approve Seller Store"
                  description={`Are you sure you want to approve "${seller.storeName}"? They will be allowed to publish inventory data streams immediately.`}
                  confirmText="Approve Store"
                  isLoading={isUpdating}
                  onConfirm={() => handleQuickStatusChange("approved")}
                >
                  <CustomButton
                    variant="ghost"
                    theme="success"
                    size="sm"
                    iconOnly
                    rightIcon={<RiCheckboxCircleLine />}
                  />
                </ConfirmationDialog>
              )}

              {seller.status !== "suspended" && (
                <ConfirmationDialog
                  variant="danger"
                  title="Suspend Seller Store"
                  description={`Are you sure you want to suspend "${seller.storeName}"? All their listed items will immediately be hidden from the platform.`}
                  confirmText="Suspend Store"
                  requireCheckbox
                  checkboxLabel="I authorize freezing operations for this merchant profile"
                  isLoading={isUpdating}
                  onConfirm={() => handleQuickStatusChange("suspended")}
                >
                  <CustomButton
                    variant="ghost"
                    theme="danger"
                    size="sm"
                    iconOnly
                    rightIcon={<RiForbidLine />}
                  />
                </ConfirmationDialog>
              )}
            </div>
          );
        },
      },
    ],
    [isUpdating, updateStatusAsync],
  );
}
