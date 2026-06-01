import Link from "next/link";
import React from "react";
import LoginForm from "../components/login/login-form";
import { FcGoogle } from "react-icons/fc";
import CustomButton from "@/shared/components/custom-button/custom-button";

export default function LoginPage() {
  return (
    <main className="grow flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-100 flex flex-col items-center">
        {/* Hero Visual or Context */}
        <div className="mb-8 w-full text-center">
          <h1 className="font-sans text-3xl font-bold text-on-surface mb-2">
            Welcome back
          </h1>
          <p className="text-base text-on-surface-muted">
            Please enter your details to sign in.
          </p>
        </div>

        {/* Login Card */}
        <div className="w-full p-8 rounded-lg bg-white border border-zinc-200 shadow-sm">
          <LoginForm />

          <div className="flex justify-end mt-2">
            <Link
              href="/forgot-password"
              className="text-sm text-on-surface-muted hover:text-main hover:underline transition-all"
            >
              Forgot password?
            </Link>
          </div>

          {/* Social Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-zinc-200"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-4 text-xs font-medium text-on-surface-muted">
                Or continue with
              </span>
            </div>
          </div>

          {/* Social Auth Buttons */}
          <div className="flex items-center justify-center">
            <CustomButton
              rightIcon={<FcGoogle size={20} />}
              className="w-full"
              variant="outline"
              theme="primary"
            >
              Continue with Google
            </CustomButton>
          </div>
        </div>

        {/* Redirect Link */}
        <p className="mt-8 text-sm text-on-surface-muted">
          Don't have an account?{" "}
          <Link
            href="/register"
            className="text-main font-semibold hover:text-main-warm hover:underline transition-all"
          >
            Sign up
          </Link>
        </p>
      </div>
    </main>
  );
}
