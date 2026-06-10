import SellerOrderDetailPage from "@/domains/orders/pages/SellerOrderDetailPage";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <SellerOrderDetailPage id={id} />;
}
