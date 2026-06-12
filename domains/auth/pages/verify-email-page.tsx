"use client";

import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";
import {
  RiCheckLine,
  RiCloseLine,
  RiMailLine,
  RiLoader4Line,
} from "react-icons/ri";
import CustomButton from "@/shared/components/custom-button/custom-button";
import CustomInput from "@/shared/components/custom-input/CustomInput";
import useAuthVerifyEmail from "../hooks/useAuthVerifyEmail";
import useAuthSendVerificationEmail from "../hooks/useAuthSendVerificationEmail";

export default function EmailVerifiedPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") as string;
  const { isPending, isError } = useAuthVerifyEmail(token);
  const { mutateAsync: sendVerificationEmailAgain, isPending: isSending } =
    useAuthSendVerificationEmail();
  const [email, setEmail] = useState("");

  const handleSend = () => {
    toast.promise(sendVerificationEmailAgain(email), {
      loading: "Sending verification email...",
      success: "Verification email sent successfully!",
      error: "Failed to send verification email!",
    });
  };

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Loading
  if (isPending) {
    return (
      <main className="grow flex items-center justify-center px-4 py-16">
        <div className="flex flex-col items-center gap-5 text-center">
          <RiLoader4Line size={36} className="text-amber-400 animate-spin" />
          <p className="text-base font-medium text-zinc-500">
            Verifying your email...
          </p>
        </div>
      </main>
    );
  }

  // Error
  if (!token || isError) {
    return (
      <main className="grow flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-[400px] flex flex-col items-center text-center">
          <div className="mb-8 w-20 h-20 rounded-full bg-red-50 border border-red-200 flex items-center justify-center">
            <RiCloseLine size={36} className="text-red-500" />
          </div>

          <h1 className="text-3xl font-bold text-zinc-900 mb-3">
            Verification Failed
          </h1>
          <p className="text-base text-zinc-500 leading-relaxed max-w-sm">
            This link is invalid or has expired. Enter your email and we&apos;ll
            send you a new verification link.
          </p>

          <div className="mt-8 w-full bg-white border border-zinc-200 rounded-lg p-6 flex flex-col gap-4 text-left">
            <CustomInput
              name="email"
              type="email"
              label="Email Address"
              placeholder="name@example.com"
              Icon={RiMailLine}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <CustomButton
              variant="solid"
              theme="primary"
              className="w-full"
              disabled={!isEmailValid || isSending}
              loading={isSending}
              onClick={handleSend}
            >
              Resend Verification Email
            </CustomButton>
          </div>

          <Link
            href="/login"
            className="mt-5 text-sm text-zinc-500 hover:text-amber-600 hover:underline underline-offset-4 transition-colors"
          >
            Back to Login
          </Link>
        </div>
      </main>
    );
  }

  // Success
  return (
    <main className="grow flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-[400px] flex flex-col items-center text-center">
        <div className="mb-8 w-20 h-20 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center">
          <RiCheckLine size={36} className="text-amber-500" />
        </div>
        <h1 className="text-3xl font-bold text-zinc-900 mb-3">
          Email Verified
        </h1>
        <p className="text-base text-zinc-500 leading-relaxed max-w-sm">
          Your account has been successfully verified. You now have full access
          to Threadly&apos;s curated collections and exclusive marketplace
          features.
        </p>
        <div className="mt-10 w-full">
          <Link href="/login" className="block">
            <CustomButton
              variant="solid"
              theme="primary"
              className="w-full"
              size="lg"
            >
              Continue to Login
            </CustomButton>
          </Link>
        </div>
      </div>
    </main>
  );
}
