import LoginPage from "@/domains/auth/pages/login-page";

export default async function page({
  searchParams,
}: {
  searchParams: Promise<{ redirect?: string }>;
}) {
  const { redirect } = await searchParams;
  return <LoginPage redirect={redirect} />;
}
