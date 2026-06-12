"use client";

import Link from "next/link";
import Image from "next/image";
import { RiArrowRightLine, RiInboxArchiveLine } from "react-icons/ri";
import type { OrderItem } from "@/domains/orders/types/order.types";
import { OrderItemStatusBadge } from "@/domains/orders/components/OrderStatusBadge";

interface RecentOrdersWidgetProps {
  orders: OrderItem[];
  loading?: boolean;
}

function RecentOrdersSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-zinc-200 p-5 space-y-4">
      <div className="h-6 w-32 bg-zinc-100 rounded animate-pulse" />
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-md bg-zinc-100 animate-pulse" />
            <div className="flex-1 space-y-1.5">
              <div className="h-4 w-40 bg-zinc-100 rounded animate-pulse" />
              <div className="h-3 w-24 bg-zinc-100 rounded animate-pulse" />
            </div>
            <div className="h-4 w-16 bg-zinc-100 rounded animate-pulse" />
            <div className="h-6 w-20 bg-zinc-100 rounded animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function RecentOrdersWidget({
  orders,
  loading = false,
}: RecentOrdersWidgetProps) {
  if (loading) return <RecentOrdersSkeleton />;

  return (
    <div className="bg-white rounded-xl border border-zinc-200 p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-bold text-zinc-900">Recent Orders</h2>
        <Link
          href="/seller/orders"
          className="text-xs font-semibold text-amber-600 hover:text-amber-700 flex items-center gap-1 transition-colors"
        >
          View All
          <RiArrowRightLine className="text-sm" />
        </Link>
      </div>

      {orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 text-center">
          <RiInboxArchiveLine className="text-4xl text-zinc-300 mb-3" />
          <p className="text-sm font-medium text-zinc-500">No orders yet</p>
          <p className="text-xs text-zinc-400 mt-1">
            Orders will appear here once customers start buying
          </p>
        </div>
      ) : (
        <div className="divide-y divide-zinc-100">
          {orders.map((item) => {
            const product = item.productId;
            return (
              <Link
                key={item._id}
                href={`/seller/orders/${item._id}`}
                className="flex items-center gap-3 py-3 group hover:bg-zinc-50 -mx-5 px-5 transition-colors"
              >
                <div className="h-10 w-10 relative rounded-md overflow-hidden bg-zinc-100 border border-zinc-200 shrink-0">
                  {product?.images?.[0] ? (
                    <Image
                      src={product.images[0]}
                      alt=""
                      width={40}
                      height={40}
                      className="object-cover"
                    />
                  ) : (
                    <RiInboxArchiveLine className="absolute inset-0 m-auto text-zinc-300" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-zinc-900 truncate group-hover:text-amber-600 transition-colors">
                    {product?.name || "Unknown Product"}
                  </p>
                  <p className="text-xs text-zinc-500">
                    {item.quantity}x @ EGP {item.unitPrice.toLocaleString()}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-bold text-zinc-900">
                    EGP {item.total.toLocaleString()}
                  </p>
                </div>
                <OrderItemStatusBadge status={item.status} />
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
