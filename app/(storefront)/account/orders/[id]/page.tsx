import AccountOrderDetailPage from "@/domains/orders/pages/AccountOrderDetailPage";

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <AccountOrderDetailPage id={id} />;
}
