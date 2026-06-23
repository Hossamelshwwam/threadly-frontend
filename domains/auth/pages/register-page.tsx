import { AuthPageHeader } from "../components/layout/AuthPageHeader";
import { AuthCard } from "../components/layout/AuthCard";
import { AuthSocialSection } from "../components/layout/AuthSocialSection";
import { AuthRedirectLink } from "../components/layout/AuthRedirectLink";
import RegisterForm from "../components/register/RegisterForm";

export default function RegisterPage() {
  return (
    <main className="grow flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-[400px] flex flex-col items-center">
        <AuthPageHeader
          title="Join Threadly"
          subtitle="Create your account to start curating your style."
        />

        <AuthCard>
          <RegisterForm />
          {/* <AuthSocialSection /> */}
        </AuthCard>

        <AuthRedirectLink href="/login">
          Already have an account?
        </AuthRedirectLink>
      </div>
    </main>
  );
}
