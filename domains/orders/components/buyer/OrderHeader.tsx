import React from "react";
import Link from "next/link";
import { RiArrowLeftSLine, RiFileList3Line } from "react-icons/ri";
import { OrderStatusBadge } from "../OrderStatusBadge";

export function OrderHeader({ order }: { order: any }) {
  return (
    <div className="bg-white border border-zinc-200 rounded-2xl p-6 md:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
      <div className="relative z-10">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl md:text-3xl font-black text-zinc-900 tracking-tight">
            Order{" "}
            <span className="text-amber-600 font-mono">
              #{order._id.slice(-8).toUpperCase()}
            </span>
          </h1>
          <OrderStatusBadge status={order.status} />
        </div>
        <p className="text-sm font-semibold text-amber-800/80 mt-2 flex items-center gap-1.5">
          <RiFileList3Line />
          Placed on{" "}
          {new Date(order.createdAt).toLocaleDateString("en-EG", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>

      <div className="relative z-10">
        <p className="text-xs font-black text-amber-500 uppercase tracking-widest mb-1">
          Total Amount
        </p>
        <p className="text-3xl font-black text-zinc-900">
          <span className="text-lg text-zinc-400 mr-1">EGP</span>
          {order.total.toLocaleString()}
        </p>
      </div>
    </div>
  );
}
