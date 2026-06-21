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
        "p-4 sm:p-5 transition-colors",
        isEditing ? "bg-amber-50/30" : "hover:bg-zinc-50/30",
      )}
    >
      {/* FIX: Outer container stacks on mobile, row on tablet. */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        {/* Left Side: Product Image & Info ALWAYS side-by-side */}
        <div className="flex items-start gap-3 sm:gap-4 min-w-0 flex-1">
          {/* Product Image */}
          <div className="w-16 h-16 sm:w-16 sm:h-16 rounded-lg bg-zinc-100 border border-zinc-200 flex items-center justify-center shrink-0 overflow-hidden relative shadow-sm">
            {item.productId.images?.[0] ? (
              <Image
                src={item.productId.images[0]}
                alt={item.productName}
                fill
                sizes="64px"
                className="object-cover"
              />
            ) : (
              <RiImageLine className="text-zinc-400 text-xl" />
            )}
          </div>

          {/* Product Info & Variant Attributes */}
          <div className="flex-1 min-w-0 space-y-1.5">
            {/* FIX: flex-wrap to prevent badge from being pushed off-screen by long titles */}
            <div className="flex flex-wrap items-start justify-between gap-2">
              <p className="text-sm font-bold text-zinc-900 line-clamp-2 sm:line-clamp-1 pr-2">
                {item.productName}
              </p>
              {!isEditing && (
                <div className="shrink-0">
                  <OrderItemStatusBadge status={item.status} />
                </div>
              )}
            </div>

            {/* Attributes Row: Size, Color, Slug */}
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              <span className="text-[10px] font-bold bg-zinc-100 text-zinc-700 px-1.5 py-0.5 rounded border border-zinc-200">
                Size: {item.size}
              </span>
              <span className="text-[10px] font-bold bg-zinc-100 text-zinc-700 px-1.5 py-0.5 rounded border border-zinc-200 flex items-center gap-1">
                Color:
                <span
                  style={{ backgroundColor: item.color }}
                  className="w-2 h-2 rounded-full border border-black/10 inline-block"
                />
              </span>
              <span className="font-mono text-[10px] bg-zinc-50 border border-zinc-100 px-1.5 py-0.5 rounded text-zinc-400 truncate max-w-[100px] sm:max-w-none">
                {item.productId.slug}
              </span>
            </div>

            {/* Tracking Number Display */}
            {!isEditing && item.trackingNumber && (
              <div className="items-center gap-1.5 text-[11px] sm:text-xs text-blue-600 font-mono mt-1 bg-blue-50/50 inline-flex px-2 py-0.5 rounded border border-blue-100 break-all sm:break-normal">
                <RiTruckLine size={12} className="shrink-0" />
                Tracking: {item.trackingNumber}
              </div>
            )}

            {/* Seller Reference */}
            {!isEditing && (
              <div className="text-[11px] sm:text-xs text-zinc-500 pt-0.5">
                <span>
                  Sold by:{" "}
                  <strong className="text-zinc-800">
                    {item.sellerId?.storeName || "Platform Direct"}
                  </strong>
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Prices & Action Button */}
        {/* FIX: Becomes a bottom row on mobile (price left, button right), right-aligned col on tablet */}
        <div className="flex flex-col items-center sm:items-end justify-between sm:justify-start border-t sm:border-t-0 border-zinc-100 pt-3 sm:pt-0 shrink-0 gap-3">
          <div className="text-left sm:text-right">
            <p className="text-sm font-extrabold text-zinc-900">
              EGP{" "}
              {item.total.toLocaleString(undefined, {
                minimumFractionDigits: 2,
              })}
            </p>
            <p className="text-[11px] sm:text-xs font-medium text-zinc-400 mt-0.5">
              {item.quantity} x EGP {item.unitPrice.toLocaleString()}
            </p>
          </div>

          {/* Edit Button */}
          {!isEditing && (
            <button
              type="button"
              onClick={onEditStart}
              className="text-xs sm:text-[10px] font-bold text-amber-600 hover:text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200/50 px-3 py-1.5 sm:px-2 sm:py-1 rounded-md sm:rounded transition-colors flex items-center justify-center gap-1.5 sm:gap-1 cursor-pointer w-full sm:w-auto"
            >
              <RiEdit2Line size={14} className="sm:w-3 sm:h-3" />
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
