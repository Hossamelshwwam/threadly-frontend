"use client";

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import {
  RiDeleteBin3Line,
  RiSubtractLine,
  RiAddLine,
  RiTruckLine,
  RiCheckLine,
} from "react-icons/ri";
import type { CartItem } from "../types/cart.types";

interface CartItemRowProps {
  item: CartItem;
  onUpdateQuantity: (inventoryId: string, quantity: number) => void;
  onRemove: (inventoryId: string) => void;
}

export function CartItemRow({
  item,
  onUpdateQuantity,
  onRemove,
}: CartItemRowProps) {
  const [quantity, setQuantity] = useState(item.quantity);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleIncrement = () => {
    if (isUpdating) return;
    const newQty = quantity + 1;
    setQuantity(newQty);
    setIsUpdating(true);
    onUpdateQuantity(item.inventoryId._id, newQty);
    setTimeout(() => setIsUpdating(false), 500);
  };

  const handleDecrement = () => {
    if (quantity <= 1 || isUpdating) return;
    const newQty = quantity - 1;
    setQuantity(newQty);
    setIsUpdating(true);
    onUpdateQuantity(item.inventoryId._id, newQty);
    setTimeout(() => setIsUpdating(false), 500);
  };

  const handleRemove = () => {
    onRemove(item.inventoryId._id);
  };

  const product = item.productId;
  const image = product.images?.[0] ?? "/placeholder-product.jpg";
  const itemTotal = item.priceSnapshot * quantity;

  return (
    <div className="group bg-white rounded-2xl border border-zinc-100 p-5 shadow-sm hover:shadow-md hover:border-amber-200 transition-all duration-300">
      <div className="flex gap-5">
        {/* Image */}
        <Link
          href={`/products/${product.slug || product._id}`}
          className="relative w-32 h-40 shrink-0 rounded-xl overflow-hidden bg-zinc-50"
        >
          <Image
            src={image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="128px"
          />
        </Link>

        {/* Details */}
        <div className="flex-1 min-w-0 flex flex-col">
          {/* Top: Name & Price */}
          <div className="flex justify-between items-start gap-4">
            <div className="min-w-0">
              <Link
                href={`/products/${product.slug || product._id}`}
                className="text-base font-bold text-zinc-900 hover:text-amber-600 transition-colors line-clamp-2 leading-snug"
              >
                {product.name}
              </Link>
              <div className="flex items-center gap-2 mt-1.5">
                <span className="text-xs font-medium text-zinc-500 bg-zinc-50 px-2 py-1 rounded-md">
                  Unit: EGP {item.priceSnapshot.toLocaleString()}
                </span>
                <span className="flex items-center gap-1 text-xs font-medium text-emerald-600">
                  <RiCheckLine size={12} />
                  In Stock
                </span>
              </div>
            </div>
            <p className="text-lg font-black text-amber-600 shrink-0">
              EGP {itemTotal.toLocaleString()}
            </p>
          </div>

          {/* Middle: Est. Delivery */}
          <div className="flex items-center gap-1.5 mt-3 text-xs text-zinc-500">
            <RiTruckLine size={14} className="text-zinc-400" />
            <span>Est. delivery: 3–5 business days</span>
          </div>

          {/* Bottom: Qty + Remove */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-zinc-50">
            {/* Quantity Stepper */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-zinc-400 uppercase tracking-wider mr-2">
                Qty
              </span>
              <div className="flex items-center bg-zinc-50 rounded-xl border border-zinc-200 p-1">
                <button
                  onClick={handleDecrement}
                  disabled={quantity <= 1 || isUpdating}
                  className="w-9 h-9 flex items-center justify-center rounded-lg bg-white border border-zinc-200 text-zinc-600 hover:border-amber-300 hover:text-amber-600 transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
                >
                  <RiSubtractLine size={14} />
                </button>
                <span className="w-10 text-center text-sm font-bold text-zinc-900 tabular-nums">
                  {quantity}
                </span>
                <button
                  onClick={handleIncrement}
                  disabled={isUpdating}
                  className="w-9 h-9 flex items-center justify-center rounded-lg bg-white border border-zinc-200 text-zinc-600 hover:border-amber-300 hover:text-amber-600 transition-all disabled:opacity-40 shadow-sm"
                >
                  <RiAddLine size={14} />
                </button>
              </div>
            </div>

            {/* Remove */}
            <button
              onClick={handleRemove}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold text-zinc-400 hover:text-rose-500 hover:bg-rose-50 transition-all"
            >
              <RiDeleteBin3Line size={16} />
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
