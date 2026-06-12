"use client";

import {
  RiBankCardLine,
  RiShoppingBag3Line,
  RiStarLine,
  RiBox3Line,
} from "react-icons/ri";
import { StatCard } from "@/shared/components/StatCard";
import { RecentOrdersWidget } from "../components/dashboard/RecentOrdersWidget";
import { EarningsSnapshotWidget } from "../components/dashboard/EarningsSnapshotWidget";
import { QuickActionsWidget } from "../components/dashboard/QuickActionsWidget";
import { useGetMyStore } from "../hooks/useGetMyStore";
import { useSellerOrders } from "@/domains/orders/hooks/useSellerOrders";
import { useSellerProducts } from "@/domains/products/hooks/useSellerProducts";
import { useSellerPayouts } from "@/domains/payouts/hooks/useSellerPayouts";

export default function SellerDashboardPage() {
  const { data: storeData, isLoading: storeLoading } = useGetMyStore();
  const { data: ordersData, isLoading: ordersLoading } = useSellerOrders({
    limit: 5,
  });
  const { data: productsData, isLoading: productsLoading } = useSellerProducts({
    limit: 1,
  });
  const { data: payoutsData, isLoading: payoutsLoading } = useSellerPayouts({
    limit: 1,
  });

  const storeProfile = storeData?.data;
  const rating = storeProfile?.rating;
  const storeName = storeProfile?.storeName;
  const totalOrders = ordersData?.pagination?.total ?? 0;
  const totalProducts = productsData?.pagination?.total ?? 0;
  const summary = payoutsData?.data?.summary;
  const recentOrders = ordersData?.data ?? [];

  const statsLoading =
    storeLoading || ordersLoading || productsLoading || payoutsLoading;

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-zinc-900">
          {storeLoading ? (
            <span className="inline-block h-7 w-48 bg-zinc-100 rounded animate-pulse align-middle" />
          ) : (
            `Welcome back, ${storeName ?? "Seller"}!`
          )}
        </h1>
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
          label="Total Revenue"
          value={
            payoutsLoading
              ? "—"
              : `EGP ${(summary?.totalEarned ?? 0).toLocaleString()}`
          }
          icon={RiBankCardLine}
          loading={payoutsLoading}
          variant="brand"
          trend={{ label: "Lifetime earnings before fees" }}
        />
        <StatCard
          label="Total Orders"
          value={statsLoading ? "—" : totalOrders.toLocaleString()}
          icon={RiShoppingBag3Line}
          loading={ordersLoading}
          trend={{ label: "Across all your products" }}
        />
        <StatCard
          label="Store Rating"
          value={
            storeLoading
              ? "—"
              : rating
                ? `${rating.toFixed(1)} ★`
                : "—"
          }
          icon={RiStarLine}
          loading={storeLoading}
          trend={{
            label: rating
              ? `${storeProfile?.totalSales ?? 0} sale${storeProfile?.totalSales === 1 ? "" : "s"}`
              : "No ratings yet",
          }}
        />
        <StatCard
          label="Active Products"
          value={statsLoading ? "—" : totalProducts.toLocaleString()}
          icon={RiBox3Line}
          loading={productsLoading}
          trend={{ label: "Currently listed" }}
        />
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <RecentOrdersWidget orders={recentOrders} loading={ordersLoading} />
        </div>
        <div className="flex flex-col gap-6">
          <EarningsSnapshotWidget summary={summary} loading={payoutsLoading} />
          <QuickActionsWidget />
        </div>
      </div>
    </div>
  );
}
