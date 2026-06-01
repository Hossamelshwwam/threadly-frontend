"use client";

import { useEffect, useState } from "react";
import { RiSearchLine, RiUserLine } from "react-icons/ri";
import { useAdminUsers } from "../hooks/useAdminUsers";
import { useToggleUserStatus } from "../hooks/useToggleUserStatus";
import type { UserRole, AdminUsersParams } from "../types/user.types";
import CustomInput from "@/shared/components/custom-input/CustomInput";
import { cn } from "@/lib/utils";
import useAdminUsersColumns from "../hooks/useAdminUsersColumns";
import CustomTable from "@/shared/components/custom-table/CustomTable";
import { toast } from "sonner";

const ROLE_FILTERS: { label: string; value: UserRole | "" }[] = [
  { label: "All", value: "" },
  { label: "Buyer", value: "buyer" },
  { label: "Seller", value: "seller" },
];

export default function AdminUsersPage() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<UserRole | "">("");
  const [page, setPage] = useState(1);

  const { mutateAsync: toggleStatus, isPending: isToggling } =
    useToggleUserStatus();

  const hanleToggleStatus = (data: { id: string; isActive: boolean }) => {
    toast.promise(toggleStatus({ id: data.id, isActive: data.isActive }), {
      loading: "Loading...",
      success: "User status updated successfully",
      error: (err: any) =>
        err?.response?.data?.message || "Error updating user status",
    });
  };
  const { columns } = useAdminUsersColumns({ isToggling, hanleToggleStatus });
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

  const clearFilters = () => {
    setSearch("");
    setRoleFilter("");
    setPage(1);
  };

  return (
    <div className="space-y-5">
      {/* Page header */}
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-bold text-zinc-900">Users</h1>
        {!isLoading && (
          <span className="bg-amber-100 text-amber-700 text-xs font-semibold px-2 py-0.5 rounded-full">
            {pagination?.total?.toLocaleString()}
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
          />
        </div>
        <div className="flex items-center gap-1.5">
          {ROLE_FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setRoleFilter(f.value)}
              className={cn(
                "text-sm font-semibold px-4 py-2 rounded-md transition-colors",
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
      <CustomTable
        columns={columns}
        data={users}
        isLoading={isLoading}
        emptyStateIcon={
          <RiUserLine className="text-5xl text-zinc-300 mx-auto" />
        }
        emptyStateTitle="No users found"
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
