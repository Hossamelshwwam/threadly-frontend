import AdminSellerDetailPage from "@/domains/sellers/pages/AdminSellerDetailPage";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <AdminSellerDetailPage id={id} />;
}
