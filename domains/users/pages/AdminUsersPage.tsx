"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  RiSearchLine,
  RiEyeLine,
  RiUserForbidLine,
  RiUserFollowLine,
  RiUserLine,
  RiCheckboxCircleLine,
  RiCloseCircleLine,
} from "react-icons/ri";
import { useAdminUsers } from "../hooks/useAdminUsers";
import { useToggleUserStatus } from "../hooks/useToggleUserStatus";
import type {
  UserProfile,
  UserRole,
  AdminUsersParams,
} from "../types/user.types";
import CustomButton from "@/shared/components/custom-button/custom-button";
import CustomInput from "@/shared/components/custom-input/CustomInput";
import { cn } from "@/lib/utils";
import { ConfirmationDialog } from "@/shared/components/confirmation-dialog/ConfirmationDialog";

const ROLE_FILTERS: { label: string; value: UserRole | "" }[] = [
  { label: "All", value: "" },
  { label: "Buyer", value: "buyer" },
  { label: "Seller", value: "seller" },
];

function RoleBadge({ role }: { role: UserRole }) {
  const styles = {
    buyer: "bg-amber-50 text-amber-700 border-amber-200",
    seller: "bg-zinc-100 text-zinc-700 border-zinc-200",
    admin: "bg-zinc-800 text-white border-zinc-800",
  };
  return (
    <span
      className={cn(
        "text-xs font-600 px-2 py-0.5 rounded-md border capitalize",
        styles[role],
      )}
    >
      {role}
    </span>
  );
}

function StatusBadge({ isActive }: { isActive: boolean }) {
  return (
    <span
      className={cn(
        "text-xs font-600 px-2 py-0.5 rounded-md border",
        isActive
          ? "bg-[#edf5f1] text-[#3d7a5e] border-[#3d7a5e33]"
          : "bg-[#fdf0ee] text-[#b03a2e] border-[#b03a2e33]",
      )}
    >
      {isActive ? "Active" : "Suspended"}
    </span>
  );
}

