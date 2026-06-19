import React from "react";
import Image from "next/image";
import { RiStore2Line, RiTruckLine } from "react-icons/ri";
import { OrderItemStatusBadge } from "../OrderStatusBadge";
import { CancelOrderItemButton } from "./CancelOrderItemButton";

export function OrderItemsList({ order, items }: { order: any; items: any[] }) {
  return (
    <div className="lg:col-span-2 space-y-4">
      <h2 className="text-lg font-black text-zinc-900 flex items-center gap-2">
        Items in this order{" "}
        <span className="bg-zinc-200 text-zinc-700 text-xs px-2 py-0.5 rounded-full">
          {items.length}
        </span>
      </h2>

      <div className="space-y-4">
        {items.map((item: any) => {
          const isCancelable =
            item.status === "pending" || item.status === "processing";

          return (
            <div
              key={item._id}
              className="bg-white border border-zinc-200 rounded-2xl shadow-sm flex flex-col sm:flex-row overflow-hidden hover:border-amber-300 transition-colors"
            >
              {/* Image Section */}
              <div className="h-40 sm:h-auto sm:w-40 relative bg-zinc-100 shrink-0 border-b sm:border-b-0 sm:border-r border-zinc-200">
                <Image
                  src={item.productId?.images?.[0] || "/placeholder.jpg"}
                  alt={item.productId?.name || "Product"}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-2 left-2 bg-zinc-900 text-white text-xs font-black px-2 py-1 rounded-md shadow-md">
                  Qty: {item.quantity}
                </div>
              </div>

              {/* Details Section */}
              <div className="flex-1 p-5 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start gap-4 mb-2">
                    <h3 className="font-bold text-zinc-900 text-lg leading-tight">
                      {item.productId?.name}
                    </h3>
                    <div className="font-black text-zinc-900 text-lg whitespace-nowrap bg-zinc-50 px-3 py-1 rounded-lg border border-zinc-100">
                      EGP {(item.unitPrice * item.quantity).toLocaleString()}
                    </div>
                  </div>

                  {/* Visible Attributes */}
                  <div className="flex flex-wrap gap-2 my-3">
                    <span className="bg-amber-50 border border-amber-100 text-amber-800 text-xs font-bold px-2.5 py-1 rounded-md">
                      Size: {item.size}
                    </span>
                    <span className="bg-amber-50 border border-amber-100 text-amber-800 text-xs font-bold px-2.5 py-1 rounded-md">
                      Color: {item.color}
                    </span>
                    <span className="bg-zinc-100 border border-zinc-200 text-zinc-700 text-xs font-bold px-2.5 py-1 rounded-md flex items-center gap-1">
                      <RiStore2Line size={12} />
                      {item.sellerId === null
                        ? "Threadly"
                        : item.sellerId?.storeName}
                    </span>
                  </div>
                </div>

                {/* Status & Actions */}
                <div className="mt-4 pt-4 border-t border-zinc-100 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <OrderItemStatusBadge status={item.status} />

                    {item.trackingNumber && (
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1.5 rounded-lg border border-blue-100">
                        <RiTruckLine size={14} /> Tracking:{" "}
                        <span className="font-mono">{item.trackingNumber}</span>
                      </span>
                    )}
                  </div>

                  {isCancelable && (
                    <CancelOrderItemButton
                      orderId={order._id}
                      itemId={item._id}
                      itemName={item.productId?.name}
                    />
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
