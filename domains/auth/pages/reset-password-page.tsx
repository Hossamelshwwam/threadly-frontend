"use client";

import Link from "next/link";
import { FiLock, FiArrowLeft, FiCheckCircle, FiCircle } from "react-icons/fi";
import { FaArrowRight } from "react-icons/fa";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";
import CustomButton from "@/shared/components/custom-button/custom-button";
import CustomInput from "@/shared/components/custom-input/CustomInput";
import useAuthResetPassword from "../hooks/useAuthResetPassword";
import useResetPasswordSchema, {
  ResetPasswordSchemaType,
} from "../schemas/useResetPasswordSchema";

export default function ResetPasswordPage() {
  const { mutateAsync: resetPassword, isPending } = useAuthResetPassword();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") as string;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ResetPasswordSchemaType>({
    resolver: zodResolver(useResetPasswordSchema),
  });

  const password = watch("password", "");
  const hasMinLength = password.length >= 8;
  const hasNumber = /\d/.test(password);

  const onSubmit = (data: ResetPasswordSchemaType) => {
    toast.promise(resetPassword({ token, password: data.password }), {
      loading: "Resetting password...",
      success: "Password reset! You can now log in.",
      error: (err) => err.response?.data?.message ?? "Something went wrong.",
    });
  };

  return (
    <main className="grow flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-[400px] flex flex-col items-center">
        {/* Icon + header */}
        <div className="mb-8 w-full text-center">
          <div className="w-16 h-16 rounded-full bg-accent-subtle border border-amber-200 flex items-center justify-center mx-auto mb-5">
            <FiLock size={26} className="text-amber-500" />
          </div>
          <h1 className="font-sans text-3xl font-bold text-on-surface mb-2">
            Reset password
          </h1>
          <p className="text-base text-on-surface-muted">
            Please enter a new password for your account.
          </p>
        </div>

        {/* Card */}
        <div className="w-full bg-surface-low p-8 rounded-lg border border-border shadow-sm">
          <form
            className="flex flex-col gap-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            <CustomInput
              name="password"
              type="password"
              label="New Password"
              placeholder="Min. 8 characters"
              Icon={FiLock}
              registerProps={register("password")}
              error={errors.password?.message}
            />

            <CustomInput
              name="confirmPassword"
              type="password"
              label="Confirm Password"
              placeholder="Repeat new password"
              Icon={FiLock}
              registerProps={register("confirmPassword")}
              error={errors.confirmPassword?.message}
            />

            {/* Password rules */}
            <div className="flex flex-col gap-2">
              {[
                { pass: hasMinLength, label: "At least 8 characters" },
                { pass: hasNumber, label: "Contains at least one number" },
              ].map(({ pass, label }) => (
                <span
                  key={label}
                  className="flex items-center gap-2 text-sm transition-colors"
                >
                  {pass ? (
                    <FiCheckCircle
                      size={14}
                      className="text-amber-500 shrink-0"
                    />
                  ) : (
                    <FiCircle size={14} className="text-zinc-300 shrink-0" />
                  )}
                  <span
                    className={
                      pass ? "text-amber-600" : "text-on-surface-muted"
                    }
                  >
                    {label}
                  </span>
                </span>
              ))}
            </div>

            <CustomButton
              type="submit"
              variant="solid"
              theme="primary"
              className="w-full mt-2"
              loading={isPending}
              rightIcon={<FaArrowRight size={10} />}
            >
              Reset Password
            </CustomButton>
          </form>

          {/* Back link */}
          <div className="mt-6 pt-6 border-t border-surface-high flex justify-center">
            <Link
              href="/login"
              className="inline-flex items-center gap-1.5 text-sm text-on-surface-muted hover:text-accent transition-colors"
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
