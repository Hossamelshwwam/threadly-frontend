"use client";

import React, { useState } from "react";
import { RiAddLine, RiMapPinUserLine } from "react-icons/ri";

import { useMyAddresses } from "@/domains/users/hooks/useUser";
import type { Address } from "@/domains/users/types/user.types";

import CustomButton from "@/shared/components/custom-button/custom-button";
import { AddressCard } from "../components/account/AddressCard";
import { AccountAddressForm } from "../components/account/AccountAddressForm";
import AddressesSkeleton from "../components/AddressesSkeleton";

export default function AccountAddressesPage() {
  const { data: addressResponse, isLoading } = useMyAddresses();
  const addresses = addressResponse?.data || [];

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);

  const handleOpenAdd = () => {
    setEditingAddress(null);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (address: Address) => {
    setEditingAddress(address);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingAddress(null);
  };

  if (isLoading) {
    return <AddressesSkeleton />;
  }

  return (
    <div className="font-sans flex-1">
      {/* Header */}
      <div className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-zinc-900 tracking-tight">
            Shipping Addresses
          </h1>
          <p className="text-xs text-zinc-500 font-medium mt-0.5">
            Manage your saved addresses for faster checkout.
          </p>
        </div>
        {!isFormOpen && (
          <CustomButton
            variant="solid"
            theme="primary"
            leftIcon={<RiAddLine />}
            onClick={handleOpenAdd}
            className="rounded-xl shadow-md font-bold"
          >
            Add New Address
          </CustomButton>
        )}
      </div>

      {/* Conditional Form Render */}
      {isFormOpen && (
        <div className="mb-6">
          <AccountAddressForm
            initialData={editingAddress}
            onClose={handleCloseForm}
          />
        </div>
      )}

      {/* Address Grid */}
      {!isFormOpen && addresses.length === 0 ? (
        <div className="bg-white border border-zinc-200 rounded-2xl p-12 text-center flex flex-col items-center">
          <div className="h-16 w-16 bg-zinc-50 rounded-full flex items-center justify-center mb-4">
            <RiMapPinUserLine className="text-3xl text-zinc-400" />
          </div>
          <h3 className="text-lg font-bold text-zinc-900">
            No saved addresses
          </h3>
          <p className="text-zinc-500 text-sm mt-1 mb-6 max-w-sm mx-auto">
            You haven&apos;t saved any shipping addresses yet. Add one now to
            save time during checkout.
          </p>
          <CustomButton
            variant="outline"
            theme="neutral"
            onClick={handleOpenAdd}
            leftIcon={<RiAddLine />}
          >
            Add Your First Address
          </CustomButton>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Ensure default address always appears first using sort */}
          {!isFormOpen &&
            [...addresses].map((address) => (
              <AddressCard
                key={address._id}
                address={address}
                onEdit={handleOpenEdit}
              />
            ))}
        </div>
      )}
    </div>
  );
}
