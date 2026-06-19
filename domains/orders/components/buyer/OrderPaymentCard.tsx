import React from "react";
import { RiBankCardLine } from "react-icons/ri";

export function OrderPaymentCard({ order }: { order: any }) {
  return (
    <div className="bg-white border border-zinc-2000 rounded-2xl p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-4 border-b border-zinc-100 pb-3">
        <div className="bg-zinc-100 text-zinc-700 p-1.5 rounded-lg">
          <RiBankCardLine size={18} />
        </div>
        <h2 className="font-black text-zinc-900">Payment Summary</h2>
      </div>

      <div className="space-y-4 text-sm">
        <div className="flex justify-between items-center">
          <span className="text-zinc-500 font-bold">Method</span>
          <span className="font-black text-zinc-900 capitalize bg-zinc-100 px-2 py-1 rounded">
            {order.paymentMethod.replace("_", " ")}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-zinc-500 font-bold">Status</span>
          <span
            className={`font-black uppercase tracking-wider text-[11px] px-2.5 py-1 rounded-md ${
              order.paymentStatus === "paid"
                ? "bg-emerald-100 text-emerald-700"
                : "bg-amber-100 text-amber-700"
            }`}
          >
            {order.paymentStatus}
          </span>
        </div>

        <div className="w-full h-px bg-zinc-200 border-dashed border-t" />

        <div className="flex justify-between items-center font-medium text-zinc-600">
          <span>Subtotal</span>
          <span>EGP {order.total.toLocaleString()}</span>
        </div>
        <div className="flex justify-between items-center font-medium text-zinc-600">
          <span>Shipping Fee</span>
          <span>EGP 0</span>
        </div>

        <div className="pt-2 mt-2 border-t border-zinc-200 flex justify-between items-center">
          <span className="text-zinc-900 font-black">Total</span>
          <span className="text-xl font-black text-zinc-900">
            EGP {order.total.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}
