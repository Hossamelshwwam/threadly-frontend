"use client";

import {
  RiUserForbidLine,
  RiUserFollowLine,
  RiCheckboxCircleLine,
  RiCloseCircleLine,
} from "react-icons/ri";
import type { UserProfile, UserRole } from "../../types/user.types";
import CustomButton from "@/shared/components/custom-button/custom-button";
import { ConfirmationDialog } from "@/shared/components/confirmation-dialog/ConfirmationDialog";
import { cn } from "@/shared/lib";
import { RoleBadge } from "../RoleBadge";
import { StatusBadge } from "../StatusBadge";

interface UserProfileSidebarProps {
  user: UserProfile;
  isToggling: boolean;
  onToggleStatus: (variables: { id: string; isActive: boolean }) => void;
}

export function UserProfileSidebar({
  user,
  isToggling,
  onToggleStatus,
}: UserProfileSidebarProps) {
  return (
    <div className="flex flex-col gap-4">
      {/* Profile summary card */}
      <div className="bg-white border border-zinc-200 rounded-lg p-6">
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-700 text-2xl font-700 flex items-center justify-center">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <p className="text-xl font-700 text-zinc-900 mt-3">{user.name}</p>
          <p className="text-sm text-zinc-400 mt-0.5">{user.email}</p>
        </div>

        <div className="border-t border-zinc-100 mt-5 pt-4">
          {[
            {
              label: "Phone",
              value: user.phone ?? (
                <span className="text-zinc-300">Not provided</span>
              ),
            },
            { label: "Role", value: <RoleBadge role={user.role} /> },
            {
              label: "Status",
              value: <StatusBadge isActive={user.isActive} />,
            },
            {
              label: "Verified",
              value: user.isVerified ? (
                <RiCheckboxCircleLine className="text-base text-success" />
              ) : (
                <RiCloseCircleLine className="text-base text-error" />
              ),
            },
            {
              label: "Joined",
              value: new Date(user.createdAt).toLocaleDateString("en-EG", {
                day: "numeric",
                month: "short",
                year: "numeric",
              }),
            },
          ].map(({ label, value }) => (
            <div
              key={label}
              className="flex items-center justify-between py-2.5 border-b border-zinc-50 last:border-0"
            >
              <span className="text-xs font-600 text-zinc-400 uppercase tracking-wider">
                {label}
              </span>
              <span className="text-sm font-500 text-zinc-700">{value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Actions card */}
      <div className="bg-white border border-zinc-200 rounded-lg p-5">
        <p className="text-sm font-700 text-zinc-700 mb-3">Account Actions</p>
        {user.isActive ? (
          <ConfirmationDialog
            variant="danger"
            title="Suspend Account"
            description="This will prevent the user from accessing their account."
            confirmText="Suspend"
            requireCheckbox
            checkboxLabel="I confirm I want to suspend this user"
            isLoading={isToggling}
            onConfirm={() => onToggleStatus({ id: user._id, isActive: false })}
          >
            <CustomButton
              variant="soft"
              theme="danger"
              size="md"
              fullWidth
              leftIcon={<RiUserForbidLine />}
            >
              Suspend Account
            </CustomButton>
          </ConfirmationDialog>
        ) : (
          <ConfirmationDialog
            variant="success"
            title="Reactivate Account"
            description="This will restore the user's access to their account."
            confirmText="Reactivate"
            isLoading={isToggling}
            onConfirm={() => onToggleStatus({ id: user._id, isActive: true })}
          >
            <CustomButton
              variant="soft"
              theme="success"
              size="md"
              fullWidth
              leftIcon={<RiUserFollowLine />}
            >
              Reactivate Account
            </CustomButton>
          </ConfirmationDialog>
        )}
      </div>
    </div>
  );
}
