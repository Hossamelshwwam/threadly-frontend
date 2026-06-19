import React from "react";
import { RiMapPinUserLine } from "react-icons/ri";

export function OrderShippingCard({ order }: { order: any }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-zinc-200">
      <div className="flex items-center gap-2 mb-4 border-b border-zinc-100 pb-3">
        <div className="bg-amber-100 text-amber-600 p-1.5 rounded-lg">
          <RiMapPinUserLine size={18} />
        </div>
        <h2 className="font-black text-zinc-900">Delivery Address</h2>
      </div>

      {order.shippingAddress ? (
        <div className="text-sm text-zinc-700 space-y-1.5 font-medium">
          <p className="font-black text-zinc-900 text-base mb-2">
            {order.shippingAddress.fullName || order.buyerId?.name}
          </p>
          <p>{order.shippingAddress.street}</p>
          <p>
            {order.shippingAddress.city}, {order.shippingAddress.state}
          </p>
          <p>
            {order.shippingAddress.postalCode}, {order.shippingAddress.country}
          </p>

          <div className="mt-3 pt-3 border-t border-zinc-100 flex items-center gap-2">
            <span className="text-zinc-400 text-xs font-bold uppercase tracking-wider">
              Phone:
            </span>
            <span className="font-mono font-bold text-zinc-900">
              {order.shippingAddress.phonenumber}
            </span>
          </div>
        </div>
      ) : (
        <p className="text-sm text-zinc-500 italic bg-zinc-50 p-3 rounded-lg">
          No shipping details provided.
        </p>
      )}
    </div>
  );
}
