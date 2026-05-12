import Link from "next/link";
import React from "react";
import LoginForm from "../components/login/login-form";
import { FcGoogle } from "react-icons/fc";
import CustomButton from "@/shared/components/custom-button/custom-button";

export default function LoginPage() {
  return (
    <main className="grow flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-[400px] flex flex-col items-center">
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
        <div className="w-full bg-surface-low p-8 rounded-lg border border-border shadow-sm">
          <LoginForm />

          {/* Social Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-surface-high"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-surface-low px-4 text-xs font-medium text-on-surface-muted">
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
            className="text-accent font-semibold hover:text-accent-warm hover:underline transition-all"
          >
            Sign up
          </Link>
        </p>
      </div>
    </main>
  );
}
