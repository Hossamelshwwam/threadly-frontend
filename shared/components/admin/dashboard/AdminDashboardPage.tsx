"use client";

import {
  RiUserLine,
  RiStoreLine,
  RiShoppingBag3Line,
  RiBankCardLine,
} from "react-icons/ri";
import { StatCard } from "@/shared/components/admin/dashboard/StatCard";
import { RecentOrdersWidget } from "@/shared/components/admin/dashboard/RecentOrdersWidget";
import { PendingSellersWidget } from "@/shared/components/admin/dashboard/PendingSellersWidget";
import { PayoutStatsWidget } from "@/shared/components/admin/dashboard/PayoutStatsWidget";
import { useAdminOrders } from "@/domains/orders/hooks/useAdminOrders";
import { useAdminSellers } from "@/domains/sellers/hooks/useAdminSellers";
import { useAdminUsers } from "@/domains/users/hooks/useAdminUsers";
import { useAdminPayoutStats } from "@/domains/payouts/hooks/useAdminPayouts";

export default function AdminDashboardPage() {
  // Data fetching
  const { data: ordersData, isLoading: ordersLoading } = useAdminOrders({
    limit: 8,
  });

  const { data: pendingSellersData, isLoading: pendingSellersLoading } =
    useAdminSellers({ status: "pending", limit: 5 });

  const { data: usersData, isLoading: usersLoading } = useAdminUsers({
    limit: 1,
  });

  const { data: allSellersData, isLoading: allSellersLoading } =
    useAdminSellers({ limit: 1 });

  const { data: payoutStatsData, isLoading: payoutStatsLoading } =
    useAdminPayoutStats();

  // Derived values
  const totalUsers = usersData?.pagination?.total ?? 0;
  const totalSellers = allSellersData?.pagination?.total ?? 0;
  const totalOrders = ordersData?.pagination?.total ?? 0;
  const pendingPayoutsCount = payoutStatsData?.data?.pending?.count ?? 0;
  const pendingPayoutsAmount = payoutStatsData?.data?.pending?.netAmount ?? 0;

  const recentOrders = ordersData?.data ?? [];
  const pendingSellers = pendingSellersData?.data ?? [];

  const statsLoading =
    ordersLoading || usersLoading || allSellersLoading || payoutStatsLoading;

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-700 text-zinc-900">Overview</h1>
        <p className="text-sm text-zinc-400 mt-0.5">
          {new Date().toLocaleDateString("en-EG", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          label="Total Users"
          value={statsLoading ? "—" : totalUsers.toLocaleString()}
          icon={RiUserLine}
          loading={statsLoading}
          trend={{ label: "All registered users" }}
        />
        <StatCard
          label="Total Sellers"
          value={statsLoading ? "—" : totalSellers.toLocaleString()}
          icon={RiStoreLine}
          loading={allSellersLoading}
          trend={{
            label: `${pendingSellersData?.pagination?.total ?? 0} pending approval`,
          }}
        />
        <StatCard
          label="Total Orders"
          value={statsLoading ? "—" : totalOrders.toLocaleString()}
          icon={RiShoppingBag3Line}
          loading={ordersLoading}
          trend={{ label: "Across all sellers" }}
        />
        <StatCard
          label="Pending Payouts"
          value={
            payoutStatsLoading
              ? "—"
              : `EGP ${pendingPayoutsAmount.toLocaleString()}`
          }
          icon={RiBankCardLine}
          loading={payoutStatsLoading}
          accent
          trend={{
            label: `${pendingPayoutsCount} payout${pendingPayoutsCount !== 1 ? "s" : ""} awaiting`,
          }}
        />
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Recent orders — takes 2/3 */}
        <div className="xl:col-span-2">
          <RecentOrdersWidget orders={recentOrders} loading={ordersLoading} />
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-6">
          <PendingSellersWidget
            sellers={pendingSellers}
            loading={pendingSellersLoading}
          />
          <PayoutStatsWidget
            stats={payoutStatsData?.data}
            loading={payoutStatsLoading}
          />
        </div>
      </div>
    </div>
  );
}
