"use client";

import { useState } from "react";
import { RiShoppingBag3Fill, RiSubtractLine, RiAddLine } from "react-icons/ri";
import { toast } from "sonner";
import useAddProductToCart from "@/domains/cart/hooks/useAddProductToCart";

interface AddToCartSectionProps {
  productId: string;
  inventoryId?: string;
  maxStock: number;
  hasVariants: boolean;
  price: number;
}

export function AddToCartSection({
  productId,
  inventoryId,
  maxStock,
  hasVariants,
  price,
}: AddToCartSectionProps) {
  const [quantity, setQuantity] = useState(1);
  const { mutateAsync: addToCart, isPending } = useAddProductToCart();

  const handleAddToCart = () => {
    // 1. VALIDATION: Check if variants are selected before doing anything
    if (hasVariants && !inventoryId) {
      toast.error("Selection Required", {
        description: "Please choose a color and size before adding to cart.",
      });
      return;
    }

    if (isPending) return;

    // 2. Submit to Cart
    toast.promise(
      addToCart({ productId, inventoryId: inventoryId!, quantity }),
      {
        loading: "Adding to cart...",
        success: () => {
          setQuantity(1);
          return {
            message: `Added to cart!`,
            description: `${quantity} item${quantity > 1 ? "s" : ""} added to your cart.`,
          };
        },
        error: (error: any) => {
          return {
            message: "Failed to add to cart",
            description: error.response?.data?.message || "An error occurred.",
          };
        },
      },
    );
  };

  // Only return the dead state if the product is entirely sold out everywhere
  if (maxStock <= 0) {
    return (
      <div className="flex h-16 w-full items-center justify-center rounded-2xl bg-red-50 text-sm font-bold text-red-500">
        Currently Out of Stock
      </div>
    );
  }

  // Use a fallback stock number (e.g., 10) for the quantity selector if they haven't picked a variant yet
  const availableStock = inventoryId ? maxStock : 10;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row items-stretch gap-3">
        {/* Sleek Quantity Pill */}
        <div className="flex h-16 w-full sm:w-[140px] items-center justify-between rounded-2xl bg-zinc-50 border border-zinc-200 p-1.5 shrink-0">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            disabled={quantity <= 1}
            className="flex h-full w-12 items-center justify-center rounded-xl text-zinc-400 hover:bg-white hover:text-zinc-900 hover:shadow-sm transition-all disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:shadow-none"
          >
            <RiSubtractLine size={20} />
          </button>
          <span className="text-lg font-black text-zinc-900">{quantity}</span>
          <button
            onClick={() => setQuantity(Math.min(availableStock, quantity + 1))}
            disabled={quantity >= availableStock}
            className="flex h-full w-12 items-center justify-center rounded-xl text-zinc-400 hover:bg-white hover:text-zinc-900 hover:shadow-sm transition-all disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:shadow-none"
          >
            <RiAddLine size={20} />
          </button>
        </div>

        {/* Massive Primary CTA Button - No longer disabled by missing variants! */}
        <button
          onClick={handleAddToCart}
          disabled={isPending}
          className="group flex h-16 flex-1 items-center justify-center gap-3 rounded-2xl bg-amber-500 px-6 font-black text-white shadow-lg shadow-amber-500/25 transition-all hover:bg-amber-600 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] disabled:opacity-70 disabled:pointer-events-none"
        >
          <RiShoppingBag3Fill
            size={22}
            className="transition-transform group-hover:scale-110"
          />
          {isPending
            ? "Adding to Cart..."
            : `Add to Cart — EGP ${(price * quantity).toLocaleString()}`}
        </button>
      </div>

      <div className="flex items-center justify-center gap-2">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <p className="text-xs font-bold uppercase tracking-widest text-zinc-500">
          {inventoryId
            ? `${maxStock} Items Available`
            : "In Stock and Ready to Ship"}
        </p>
      </div>
    </div>
  );
}
