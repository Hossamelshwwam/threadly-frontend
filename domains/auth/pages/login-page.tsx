import { AuthPageHeader } from "../components/layout/AuthPageHeader";
import { AuthCard } from "../components/layout/AuthCard";
import { AuthSocialSection } from "../components/layout/AuthSocialSection";
import { AuthRedirectLink } from "../components/layout/AuthRedirectLink";
import LoginForm from "../components/login/login-form";

export default function LoginPage() {
  return (
    <main className="grow flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-[400px] flex flex-col items-center">
        <AuthPageHeader
          title="Welcome back"
          subtitle="Please enter your details to sign in."
        />

        <AuthCard>
          <LoginForm />

          <div className="flex justify-end mt-2">
            <a
              href="/forgot-password"
              className="text-sm text-zinc-500 hover:text-amber-600 hover:underline transition-all"
            >
              Forgot password?
            </a>
          </div>

          <AuthSocialSection />
        </AuthCard>

        <AuthRedirectLink href="/register">Don&apos;t have an account?</AuthRedirectLink>
      </div>
    </main>
  );
}
