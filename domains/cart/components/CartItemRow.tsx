"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { RiDeleteBin3Line, RiSubtractLine, RiAddLine } from "react-icons/ri";
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

  const product = item.productId;
  const variant = item.inventoryId;
  const image = product.images?.[0] ?? "/placeholder-product.jpg";
  const itemTotal = item.priceSnapshot * quantity;

  return (
    <div className="group flex flex-col sm:flex-row gap-6 rounded-3xl bg-white p-4 sm:p-6 shadow-sm border border-zinc-100 transition-all hover:shadow-md hover:border-amber-200">
      {/* Image */}
      <Link
        href={`/products/${product.slug || product._id}`}
        className="relative aspect-square sm:aspect-[4/5] w-full sm:w-32 shrink-0 overflow-hidden rounded-2xl bg-zinc-50"
      >
        <Image
          src={image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, 128px"
        />
      </Link>

      {/* Content */}
      <div className="flex flex-1 flex-col py-1">
        {/* Title & Remove Button Row */}
        <div className="flex items-start justify-between gap-4">
          <Link
            href={`/products/${product.slug || product._id}`}
            className="text-lg font-black text-zinc-900 transition-colors hover:text-amber-600 line-clamp-2"
          >
            {product.name}
          </Link>
          <button
            onClick={() => onRemove(variant._id)}
            aria-label="Remove item"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zinc-50 text-zinc-400 transition-colors hover:bg-red-50 hover:text-red-500"
          >
            <RiDeleteBin3Line size={16} />
          </button>
        </div>

        {/* Variants Details (Color & Size) */}
        <div className="mt-3 flex flex-wrap items-center gap-2">
          {variant.color && (
            <span className="rounded-lg bg-zinc-100 px-2.5 py-1 text-xs font-bold text-zinc-600">
              Color: {variant.color}
            </span>
          )}
          {variant.size && (
            <span className="rounded-lg bg-zinc-100 px-2.5 py-1 text-xs font-bold text-zinc-600">
              Size: {variant.size}
            </span>
          )}
        </div>

        {/* Bottom Area: Quantity & Price */}
        <div className="mt-auto pt-6 flex flex-wrap items-end justify-between gap-4">
          {/* Quantity Selector */}
          <div className="flex h-12 w-32 items-center justify-between rounded-xl bg-zinc-50 border border-zinc-200 p-1">
            <button
              onClick={handleDecrement}
              disabled={quantity <= 1 || isUpdating}
              className="flex h-full w-10 items-center justify-center rounded-lg text-zinc-400 transition-colors hover:bg-white hover:text-zinc-900 disabled:opacity-30 disabled:hover:bg-transparent"
            >
              <RiSubtractLine size={16} />
            </button>
            <span className="text-sm font-black text-zinc-900">{quantity}</span>
            <button
              onClick={handleIncrement}
              disabled={isUpdating}
              className="flex h-full w-10 items-center justify-center rounded-lg text-zinc-400 transition-colors hover:bg-white hover:text-zinc-900 disabled:opacity-30 disabled:hover:bg-transparent"
            >
              <RiAddLine size={16} />
            </button>
          </div>

          {/* Pricing */}
          <div className="flex flex-col text-right">
            <span className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-1">
              EGP {item.priceSnapshot.toLocaleString()} each
            </span>
            <span className="text-2xl font-black text-amber-500">
              EGP {itemTotal.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
