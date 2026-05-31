"use client";

import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import Link from "next/link";
import {
  RiCheckboxCircleLine,
  RiCloseCircleLine,
  RiEyeLine,
  RiUserFollowLine,
  RiUserForbidLine,
} from "react-icons/ri";

import type { UserProfile } from "../types/user.types";
import CustomButton from "@/shared/components/custom-button/custom-button";
import { ConfirmationDialog } from "@/shared/components/confirmation-dialog/ConfirmationDialog";
import { RoleBadge } from "../components/RoleBadge";
import { StatusBadge } from "../components/StatusBadge";

// ── Hook Interface ───────────────────────────────────────────────────────────
interface UseAdminUsersColumnsProps {
  isToggling: boolean;
  toggleStatus: (variables: { id: string; isActive: boolean }) => void;
}

export default function useAdminUsersColumns({
  isToggling,
  toggleStatus,
}: UseAdminUsersColumnsProps) {
  const columns = useMemo<ColumnDef<UserProfile>[]>(
    () => [
      {
        accessorKey: "name",
        header: "User",
        cell: ({ row }) => {
          const user = row.original;
          return (
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-amber-100 text-amber-700 font-700 flex items-center justify-center text-sm shrink-0">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-600 text-zinc-800">{user.name}</p>
                <p className="text-xs text-zinc-400">{user.email}</p>
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: "role",
        header: "Role",
        cell: ({ row }) => <RoleBadge role={row.original.role} />,
      },
      {
        accessorKey: "isActive",
        header: "Status",
        cell: ({ row }) => <StatusBadge isActive={row.original.isActive} />,
      },
      {
        accessorKey: "isVerified",
        header: "Verified",
        cell: ({ row }) =>
          row.original.isVerified ? (
            <RiCheckboxCircleLine className="text-base text-success" />
          ) : (
            <RiCloseCircleLine className="text-base text-error" />
          ),
      },
      {
        accessorKey: "createdAt",
        header: "Joined",
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
          const user = row.original;
          return (
            <div className="flex items-center gap-1.5">
              <Link href={`/admin/users/${user._id}`}>
                <CustomButton
                  variant="ghost"
                  theme="neutral"
                  size="sm"
                  iconOnly
                  rightIcon={<RiEyeLine />}
                />
              </Link>

              {user.isActive ? (
                <ConfirmationDialog
                  variant="danger"
                  title="Suspend User"
                  description="This will prevent the user from accessing their account."
                  confirmText="Suspend"
                  requireCheckbox
                  checkboxLabel="I confirm I want to suspend this user"
                  isLoading={isToggling}
                  onConfirm={() =>
                    toggleStatus({ id: user._id, isActive: false })
                  }
                >
                  <CustomButton
                    variant="ghost"
                    theme="danger"
                    size="sm"
                    iconOnly
                    rightIcon={<RiUserForbidLine />}
                  />
                </ConfirmationDialog>
              ) : (
                <ConfirmationDialog
                  variant="success"
                  title="Reactivate User"
                  description="This will restore the user's access to their account."
                  confirmText="Reactivate"
                  isLoading={isToggling}
                  onConfirm={() =>
                    toggleStatus({ id: user._id, isActive: true })
                  }
                >
                  <CustomButton
                    variant="ghost"
                    theme="success"
                    size="sm"
                    iconOnly
                    rightIcon={<RiUserFollowLine />}
                  />
                </ConfirmationDialog>
              )}
            </div>
          );
        },
      },
    ],
    [isToggling, toggleStatus],
  );

  return { columns };
}
