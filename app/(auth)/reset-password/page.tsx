import ResetPasswordPage from "@/domains/auth/pages/reset-password-page";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;
  return <ResetPasswordPage token={token} />;
}
