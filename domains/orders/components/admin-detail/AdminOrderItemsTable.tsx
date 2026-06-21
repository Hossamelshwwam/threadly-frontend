"use client";

import React, { useState } from "react";
import type { Order, OrderItem } from "../../types/order.types";
import { AdminOrderItemRow } from "./AdminOrderItemRow";

interface AdminOrderItemsTableProps {
  items: OrderItem[];
  order: Order;
}

export function AdminOrderItemsTable({
  items,
  order,
}: AdminOrderItemsTableProps) {
  const [editingItemId, setEditingItemId] = useState<string | null>(null);

  const allTotal = items.reduce((prev, cur) => prev + cur.total, 0);
  const allCancelledTotal = items
    .filter((it) => it.status === "cancelled")
    .reduce((prev, cur) => prev + cur.total, 0);

  return (
    // FIX: Added min-w-0 w-full to prevent flex child horizontal blowout
    <div className="bg-white border border-zinc-200 rounded-xl shadow-sm overflow-hidden font-sans min-w-0 w-full">
      {/* Header */}
      {/* FIX: Reduced mobile padding (px-4), kept desktop (sm:px-5) */}
      <div className="px-4 sm:px-5 py-3 sm:py-4 border-b border-zinc-100 bg-zinc-50/50 flex items-center justify-between">
        <h3 className="text-sm font-bold text-zinc-900">
          Purchased Items ({items.length})
        </h3>
      </div>

      {/* Items List */}
      <div className="divide-y divide-zinc-100">
        {items.map((item) => (
          <AdminOrderItemRow
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
      <div className="bg-zinc-50/50 p-4 sm:p-5 border-t border-zinc-100 space-y-3 text-[13px] sm:text-sm">
        <div className="flex justify-between text-zinc-500">
          <span>Original Items Total</span>
          <span className="font-semibold text-zinc-700">
            EGP{" "}
            {allTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </span>
        </div>

        {allCancelledTotal > 0 && (
          // FIX: Added flex-wrap for small screens if text is too long
          <div className="flex flex-wrap justify-between items-center text-error bg-error-bg/40 px-3 py-2 rounded-lg border border-error/10 gap-2">
            <span className="font-semibold text-[11px] sm:text-xs tracking-wide uppercase">
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
        {/* FIX: On mobile, stack text/subtext above the total amount to avoid crashing into it */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-1 sm:gap-0 pt-4 border-t border-zinc-200/60 mt-4">
          <div>
            <span className="font-extrabold text-zinc-900 block text-sm sm:text-base">
              Adjusted Gross Total
            </span>
            {allCancelledTotal > 0 && (
              <span className="text-[10px] text-zinc-400 font-medium">
                Reflects cancelled item deductions
              </span>
            )}
          </div>
          <span className="font-extrabold text-zinc-900 text-lg sm:text-xl self-end sm:self-auto">
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
