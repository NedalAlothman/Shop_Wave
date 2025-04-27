"use client";

import React from "react";
import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

declare global {
  interface Window {
    confetti: (options: {
      particleCount: number;
      spread: number;
      origin: { y: number };
    }) => void;
  }
}

export default function OrderConfirmationPage({
  orderId,
}: {
  orderId: string;
}) {
  useEffect(() => {
    window.scrollTo(0, 0);

    // Confetti effect
    const confettiScript = document.createElement("script");
    confettiScript.src =
      "https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js";
    confettiScript.async = true;
    confettiScript.onload = () => {
      window.confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    };
    document.body.appendChild(confettiScript);

    return () => {
      if (document.body.contains(confettiScript)) {
        document.body.removeChild(confettiScript);
      }
    };
  }, []);

  return (
    <div className="page-container flex flex-col items-center justify-center py-16 animate-fade-in">
      <div className="max-w-md w-full bg-card rounded-lg shadow-sm border p-8 text-center">
        <div className="flex justify-center mb-6">
          <div className="h-20 w-20 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
            <CheckCircle2 className="h-10 w-10 text-green-600 dark:text-green-400" />
          </div>
        </div>

        <h1 className="text-2xl font-bold mb-2">Order Confirmed!</h1>
        <p className="text-muted-foreground mb-4">
          Thank you for your purchase. Your order has been successfully placed.
        </p>

        <div className="bg-muted rounded p-4 mb-6">
          <p className="text-sm font-medium">Order Number:</p>
          <p className="text-lg font-bold">{orderId}</p>
        </div>

        <p className="text-sm text-muted-foreground mb-6">
          A confirmation email has been sent to your email address. You can
          track your order using the order number above.
        </p>

        <div className="space-y-4">
          <Button asChild className="w-full">
            <Link href="/products">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
