"use client";

import { useState } from "react";
import { RiShoppingBagLine, RiSubtractLine, RiAddLine } from "react-icons/ri";
import { toast } from "sonner";
import useAddProductToCart from "@/domains/cart/hooks/useAddProductToCart";
import CustomButton from "@/shared/components/custom-button/custom-button";

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

  const canAddToCart = hasVariants
    ? !!inventoryId && maxStock > 0
    : maxStock > 0;

  const handleAddToCart = () => {
    if (!inventoryId || isPending) return;

    toast.promise(addToCart({ productId, inventoryId, quantity }), {
      loading: "Adding to cart...",
      success: () => {
        setQuantity(1);
        return {
          message: `Added to cart!`,
          description: `${quantity} item${quantity > 1 ? "s" : ""} added to your cart.`,
        };
      },
      error: (error) => {
        return {
          message: "Failed to add to cart",
          description: error.response?.data.message,
        };
      },
    });
  };

  if (hasVariants && !inventoryId) {
    return (
      <button
        disabled
        className="w-full bg-zinc-200 text-zinc-500 text-sm font-semibold rounded-xl py-3.5 cursor-not-allowed"
      >
        Select Size & Color to Add
      </button>
    );
  }

  if (maxStock <= 0) {
    return (
      <button
        disabled
        className="w-full bg-zinc-200 text-zinc-500 text-sm font-semibold rounded-xl py-3.5 cursor-not-allowed"
      >
        Out of Stock
      </button>
    );
  }

  return (
    <div className="space-y-3">
      <div>
        <label className="block text-xs font-semibold tracking-wider uppercase text-zinc-500 mb-2.5">
          Quantity
        </label>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            disabled={quantity <= 1}
            aria-label="Decrease quantity"
            className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg border border-zinc-200 text-zinc-600 hover:bg-zinc-50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <RiSubtractLine size={16} />
          </button>
          <span className="w-12 text-center text-sm font-semibold text-zinc-900">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity(Math.min(maxStock, quantity + 1))}
            disabled={quantity >= maxStock}
            aria-label="Increase quantity"
            className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg border border-zinc-200 text-zinc-600 hover:bg-zinc-50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <RiAddLine size={16} />
          </button>
        </div>
      </div>

      <CustomButton
        onClick={handleAddToCart}
        disabled={!canAddToCart || isPending}
        fullWidth
        size="md"
        variant="solid"
        theme="primary"
        loading={isPending}
        leftIcon={<RiShoppingBagLine size={18} />}
      >
        Add to Cart — EGP {(price * quantity).toLocaleString()}
      </CustomButton>
    </div>
  );
}
