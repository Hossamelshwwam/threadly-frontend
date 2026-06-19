"use client";

import React from "react";
import { toast } from "sonner";
import {
  RiMapPinLine,
  RiDeleteBinLine,
  RiEditLine,
  RiStarFill,
} from "react-icons/ri";

import type { Address } from "@/domains/users/types/user.types";
import {
  useDeleteAddress,
  useSetDefaultAddress,
} from "@/domains/users/hooks/useUser";
import { cn } from "@/shared/lib";

interface Props {
  address: Address;
  onEdit: (address: Address) => void;
}

export function AddressCard({ address, onEdit }: Props) {
  const { mutateAsync: deleteAddress, isPending: isDeleting } =
    useDeleteAddress();
  const { mutateAsync: setDefault, isPending: isSettingDefault } =
    useSetDefaultAddress();

  const handleDelete = async () => {
    toast.promise(deleteAddress(address._id), {
      loading: "Deleting address...",
      success: "Address removed.",
      error: "Failed to delete address.",
    });
  };

  const handleSetDefault = async () => {
    toast.promise(setDefault(address._id), {
      loading: "Setting default...",
      success: "Default address updated.",
      error: "Failed to update default address.",
    });
  };

  const isPending = isDeleting || isSettingDefault;

  return (
    <div
      className={cn(
        "border-2 rounded-2xl p-5 transition-all relative flex flex-col justify-between h-full bg-white",
        address.isDefault
          ? "border-amber-400 shadow-sm"
          : "border-zinc-200 hover:border-zinc-300",
        isPending && "opacity-60 pointer-events-none",
      )}
    >
      {address.isDefault && (
        <div className="absolute -top-3 -right-3 bg-amber-400 text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1">
          <RiStarFill size={12} /> Default
        </div>
      )}

      <div>
        <div className="flex items-center gap-2 mb-3">
          <RiMapPinLine
            className={address.isDefault ? "text-amber-500" : "text-zinc-400"}
            size={18}
          />
          <h4 className="font-bold text-zinc-900">{address.label}</h4>
        </div>

        <div className="text-sm text-zinc-600 space-y-1 leading-relaxed">
          <p>{address.street}</p>
          <p>
            {address.city}, {address.state} {address.postalCode}
          </p>
          <p>{address.country}</p>
          <p className="pt-2 font-medium text-zinc-500">
            Phone: {address.phonenumber}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 pt-5 mt-4 border-t border-zinc-100">
        <button
          onClick={() => onEdit(address)}
          className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 transition-colors"
        >
          <RiEditLine size={14} /> Edit
        </button>

        <button
          onClick={handleDelete}
          className="text-xs font-bold text-red-500 hover:text-red-600 flex items-center gap-1 transition-colors"
        >
          <RiDeleteBinLine size={14} /> Remove
        </button>

        {!address.isDefault && (
          <button
            onClick={handleSetDefault}
            className="text-xs font-bold text-zinc-500 hover:text-zinc-900 ml-auto transition-colors"
          >
            Set as Default
          </button>
        )}
      </div>
    </div>
  );
}
