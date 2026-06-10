import SellerProductDetailPage from "@/domains/products/pages/SellerProductDetailPage";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <SellerProductDetailPage id={id} />;
}
