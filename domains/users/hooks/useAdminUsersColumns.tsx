"use client";

import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import Link from "next/link";
import {
  RiCheckboxCircleLine,
  RiCloseCircleLine,
  RiEyeLine,
} from "react-icons/ri";

import type { UserProfile } from "../types/user.types";
import CustomButton from "@/shared/components/custom-button/custom-button";
import { RoleBadge } from "../components/RoleBadge";
import { StatusBadge } from "../components/StatusBadge";
import CustomAvatar from "@/shared/components/custom-avatar/CustomAvatar";

export default function useAdminUsersColumns() {
  const columns = useMemo<ColumnDef<UserProfile>[]>(
    () => [
      {
        accessorKey: "name",
        header: "User",
        cell: ({ row }) => {
          const user = row.original;
          return (
            <div className="flex items-center gap-3">
              <CustomAvatar
                fallback={user.name.charAt(0).toUpperCase()}
                img={user.avatar}
              />
              <div>
                <p className="font-semibold text-zinc-800">{user.name}</p>
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
                  variant="soft"
                  theme="neutral"
                  size="sm"
                  leftIcon={<RiEyeLine />}
                >
                  View Details
                </CustomButton>
              </Link>
            </div>
          );
        },
      },
    ],
    [],
  );

  return { columns };
}
