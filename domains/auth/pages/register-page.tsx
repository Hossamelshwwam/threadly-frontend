import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import CustomButton from "@/shared/components/custom-button/custom-button";
import RegisterForm from "../components/register/RegisterForm";

export default function RegisterPage() {
  return (
    <main className="grow flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-[400px] flex flex-col items-center">
        {/* Header */}
        <div className="mb-8 w-full text-center">
          <h1 className="font-sans text-3xl font-bold text-on-surface mb-2">
            Join Threadly
          </h1>
          <p className="text-base text-on-surface-muted">
            Create your account to start curating your style.
          </p>
        </div>

        {/* Card */}
        <div className="w-full bg-surface-low p-8 rounded-lg border border-border shadow-sm">
          <RegisterForm />

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-surface-high" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-surface-low px-4 text-xs font-medium text-on-surface-muted">
                Or continue with
              </span>
            </div>
          </div>

          {/* Social */}
          <div className="flex items-center justify-center">
            <CustomButton
              rightIcon={<FcGoogle size={20} />}
              className="w-full"
              variant="outline"
              theme="neutral"
            >
              Continue with Google
            </CustomButton>
          </div>
        </div>

        {/* Redirect */}
        <p className="mt-8 text-sm text-on-surface-muted">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-accent font-semibold hover:text-accent-warm hover:underline transition-all"
          >
            Sign in
          </Link>
        </p>
      </div>
    </main>
  );
}