function TableSkeleton() {
  return (
    <>
      {Array.from({ length: 6 }).map((_, i) => (
        <tr key={i} className="border-b border-zinc-50">
          <td className="px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-zinc-100 animate-pulse shrink-0" />
              <div className="space-y-1.5">
                <div className="h-3.5 w-32 rounded bg-zinc-100 animate-pulse" />
                <div className="h-3 w-24 rounded bg-zinc-100 animate-pulse" />
              </div>
            </div>
          </td>
          {["w-16", "w-14", "w-6", "w-20", "w-16"].map((w, j) => (
            <td key={j} className="px-5 py-4">
              <div className={cn("h-4 rounded bg-zinc-100 animate-pulse", w)} />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}

export default function AdminUsersPage() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<UserRole | "">("");
  const [page, setPage] = useState(1);

  const { mutate: toggleStatus, isPending: isToggling } = useToggleUserStatus();

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 400);
    return () => clearTimeout(timer);
  }, [search]);
  const params: AdminUsersParams = {
    search: debouncedSearch || undefined,
    role: roleFilter || undefined,
    page,
    limit: 20,
  };

  const { data, isLoading } = useAdminUsers(params);

  const users = data?.data ?? [];
  const pagination = data?.pagination;
  const total = pagination?.total ?? 0;
  const totalPages = pagination?.totalPages ?? 1;

  const start = total === 0 ? 0 : (page - 1) * 20 + 1;
  const end = Math.min(page * 20, total);

  const clearFilters = () => {
    setSearch("");
    setRoleFilter("");
    setPage(1);
  };

  return (
    <div className="space-y-5">
      {/* Page header */}
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-700 text-zinc-900">Users</h1>
        {!isLoading && (
          <span className="bg-amber-100 text-amber-700 text-xs font-600 px-2 py-0.5 rounded-full">
            {total.toLocaleString()}
          </span>
        )}
      </div>

      {/* Filter bar */}
      <div className="bg-white border border-zinc-200 rounded-lg px-4 py-3 flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <CustomInput
            name="search"
            type="text"
            placeholder="Search by name or email..."
            Icon={RiSearchLine}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputClassName="bg-zinc-100"
          />
        </div>
        <div className="flex items-center gap-1.5">
          {ROLE_FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setRoleFilter(f.value)}
              className={cn(
                "text-sm font-600 px-4 py-2 rounded-md transition-colors",
                roleFilter === f.value
                  ? "bg-amber-400 text-white"
                  : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200",
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-zinc-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-100">
                {[
                  "User",
                  "Role",
                  "Status",
                  "Verified",
                  "Joined",
                  "Actions",
                ].map((col) => (
                  <th
                    key={col}
                    className="text-left px-5 py-3 text-xs font-600 text-zinc-400 uppercase tracking-wider whitespace-nowrap"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-50">
              {isLoading ? (
                <TableSkeleton />
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-16 text-center">
                    <RiUserLine className="text-5xl text-zinc-300 mx-auto" />
                    <p className="text-zinc-500 font-600 mt-3">
                      No users found
                    </p>
                    <p className="text-zinc-400 text-sm mt-1">
                      Try adjusting your search or filters
                    </p>
                    <div className="mt-4 flex justify-center">
                      <CustomButton
                        variant="outline"
                        theme="neutral"
                        size="sm"
                        onClick={clearFilters}
                      >
                        Clear filters
                      </CustomButton>
                    </div>
                  </td>
                </tr>
              ) : (
                users.map((user: UserProfile) => (
                  <tr
                    key={user._id}
                    className="hover:bg-zinc-50/60 transition-colors"
                  >
                    {/* User */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-amber-100 text-amber-700 font-700 flex items-center justify-center text-sm shrink-0">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-600 text-zinc-800">{user.name}</p>
                          <p className="text-xs text-zinc-400">{user.email}</p>
                        </div>
                      </div>
                    </td>

                    {/* Role */}
                    <td className="px-5 py-4">
                      <RoleBadge role={user.role} />
                    </td>

                    {/* Status */}
                    <td className="px-5 py-4">
                      <StatusBadge isActive={user.isActive} />
                    </td>

                    {/* Verified */}
                    <td className="px-5 py-4">
                      {user.isVerified ? (
                        <RiCheckboxCircleLine className="text-base text-[#3d7a5e]" />
                      ) : (
                        <RiCloseCircleLine className="text-base text-[#b03a2e]" />
                      )}
                    </td>

                    {/* Joined */}
                    <td className="px-5 py-4 text-zinc-400 text-xs whitespace-nowrap">
                      {new Date(user.createdAt).toLocaleDateString("en-EG", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1.5">
                        <Link href={`/admin/users/${user._id}`}>
                          <CustomButton
                            variant="ghost"
                            theme="neutral"
                            size="sm"
                            iconOnly
                            rightIcon={<RiEyeLine />}
                          ></CustomButton>
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
                            ></CustomButton>
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
                            ></CustomButton>
                          </ConfirmationDialog>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {!isLoading && users.length > 0 && (
          <div className="flex items-center justify-between px-5 py-4 border-t border-zinc-100">
            <p className="text-sm text-zinc-500">
              Showing {start}–{end} of {total.toLocaleString()} users
            </p>
            <div className="flex items-center gap-2">
              <CustomButton
                variant="outline"
                theme="neutral"
                size="sm"
                disabled={page <= 1}
                onClick={() => setPage((p) => p - 1)}
              >
                Previous
              </CustomButton>
              <span className="text-sm text-zinc-400 px-2">
                {page} / {totalPages}
              </span>
              <CustomButton
                variant="outline"
                theme="neutral"
                size="sm"
                disabled={page >= totalPages}
                onClick={() => setPage((p) => p + 1)}
              >
                Next
              </CustomButton>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
