"use client";

import React from "react";
import Image from "next/image";
import { RiImageLine, RiEdit2Line, RiTruckLine } from "react-icons/ri";
import { cn } from "@/shared/lib";
import type { OrderItem } from "../../types/order.types";
import { OrderItemStatusBadge } from "../OrderStatusBadge";
import { AdminOrderItemEditForm } from "./AdminOrderItemEditForm";

interface AdminOrderItemRowProps {
  item: OrderItem;
  orderId: string;
  isEditing: boolean;
  onEditStart: () => void;
  onEditCancel: () => void;
}

export function AdminOrderItemRow({
  item,
  orderId,
  isEditing,
  onEditStart,
  onEditCancel,
}: AdminOrderItemRowProps) {
  return (
    <div
      className={cn(
        "p-5 transition-colors",
        isEditing ? "bg-amber-50/30" : "hover:bg-zinc-50/30",
      )}
    >
      {/* Product Layout */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        {/* Product Image */}
        <div className="w-16 h-16 rounded-lg bg-zinc-100 border border-zinc-200 flex items-center justify-center shrink-0 overflow-hidden relative">
          {item.productId.images?.[0] ? (
            <Image
              src={item.productId.images[0]}
              alt={item.productName}
              fill
              className="object-cover"
            />
          ) : (
            <RiImageLine className="text-zinc-400 text-xl" />
          )}
        </div>

        {/* Product Info & Variant Attributes */}
        <div className="flex-1 space-y-1.5">
          <div className="flex items-start justify-between gap-2">
            <p className="text-sm font-bold text-zinc-900 line-clamp-1">
              {item.productName}
            </p>
            {/* Display Badge using centralized component */}
            {!isEditing && <OrderItemStatusBadge status={item.status} />}
          </div>

          {/* Attributes Row: Size, Color, Slug */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-bold bg-zinc-100 text-zinc-700 px-1.5 py-0.5 rounded border border-zinc-200">
              Size: {item.size}
            </span>
            <span className="text-[10px] font-bold bg-zinc-100 text-zinc-700 px-1.5 py-0.5 rounded border border-zinc-200">
              Color: {item.color}
            </span>
            <span className="font-mono text-[10px] bg-zinc-50 border border-zinc-100 px-1.5 py-0.5 rounded text-zinc-400">
              {item.productId.slug}
            </span>
          </div>

          {/* Tracking Number Display */}
          {!isEditing && item.trackingNumber && (
            <div className="items-center gap-1.5 text-xs text-blue-600 font-mono mt-1 bg-blue-50/50 inline-flex px-2 py-0.5 rounded border border-blue-100">
              <RiTruckLine size={12} />
              Tracking: {item.trackingNumber}
            </div>
          )}

          {/* Seller Reference */}
          {!isEditing && (
            <div className="text-xs text-zinc-500 pt-0.5">
              <span>
                Sold by:{" "}
                <strong className="text-zinc-800">
                  {item.sellerId?.storeName || "Platform Direct"}
                </strong>
              </span>
            </div>
          )}
        </div>

        {/* Right Side: Prices & Action Button */}
        <div className="text-right shrink-0 flex flex-col items-end gap-2">
          <div>
            <p className="text-sm font-extrabold text-zinc-900">
              EGP{" "}
              {item.total.toLocaleString(undefined, {
                minimumFractionDigits: 2,
              })}
            </p>
            <p className="text-xs font-medium text-zinc-400 mt-0.5">
              {item.quantity} x EGP {item.unitPrice.toLocaleString()}
            </p>
          </div>

          {/* Edit Button */}
          {!isEditing && (
            <button
              type="button"
              onClick={onEditStart}
              className="text-[10px] font-bold text-amber-600 hover:text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200/50 px-2 py-1 rounded transition-colors flex items-center gap-1 cursor-pointer"
            >
              <RiEdit2Line size={12} />
              Manage Item
            </button>
          )}
        </div>
      </div>

      {/* Render isolated Form Component cleanly */}
      {isEditing && (
        <AdminOrderItemEditForm
          orderId={orderId}
          item={item}
          onCancel={onEditCancel}
        />
      )}
    </div>
  );
}
