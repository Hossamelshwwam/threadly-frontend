import OrderConfirmationPage from "@/domains/orders/pages/OrderConfirmationPage";
import React from "react";

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <OrderConfirmationPage id={id} />;
}
