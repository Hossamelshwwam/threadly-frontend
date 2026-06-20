import Image from "next/image";
import React from "react";
import { OrderItemStatusBadge } from "../OrderStatusBadge";
import { OrderItem } from "../../types/order.types";
import { RiInboxArchiveLine } from "react-icons/ri";

interface SellerOrderItemRow {
  item: OrderItem;
  product?: OrderItem["productId"];
}

export default function SellerOrderItemDetails({
  item,
  product,
}: SellerOrderItemRow) {
  return (
    <div className="bg-white border border-zinc-200 rounded-lg p-4 sm:p-6 space-y-4 sm:space-y-5 shadow-xs">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-100 pb-4">
        <div>
          <h1 className="text-lg sm:text-xl font-black text-zinc-900 tracking-tight">
            Item Details
          </h1>
          <p className="text-[10px] sm:text-xs font-mono text-zinc-400 mt-1 break-all sm:break-normal">
            Item Reference ID: {item._id}
          </p>
        </div>
        <div className="self-start sm:self-auto">
          <OrderItemStatusBadge status={item.status} />
        </div>
      </div>

      {/* Product Snapshot Frame */}
      <div className="flex items-start gap-3 sm:gap-4 bg-zinc-50/50 border border-zinc-200/60 rounded-lg p-3 sm:p-4">
        <div className="h-14 w-14 sm:h-16 sm:w-16 relative rounded-md overflow-hidden bg-white border border-zinc-200 shrink-0">
          {product?.images?.[0] ? (
            <Image
              src={product.images[0]}
              alt="Product"
              fill
              sizes="(max-width: 640px) 56px, 64px"
              className="object-cover"
            />
          ) : (
            <RiInboxArchiveLine className="absolute inset-0 m-auto text-zinc-300" />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-sm sm:text-base font-bold text-zinc-900 truncate">
            {product?.name || item.productName}
          </h3>

          {/* FIX: Added flex-wrap and gap-2. If screen is tiny, Size and Color will wrap into two lines safely */}
          <div className="flex flex-wrap items-center gap-2 text-[10px] sm:text-xs text-zinc-500 mt-1.5 font-semibold">
            <span className="bg-white px-2 py-0.5 rounded border border-zinc-200">
              Size: {item.size}
            </span>
            <span className="hidden sm:inline text-zinc-300">•</span>
            <div className="flex items-center gap-1.5 bg-white px-2 py-0.5 rounded border border-zinc-200">
              <span>Color:</span>
              <span
                style={{ backgroundColor: item.color }}
                className="w-2.5 h-2.5 rounded-full border border-black/10 shrink-0"
              />
              <span className="truncate max-w-[80px] sm:max-w-none">
                {item.color}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Financial Calculations Table */}
      <div className="space-y-2.5 pt-2">
        <span className="text-[10px] sm:text-xs font-bold text-zinc-400 uppercase tracking-wider block">
          Financial Accounting
        </span>
        <div className="border border-zinc-100 rounded-lg divide-y divide-zinc-50">
          <div className="flex items-center justify-between p-3 text-xs sm:text-sm font-medium text-zinc-600">
            <span>Unit Price</span>
            <span className="font-bold text-zinc-800">
              EGP {item.unitPrice.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center justify-between p-3 text-xs sm:text-sm font-medium text-zinc-600">
            <span>Quantity ordered</span>
            <span className="font-bold text-zinc-800">
              {item.quantity} units
            </span>
          </div>
          <div className="flex items-center justify-between p-3 bg-zinc-50/60 text-xs sm:text-sm font-bold text-zinc-900 rounded-b-lg">
            <span>Total settlement</span>
            <span className="text-sm sm:text-base font-black">
              EGP {item.total.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
