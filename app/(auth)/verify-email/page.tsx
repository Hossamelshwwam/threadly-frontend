import VerifyEmailPage from "@/domains/auth/pages/verify-email-page";

export const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) => {
  const { token } = await searchParams;
  return <VerifyEmailPage token={token} />;
};

export default page;
