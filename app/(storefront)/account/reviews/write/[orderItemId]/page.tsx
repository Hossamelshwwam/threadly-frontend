import AccountWriteReviewPage from "@/domains/reviews/pages/AccountWriteReviewPage";
import React from "react";

export default async function page({
  params,
}: {
  params: Promise<{ orderItemId: string }>;
}) {
  const { orderItemId } = await params;

  return <AccountWriteReviewPage orderItemId={orderItemId} />;
}
