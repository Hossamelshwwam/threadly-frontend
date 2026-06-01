"use client";

import Link from "next/link";
import { FiMail, FiArrowLeft } from "react-icons/fi";
import { FaArrowRight } from "react-icons/fa";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import CustomButton from "@/shared/components/custom-button/custom-button";
import CustomInput from "@/shared/components/custom-input/CustomInput";
import useAuthForgotPassword from "../hooks/useAuthForgotPassword";
import useForgotPasswordSchema, {
  ForgotPasswordSchemaType,
} from "../schemas/useForgotPasswordSchema";

export default function ForgotPasswordPage() {
  const { mutateAsync: forgotPassword, isPending } = useAuthForgotPassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ForgotPasswordSchemaType>({
    resolver: zodResolver(useForgotPasswordSchema),
  });

  const onSubmit = (data: ForgotPasswordSchemaType) => {
    toast.promise(
      forgotPassword(data.email).then(() => reset()),
      {
        loading: "Sending reset link...",
        success: "Reset link sent! Check your inbox.",
        error: (err) => err.response?.data?.message ?? "Something went wrong.",
      },
    );
  };

  return (
    <main className="grow flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-100 flex flex-col items-center">
        {/* Icon + header */}
        <div className="mb-8 w-full text-center">
          <div className="w-16 h-16 rounded-full bg-main-subtle border border-amber-200 flex items-center justify-center mx-auto mb-5">
            <FiMail size={26} className="text-amber-500" />
          </div>
          <h1 className="font-sans text-3xl font-bold text-on-surface mb-2">
            Reset your password
          </h1>
          <p className="text-base text-on-surface-muted leading-relaxed max-w-xs mx-auto">
            Enter the email associated with your account and we'll send a secure
            reset link.
          </p>
        </div>

        {/* Card */}
        <div className="w-full bg-white border border-zinc-200 p-8 rounded-lg shadow-sm">
          <form
            className="flex flex-col gap-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            <CustomInput
              name="email"
              type="email"
              label="Email Address"
              placeholder="name@example.com"
              Icon={FiMail}
              registerProps={register("email")}
              error={errors.email?.message}
            />

            <CustomButton
              type="submit"
              variant="solid"
              theme="primary"
              className="w-full mt-2"
              loading={isPending}
              rightIcon={<FaArrowRight size={10} />}
            >
              Send Reset Link
            </CustomButton>
          </form>

          {/* Divider */}
          <div className="mt-6 pt-6 border-t border-zinc-200 flex justify-center">
            <Link
              href="/login"
              className="inline-flex items-center gap-1.5 text-sm text-on-surface-muted hover:text-main transition-colors"
            >
              <FiArrowLeft size={14} />
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
