import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { PriceTag } from "../ui/price-tag";
import { Product } from "../../types/store";
import { useStore } from "../../contexts/StoreContext";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useStore();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <Card className="overflow-hidden product-card-hover">
      <Link href={`/products/${product.id}`}>
        <div className="aspect-square overflow-hidden bg-muted">
          <Image
            src={product.image}
            alt={product.name}
            width={500}
            height={500}
            className="h-full w-full object-cover transition-all hover:scale-105"
          />
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold text-lg line-clamp-1">{product.name}</h3>
          <p className="text-muted-foreground text-sm line-clamp-2 mt-1 h-10">
            {product.description}
          </p>
          <div className="mt-2">
            <PriceTag price={product.price} />
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <Button
            onClick={handleAddToCart}
            className="w-full"
            variant="outline"
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart
          </Button>
        </CardFooter>
      </Link>
    </Card>
  );
}
