import Link from "next/link";
import { RiArrowRightLine } from "react-icons/ri";
import type { Order } from "@/domains/orders/types/order.types";
import { cn } from "@/shared/lib";

const statusConfig: Record<string, { label: string; className: string }> = {
  pending: {
    label: "Pending",
    className: "bg-amber-50 text-amber-700 border-amber-200",
  },
  confirmed: {
    label: "Confirmed",
    className: "bg-blue-50 text-blue-700 border-blue-200",
  },
  processing: {
    label: "Processing",
    className: "bg-zinc-100 text-zinc-700 border-zinc-200",
  },
  shipped: {
    label: "Shipped",
    className: "bg-purple-50 text-purple-700 border-purple-200",
  },
  delivered: {
    label: "Delivered",
    className: "bg-green-50 text-green-700 border-green-200",
  },
  cancelled: {
    label: "Cancelled",
    className: "bg-red-50 text-red-700 border-red-200",
  },
};

interface RecentOrdersWidgetProps {
  orders: Order[];
  loading?: boolean;
}

export function RecentOrdersWidget({
  orders,
  loading = false,
}: RecentOrdersWidgetProps) {
  return (
    <div className="bg-white border border-zinc-200 rounded-lg overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-100">
        <h2 className="text-base font-700 text-zinc-900">Recent Orders</h2>
        <Link
          href="/admin/orders"
          className="flex items-center gap-1.5 text-xs font-600 text-amber-600 hover:text-amber-700 transition-colors"
        >
          View all
          <RiArrowRightLine />
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-zinc-100">
              <th className="text-left px-5 py-3 text-xs font-600 text-zinc-400 uppercase tracking-wider">
                Order ID
              </th>
              <th className="text-left px-5 py-3 text-xs font-600 text-zinc-400 uppercase tracking-wider">
                Buyer
              </th>
              <th className="text-left px-5 py-3 text-xs font-600 text-zinc-400 uppercase tracking-wider">
                Amount
              </th>
              <th className="text-left px-5 py-3 text-xs font-600 text-zinc-400 uppercase tracking-wider">
                Status
              </th>
              <th className="text-left px-5 py-3 text-xs font-600 text-zinc-400 uppercase tracking-wider">
                Date
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-50">
            {loading
              ? Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i}>
                    {Array.from({ length: 5 }).map((_, j) => (
                      <td key={j} className="px-5 py-3.5">
                        <div className="h-4 rounded bg-zinc-100 animate-pulse w-20" />
                      </td>
                    ))}
                  </tr>
                ))
              : orders.map((order) => {
                  const status = statusConfig[order.status] ?? {
                    label: order.status,
                    className: "bg-zinc-100 text-zinc-600 border-zinc-200",
                  };
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
                      <td className="px-5 py-3.5">
                        <div>
                          <p className="font-500 text-zinc-800">
                            {order.buyerId?.name ?? "—"}
                          </p>
                          <p className="text-xs text-zinc-400">
                            {order.buyerId?.email}
                          </p>
                        </div>
                      </td>
                      <td className="px-5 py-3.5 font-600 text-zinc-800">
                        EGP {order.total.toLocaleString()}
                      </td>
                      <td className="px-5 py-3.5">
                        <span
                          className={cn(
                            "inline-flex items-center px-2 py-0.5 rounded-md text-xs font-600 border",
                            status.className,
                          )}
                        >
                          {status.label}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-zinc-400 text-xs">
                        {new Date(order.createdAt).toLocaleDateString("en-EG", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>
                    </tr>
                  );
                })}
          </tbody>
        </table>

        {!loading && orders.length === 0 && (
          <div className="py-12 text-center text-zinc-400 text-sm">
            No recent orders
          </div>
        )}
      </div>
    </div>
  );
}
