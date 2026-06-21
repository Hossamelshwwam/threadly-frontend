"use client";

import { RiLockLine } from "react-icons/ri";
import { AuthPageHeader } from "../components/layout/AuthPageHeader";
import { AuthCard } from "../components/layout/AuthCard";
import { AuthBackLink } from "../components/layout/AuthBackLink";
import { ResetPasswordForm } from "../components/reset-password/ResetPasswordForm";

export default function ResetPasswordPage({ token }: { token?: string }) {
  return (
    <main className="grow flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-[400px] flex flex-col items-center">
        <AuthPageHeader
          title="Reset password"
          subtitle="Please enter a new password for your account."
          icon={<RiLockLine size={26} className="text-amber-500" />}
        />

        <AuthCard>
          <ResetPasswordForm token={token as string} />
          <AuthBackLink />
        </AuthCard>
      </div>
    </main>
  );
}
