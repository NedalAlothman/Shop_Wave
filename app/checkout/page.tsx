"use client";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useStore } from "@/contexts/StoreContext";
import { CartItem } from "@/components/cart/CartItem";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const CheckoutPage = () => {
  const { cart, totalItems } = useStore();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Redirect if cart is empty
  if (cart.length === 0) {
    return (
      <div className="page-container flex flex-col items-center justify-center py-16">
        <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
        <p className="text-muted-foreground mb-6">
          Add some products to your cart before proceeding to checkout.
        </p>
        <Button asChild>
          <Link href="/products">Browse Products</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="page-container animate-fade-in">
      <div className="mb-8">
        <Button asChild variant="ghost" className="mb-4">
          <Link href="/cart" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Cart
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Checkout</h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Summary */}
        <div className="w-full lg:w-1/3 order-1 lg:order-none">
          <div className="bg-card rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <p className="text-muted-foreground mb-4">
              {totalItems} {totalItems === 1 ? "item" : "items"} in your cart
            </p>

            <div className="max-h-[300px] overflow-y-auto divide-y pr-2">
              {cart.map((item) => (
                <CartItem key={item.product.id} item={item} />
              ))}
            </div>
          </div>
        </div>

        {/* Checkout Form */}
        <div className="flex-1">
          <CheckoutForm />
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
