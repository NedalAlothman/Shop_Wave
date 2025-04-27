"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useStore } from "@/contexts/StoreContext";
import { toast } from "@/components/ui/use-toast";

export function CheckoutForm() {
  const router = useRouter();
  const { cart, totalAmount, clearCart } = useStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form fields with validation
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    zip: "",
    cardName: "",
    cardNumber: "",
    expDate: "",
    cvv: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) newErrors.fullName = "Required";

    if (!formData.email.trim()) {
      newErrors.email = "Required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email";
    }

    if (!formData.address.trim()) newErrors.address = "Required";
    if (!formData.city.trim()) newErrors.city = "Required";
    if (!formData.zip.trim()) newErrors.zip = "Required";

    if (!formData.cardName.trim()) newErrors.cardName = "Required";

    if (!formData.cardNumber.trim()) {
      newErrors.cardNumber = "Required";
    } else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ""))) {
      newErrors.cardNumber = "Invalid card number";
    }

    if (!formData.expDate.trim()) {
      newErrors.expDate = "Required";
    } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expDate)) {
      newErrors.expDate = "Format: MM/YY";
    }

    if (!formData.cvv.trim()) {
      newErrors.cvv = "Required";
    } else if (!/^\d{3,4}$/.test(formData.cvv)) {
      newErrors.cvv = "Invalid CVV";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast({
        title: "Form validation failed",
        description: "Please check the highlighted fields and try again.",
        variant: "destructive",
      });
      return;
    }

    if (cart.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Add some products to your cart before checkout.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate order processing
    setTimeout(() => {
      const orderId = `ORD-${Date.now().toString().slice(-6)}`;
      clearCart();
      setIsSubmitting(false);
      router.push(`/order-confirmation/${orderId}`);
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-6 md:grid-cols-2">
        {/* Shipping Information */}
        <Card>
          <CardHeader>
            <CardTitle>Shipping Information</CardTitle>
            <CardDescription>Enter your shipping details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className={errors.fullName ? "border-destructive" : ""}
              />
              {errors.fullName && (
                <p className="text-destructive text-sm">{errors.fullName}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? "border-destructive" : ""}
              />
              {errors.email && (
                <p className="text-destructive text-sm">{errors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className={errors.address ? "border-destructive" : ""}
              />
              {errors.address && (
                <p className="text-destructive text-sm">{errors.address}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className={errors.city ? "border-destructive" : ""}
                />
                {errors.city && (
                  <p className="text-destructive text-sm">{errors.city}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="zip">ZIP Code</Label>
                <Input
                  id="zip"
                  name="zip"
                  value={formData.zip}
                  onChange={handleChange}
                  className={errors.zip ? "border-destructive" : ""}
                />
                {errors.zip && (
                  <p className="text-destructive text-sm">{errors.zip}</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Information */}
        <Card>
          <CardHeader>
            <CardTitle>Payment Information</CardTitle>
            <CardDescription>Enter your payment details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="cardName">Name on Card</Label>
              <Input
                id="cardName"
                name="cardName"
                value={formData.cardName}
                onChange={handleChange}
                className={errors.cardName ? "border-destructive" : ""}
              />
              {errors.cardName && (
                <p className="text-destructive text-sm">{errors.cardName}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="cardNumber">Card Number</Label>
              <Input
                id="cardNumber"
                name="cardNumber"
                placeholder="1234 5678 9012 3456"
                value={formData.cardNumber}
                onChange={handleChange}
                className={errors.cardNumber ? "border-destructive" : ""}
              />
              {errors.cardNumber && (
                <p className="text-destructive text-sm">{errors.cardNumber}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expDate">Expiration Date</Label>
                <Input
                  id="expDate"
                  name="expDate"
                  placeholder="MM/YY"
                  value={formData.expDate}
                  onChange={handleChange}
                  className={errors.expDate ? "border-destructive" : ""}
                />
                {errors.expDate && (
                  <p className="text-destructive text-sm">{errors.expDate}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="cvv">CVV</Label>
                <Input
                  id="cvv"
                  name="cvv"
                  placeholder="123"
                  value={formData.cvv}
                  onChange={handleChange}
                  className={errors.cvv ? "border-destructive" : ""}
                />
                {errors.cvv && (
                  <p className="text-destructive text-sm">{errors.cvv}</p>
                )}
              </div>
            </div>

            <div className="pt-4">
              <Separator className="mb-4" />
              <p className="font-semibold">
                Order Total: ${totalAmount.toFixed(2)}
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              className="w-full"
              disabled={isSubmitting || cart.length === 0}
            >
              {isSubmitting ? "Processing..." : "Place Order"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </form>
  );
}
