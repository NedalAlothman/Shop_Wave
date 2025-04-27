import React from "react";
import OrderConfirmationPage from "./OrderPageClient";

export default function page({ params }: { params: { orderId: string } }) {
  return <OrderConfirmationPage orderId={params?.orderId} />;
}
