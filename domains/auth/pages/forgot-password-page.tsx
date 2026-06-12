"use client";

import { RiMailLine } from "react-icons/ri";
import { AuthPageHeader } from "../components/layout/AuthPageHeader";
import { AuthCard } from "../components/layout/AuthCard";
import { AuthBackLink } from "../components/layout/AuthBackLink";
import { ForgotPasswordForm } from "../components/forgot-password/ForgotPasswordForm";

export default function ForgotPasswordPage() {
  return (
    <main className="grow flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-[400px] flex flex-col items-center">
        <AuthPageHeader
          title="Reset your password"
          subtitle="Enter the email associated with your account and we'll send a secure reset link."
          icon={<RiMailLine size={26} className="text-amber-500" />}
        />

        <AuthCard>
          <ForgotPasswordForm />
          <AuthBackLink />
        </AuthCard>
      </div>
    </main>
  );
}
