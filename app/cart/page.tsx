"use client";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CartItem } from "@/components/cart/CartItem";
import { CartSummary } from "@/components/cart/CartSummary";
import { useStore } from "@/contexts/StoreContext";
import { ShoppingCart, Trash2, ArrowRight } from "lucide-react";
import Link from "next/link";

const CartPage = () => {
  const { cart, clearCart, totalItems } = useStore();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Empty cart state
  if (cart.length === 0) {
    return (
      <div className="page-container flex flex-col items-center justify-center py-16 animate-fade-in">
        <div className="h-24 w-24 rounded-full bg-muted flex items-center justify-center mb-6">
          <ShoppingCart className="h-12 w-12 text-muted-foreground" />
        </div>
        <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
        <p className="text-muted-foreground mb-6">
          Looks like you haven&#39;t added anything to your cart yet.
        </p>
        <Button asChild>
          <Link href="/products">Start Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="page-container animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start mb-6">
        <h1 className="text-3xl font-bold">Shopping Cart</h1>

        <div className="mt-4 md:mt-0">
          <Button
            variant="outline"
            size="sm"
            onClick={clearCart}
            className="flex items-center"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Clear Cart
          </Button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="flex-1">
          <div className="bg-card rounded-lg shadow-sm border p-6">
            <div className="mb-4">
              <p className="text-muted-foreground">
                {totalItems} {totalItems === 1 ? "item" : "items"} in your cart
              </p>
            </div>
            <div className="divide-y">
              {cart.map((item) => (
                <CartItem key={item.product.id} item={item} />
              ))}
            </div>
          </div>

          <div className="mt-6 flex justify-between items-center">
            <Button asChild variant="outline">
              <Link href="/products" className="flex items-center">
                Continue Shopping
              </Link>
            </Button>

            <Button asChild className="md:hidden">
              <Link href="/checkout" className="flex items-center">
                Checkout
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Order Summary */}
        <div className="w-full lg:w-1/3">
          <CartSummary />
        </div>
      </div>
    </div>
  );
};

export default CartPage;
