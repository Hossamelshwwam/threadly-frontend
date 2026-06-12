"use client";

import React from "react";
import { RiUserLine, RiMapPinLine, RiBankCardLine } from "react-icons/ri";
import type { Order } from "../../types/order.types";

export function AdminOrderCustomerDetails({ order }: { order: Order }) {
  return (
    <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden shadow-xs font-sans">
      <div className="px-5 py-4 border-b border-zinc-100 bg-zinc-50/50">
        <h3 className="text-sm font-bold text-zinc-900">Transaction Details</h3>
      </div>

      <div className="p-5 space-y-6">
        {/* Customer Profile */}
        <div className="flex gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <RiUserLine size={16} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-0.5">
              Consumer Profile
            </p>
            <p className="text-sm font-bold text-zinc-800">
              {order.buyerId.name}
            </p>
            <p className="text-xs text-zinc-500">{order.buyerId.email}</p>
            <p className="text-xs text-zinc-500 mt-0.5">
              {order.shippingAddress.phone}
            </p>
          </div>
        </div>

        {/* Shipping Destination */}
        <div className="flex gap-3">
          <div className="w-8 h-8 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <RiMapPinLine size={16} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-0.5">
              Shipping Destination
            </p>
            <p className="text-sm font-bold text-zinc-800">
              {order.shippingAddress.fullName}
            </p>
            <p className="text-xs text-zinc-500 leading-relaxed max-w-[220px]">
              {order.shippingAddress.street}
              <br />
              {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
              {order.shippingAddress.postalCode}
              <br />
              {order.shippingAddress.country}
            </p>
          </div>
        </div>

        {/* Payment Method */}
        <div className="flex gap-3">
          <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <RiBankCardLine size={16} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-0.5">
              Payment Method
            </p>
            <p className="text-sm font-bold text-zinc-800 capitalize">
              {order.paymentMethod.replace(/_/g, " ")}
            </p>
            <p className="text-xs font-mono text-zinc-500 mt-0.5">
              Ref: {order.orderNumber}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
