"use client";

import Link from "next/link";
import {
  RiArrowLeftLine,
  RiShoppingBag3Line,
  RiBankCardLine,
  RiUserForbidLine,
  RiUserFollowLine,
  RiCheckboxCircleLine,
  RiCloseCircleLine,
} from "react-icons/ri";
import { useAdminUser } from "../hooks/useAdminUser";
import { useToggleUserStatus } from "../hooks/useToggleUserStatus";
import type { UserRole } from "../types/user.types";
import CustomButton from "@/shared/components/custom-button/custom-button";
import { cn } from "@/lib/utils";
import { ConfirmationDialog } from "@/shared/components/confirmation-dialog/ConfirmationDialog";

const ORDER_STATUS_STYLES: Record<string, string> = {
  pending: "bg-amber-50 text-amber-700 border-amber-200",
  confirmed: "bg-blue-50 text-blue-700 border-blue-200",
  processing: "bg-zinc-100 text-zinc-700 border-zinc-200",
  shipped: "bg-purple-50 text-purple-700 border-purple-200",
  delivered: "bg-green-50 text-green-700 border-green-200",
  cancelled: "bg-red-50 text-red-700 border-red-200",
};

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

function DetailSkeleton() {
  return (
    <div className="lg:grid-cols-3 grid gap-6">
      <div className="col-span-1 space-y-4">
        <div className="bg-white border border-zinc-200 rounded-lg p-6 space-y-4">
          <div className="flex flex-col items-center gap-3">
            <div className="w-16 h-16 rounded-full bg-zinc-100 animate-pulse" />
            <div className="h-5 w-32 rounded bg-zinc-100 animate-pulse" />
            <div className="h-3.5 w-40 rounded bg-zinc-100 animate-pulse" />
          </div>
          <div className="border-t border-zinc-100 pt-4 space-y-3">
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
        <div className="bg-white border border-zinc-200 rounded-lg overflow-hidden">
          <div className="px-5 py-4 border-b border-zinc-100">
            <div className="h-5 w-32 rounded bg-zinc-100 animate-pulse" />
          </div>
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="px-5 py-4 border-b border-zinc-50 flex gap-4"
            >
              {[1, 2, 3, 4, 5].map((j) => (
                <div
                  key={j}
                  className="h-4 w-20 rounded bg-zinc-100 animate-pulse"
                />
              ))}
            </div>
          ))}
        </div>
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
    <div className="space-y-6">
      {/* Back */}
      <Link
        href="/admin/users"
        className="inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-800 transition-colors"
      >
        <RiArrowLeftLine />
        Back to Users
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT column */}
        <div className="col-span-1 flex flex-col gap-4">
          {/* Profile card */}
          <div className="bg-white border border-zinc-200 rounded-lg p-6">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-700 text-2xl font-700 flex items-center justify-center">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <p className="text-xl font-700 text-zinc-900 mt-3">{user.name}</p>
              <p className="text-sm text-zinc-400 mt-0.5">{user.email}</p>
            </div>

            <div className="border-t border-zinc-100 mt-5 pt-4 space-y-0">
              {[
                {
                  label: "Phone",
                  value: user.phone ?? (
                    <span className="text-zinc-300">Not provided</span>
                  ),
                },
                { label: "Role", value: <RoleBadge role={user.role} /> },
                {
                  label: "Status",
                  value: <StatusBadge isActive={user.isActive} />,
                },
                {
                  label: "Verified",
                  value: user.isVerified ? (
                    <RiCheckboxCircleLine className="text-base text-[#3d7a5e]" />
                  ) : (
                    <RiCloseCircleLine className="text-base text-[#b03a2e]" />
                  ),
                },
                {
                  label: "Joined",
                  value: new Date(user.createdAt).toLocaleDateString("en-EG", {
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
                  <span className="text-xs font-600 text-zinc-400 uppercase tracking-wider">
                    {label}
                  </span>
                  <span className="text-sm font-500 text-zinc-700">
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Actions card */}
          <div className="bg-white border border-zinc-200 rounded-lg p-5">
            <p className="text-sm font-700 text-zinc-700 mb-3">
              Account Actions
            </p>
            {user.isActive ? (
              <ConfirmationDialog
                variant="danger"
                title="Suspend Account"
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
                  variant="soft"
                  theme="danger"
                  size="md"
                  fullWidth
                  leftIcon={<RiUserForbidLine />}
                >
                  Suspend Account
                </CustomButton>
              </ConfirmationDialog>
            ) : (
              <ConfirmationDialog
                variant="success"
                title="Reactivate Account"
                description="This will restore the user's access to their account."
                confirmText="Reactivate"
                isLoading={isToggling}
                onConfirm={() => toggleStatus({ id: user._id, isActive: true })}
              >
                <CustomButton
                  variant="soft"
                  theme="success"
                  size="md"
                  fullWidth
                  leftIcon={<RiUserFollowLine />}
                >
                  Reactivate Account
                </CustomButton>
              </ConfirmationDialog>
            )}
          </div>
        </div>

        {/* RIGHT column */}
        <div className="col-span-1 lg:col-span-2 flex flex-col gap-6">
          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white border border-zinc-200 rounded-lg p-5 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <p className="text-xs font-600 text-zinc-400 uppercase tracking-wider">
                  Total Orders
                </p>
                <span className="w-9 h-9 rounded-md bg-zinc-50 border border-zinc-200 flex items-center justify-center">
                  <RiShoppingBag3Line className="text-amber-500 text-base" />
                </span>
              </div>
              <p className="text-3xl font-700 text-zinc-900">
                {stats?.orderCount ?? 0}
              </p>
            </div>

            <div className="bg-amber-400 border border-amber-400 rounded-lg p-5 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <p className="text-xs font-600 text-amber-100 uppercase tracking-wider">
                  Total Spent
                </p>
                <span className="w-9 h-9 rounded-md bg-amber-500/40 flex items-center justify-center">
                  <RiBankCardLine className="text-white text-base" />
                </span>
              </div>
              <p className="text-3xl font-700 text-white">
                EGP {(stats?.totalSpent ?? 0).toLocaleString()}
              </p>
            </div>
          </div>

          {/* Recent orders */}
          <div className="bg-white border border-zinc-200 rounded-lg overflow-hidden">
            <div className="px-5 py-4 border-b border-zinc-100">
              <h2 className="text-base font-700 text-zinc-900">
                Recent Orders
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-zinc-100">
                    {["Order ID", "Amount", "Status", "Payment", "Date"].map(
                      (col) => (
                        <th
                          key={col}
                          className="text-left px-5 py-3 text-xs font-600 text-zinc-400 uppercase tracking-wider whitespace-nowrap"
                        >
                          {col}
                        </th>
                      ),
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-50">
                  {recentOrders.length === 0 ? (
                    <tr>
                      <td
                        colSpan={5}
                        className="py-10 text-center text-zinc-400 text-sm"
                      >
                        No orders yet
                      </td>
                    </tr>
                  ) : (
                    recentOrders.map((order) => {
                      const statusStyle =
                        ORDER_STATUS_STYLES[order.status] ??
                        "bg-zinc-100 text-zinc-600 border-zinc-200";
                      return (
                        <tr
                          key={order._id}
                          className="hover:bg-zinc-50/60 transition-colors"
                        >
                          <td className="px-5 py-3.5">
                            <Link
                              href={`/admin/orders/${order._id}`}
                              className="font-600 text-zinc-700 hover:text-amber-600 transition-colors font-mono text-xs"
                            >
                              #{order._id.slice(-6).toUpperCase()}
                            </Link>
                          </td>
                          <td className="px-5 py-3.5 font-600 text-zinc-800">
                            EGP {order.total.toLocaleString()}
                          </td>
                          <td className="px-5 py-3.5">
                            <span
                              className={cn(
                                "text-xs font-600 px-2 py-0.5 rounded-md border capitalize",
                                statusStyle,
                              )}
                            >
                              {order.status}
                            </span>
                          </td>
                          <td className="px-5 py-3.5">
                            <span
                              className={cn(
                                "text-xs font-600 px-2 py-0.5 rounded-md border capitalize",
                                order.paymentStatus === "paid"
                                  ? "bg-[#edf5f1] text-[#3d7a5e] border-[#3d7a5e33]"
                                  : "bg-zinc-100 text-zinc-600 border-zinc-200",
                              )}
                            >
                              {order.paymentStatus}
                            </span>
                          </td>
                          <td className="px-5 py-3.5 text-zinc-400 text-xs whitespace-nowrap">
                            {new Date(order.createdAt).toLocaleDateString(
                              "en-EG",
                              {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              },
                            )}
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
