"use client";

import React, { useState } from "react";
import type { Order, OrderItem } from "../../types/order.types";
import { OrderItemRow } from "./OrderItemRow";

interface OrderItemsTableProps {
  items: OrderItem[];
  order: Order;
}

export function OrderItemsTable({ items, order }: OrderItemsTableProps) {
  // State to track which item is currently being edited (ensures only 1 at a time)
  const [editingItemId, setEditingItemId] = useState<string | null>(null);

  // Financial Math
  const allTotal = items.reduce((prev, cur) => prev + cur.total, 0);
  const allCancelledTotal = items
    .filter((it) => it.status === "cancelled")
    .reduce((prev, cur) => prev + cur.total, 0);

  return (
    <div className="bg-white border border-zinc-200 rounded-xl shadow-xs overflow-hidden font-sans">
      {/* Header */}
      <div className="px-5 py-4 border-b border-zinc-100 bg-zinc-50/50 flex items-center justify-between">
        <h3 className="text-sm font-bold text-zinc-900">
          Purchased Items ({items.length})
        </h3>
      </div>

      {/* Items List (Delegated to OrderItemRow) */}
      <div className="divide-y divide-zinc-100">
        {items.map((item) => (
          <OrderItemRow
            key={item._id}
            item={item}
            orderId={order._id}
            isEditing={editingItemId === item._id}
            onEditStart={() => setEditingItemId(item._id)}
            onEditCancel={() => setEditingItemId(null)}
          />
        ))}
      </div>

      {/* Financial Totals Footer */}
      <div className="bg-zinc-50/50 p-5 border-t border-zinc-100 space-y-3 text-sm">
        {/* Original Items Total */}
        <div className="flex justify-between text-zinc-500">
          <span>Original Items Total</span>
          <span className="font-semibold text-zinc-700">
            EGP{" "}
            {allTotal.toLocaleString(undefined, {
              minimumFractionDigits: 2,
            })}
          </span>
        </div>

        {/* Dynamic Cancelled Deductions Row (Only shows if > 0) */}
        {allCancelledTotal > 0 && (
          <div className="flex justify-between items-center text-error bg-error-bg/40 px-3 py-2 rounded-lg border border-error/10">
            <span className="font-semibold text-xs tracking-wide uppercase">
              Cancelled Items Deduction
            </span>
            <span className="font-bold">
              - EGP{" "}
              {allCancelledTotal.toLocaleString(undefined, {
                minimumFractionDigits: 2,
              })}
            </span>
          </div>
        )}

        {/* Shipping & Fees */}
        <div className="flex justify-between text-zinc-500 pt-1">
          <span>Shipping & Fees (Estimated)</span>
          <span className="font-semibold text-zinc-700">
            EGP{" "}
            {(order.total - order.subtotal).toLocaleString(undefined, {
              minimumFractionDigits: 2,
            })}
          </span>
        </div>

        {/* Gross Total */}
        <div className="flex justify-between items-end pt-4 border-t border-zinc-200/60 mt-4">
          <div>
            <span className="font-extrabold text-zinc-900 block">
              Adjusted Gross Total
            </span>
            {allCancelledTotal > 0 && (
              <span className="text-[10px] text-zinc-400 font-medium">
                Reflects cancelled item deductions
              </span>
            )}
          </div>
          <span className="font-extrabold text-zinc-900 text-xl">
            EGP{" "}
            {order.total.toLocaleString(undefined, {
              minimumFractionDigits: 2,
            })}
          </span>
        </div>
      </div>
    </div>
  );
}
