import { cn } from "../../lib/utils";

interface PriceTagProps {
  price: number;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function PriceTag({ price, className, size = "md" }: PriceTagProps) {
  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);

  const sizeClasses = {
    sm: "text-sm",
    md: "text-lg",
    lg: "text-2xl font-bold",
  };

  return (
    <span
      className={cn("font-semibold text-primary", sizeClasses[size], className)}
    >
      {formattedPrice}
    </span>
  );
}
