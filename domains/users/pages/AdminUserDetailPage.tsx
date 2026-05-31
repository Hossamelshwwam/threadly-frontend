"use client";

import Link from "next/link";
import { RiArrowLeftLine, RiShoppingBag3Line } from "react-icons/ri";

import { useAdminUser } from "../hooks/useAdminUser";
import { useToggleUserStatus } from "../hooks/useToggleUserStatus";
import { useUserOrdersColumns } from "../hooks/useUserOrdersColumns";

import { UserProfileSidebar } from "../components/detail/UserProfileSidebar";
import { UserStatsOverview } from "../components/detail/UserStatsOverview";

import CustomButton from "@/shared/components/custom-button/custom-button";
import CustomTable from "@/shared/components/custom-table/CustomTable";

// Detail Skeleton Matching the Main Architecture Scale
function DetailSkeleton() {
  return (
    <div className="lg:grid-cols-3 grid gap-6">
      <div className="col-span-1 space-y-4">
        <div className="bg-white border border-zinc-200 rounded-lg p-6 space-y-6">
          <div className="flex flex-col items-center gap-3">
            <div className="w-16 h-16 rounded-full bg-zinc-100 animate-pulse" />
            <div className="h-5 w-32 rounded bg-zinc-100 animate-pulse" />
            <div className="h-3.5 w-40 rounded bg-zinc-100 animate-pulse" />
          </div>
          <div className="border-t border-zinc-100 pt-4 space-y-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex justify-between">
                <div className="h-3.5 w-16 rounded bg-zinc-100 animate-pulse" />
                <div className="h-3.5 w-24 rounded bg-zinc-100 animate-pulse" />
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white border border-zinc-200 rounded-lg p-5">
          <div className="h-10 rounded-md bg-zinc-100 animate-pulse" />
        </div>
      </div>
      <div className="col-span-2 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          {[0, 1].map((i) => (
            <div
              key={i}
              className="bg-white border border-zinc-200 rounded-lg p-5 space-y-3"
            >
              <div className="h-4 w-20 rounded bg-zinc-100 animate-pulse" />
              <div className="h-8 w-24 rounded bg-zinc-100 animate-pulse" />
            </div>
          ))}
        </div>
        <div className="h-60 rounded-lg bg-white border border-zinc-200 animate-pulse" />
      </div>
    </div>
  );
}

interface Props {
  id: string;
}

export default function AdminUserDetailPage({ id }: Props) {
  const { data, isLoading } = useAdminUser(id);
  const { mutate: toggleStatus, isPending: isToggling } = useToggleUserStatus();
  const columns = useUserOrdersColumns();

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-5 w-32 rounded bg-zinc-100 animate-pulse" />
        <DetailSkeleton />
      </div>
    );
  }

  const user = data?.data?.user;
  const stats = data?.data?.stats;
  const recentOrders = data?.data?.recentOrders ?? [];

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <p className="text-zinc-500 font-600 text-lg">User not found</p>
        <Link href="/admin/users" className="mt-4">
          <CustomButton variant="outline" theme="neutral" size="sm">
            Back to Users
          </CustomButton>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 font-sans">
      {/* Back button link */}
      <Link
        href="/admin/users"
        className="inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-800 transition-colors w-fit"
      >
        <RiArrowLeftLine />
        Back to Users
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Profile Context Sidebar Column */}
        <div className="col-span-1">
          <UserProfileSidebar
            user={user}
            isToggling={isToggling}
            onToggleStatus={toggleStatus}
          />
        </div>

        {/* Right Dashboard Data Streams Analytics Column */}
        <div className="col-span-1 lg:col-span-2 flex flex-col gap-6">
          <UserStatsOverview
            orderCount={stats?.orderCount ?? 0}
            totalSpent={stats?.totalSpent ?? 0}
          />

          {/* User History Interactive Order Ledger */}
          <CustomTable
            title="Recent Orders"
            columns={columns}
            data={recentOrders}
            emptyStateIcon={
              <RiShoppingBag3Line className="text-5xl text-zinc-300 mx-auto" />
            }
            emptyStateTitle="No orders yet"
            emptyStateDescription="This user has not placed any platform orders yet"
          />
        </div>
      </div>
    </div>
  );
}
