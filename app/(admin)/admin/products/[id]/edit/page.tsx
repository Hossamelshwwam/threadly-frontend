import AdminEditProductPage from "@/domains/products/pages/AdminEditProductPage";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <AdminEditProductPage id={id} />;
}
