"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { PriceTag } from "@/components/ui/price-tag";
import { getProductById, getProductsByCategory } from "@/data/products";
import { useStore } from "@/contexts/StoreContext";
import { ProductGrid } from "@/components/product/ProductGrid";
import { ShoppingCart, Plus, Minus, ArrowLeft } from "lucide-react";
import Image from "next/image";
import { useUser } from '@/lib/UserContext';
import { useToast } from '@/hooks/use-toast';

const ProductDetailPage = () => {
  const { productId } = useParams();
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useStore();
  const { toast } = useToast();
  const user = useUser();

  // Get product details
  const product =
    typeof productId === "string" ? getProductById(productId) : undefined;

  // Get related products
  const relatedProducts = product
    ? getProductsByCategory(product.category)
        .filter((p) => p.id !== product.id)
        .slice(0, 4)
    : [];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [productId]);

  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = () => {
    if (!user) {
      toast({
        title: 'الرجاء تسجيل الدخول أولاً',
        description: 'يجب عليك تسجيل الدخول لإضافة المنتجات إلى السلة',
        variant: 'destructive',
      });
      router.push('/login');
      return;
    }
    
    if (product) {
      addToCart(product, quantity);
      toast({
        title: 'تمت الإضافة',
        description: `تمت إضافة ${product.name} إلى السلة`,
      });
    }
  };

  if (!product) {
    return (
      <div className="page-container flex flex-col items-center justify-center py-16">
        <h2 className="text-2xl font-semibold mb-4">Product Not Found</h2>
        <p className="text-muted-foreground mb-8">
          The product you&apos;re looking for doesn&apos;t exist.
        </p>
        <Button onClick={() => router.push("/products")}>
          Browse Products
        </Button>
      </div>
    );
  }

  return (
    <div className="page-container animate-fade-in">
      <Button
        variant="ghost"
        className="mb-6 flex items-center gap-2"
        onClick={() => router.back()}
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div className="bg-muted rounded-lg overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            width={500}
            height={500}
            className="w-full h-full object-contain aspect-square"
          />
        </div>

        <div className="flex flex-col">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <div className="mt-4">
            <PriceTag price={product.price} size="lg" />
          </div>

          <Separator className="my-6" />

          <div className="prose prose-sm max-w-none mb-6">
            <p className="text-muted-foreground">{product.description}</p>
          </div>

          <div className="flex items-center gap-4 mt-auto">
            <span className="text-sm font-medium">Quantity:</span>
            <div className="flex items-center">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-r-none"
                onClick={decreaseQuantity}
              >
                <Minus className="h-3 w-3" />
              </Button>
              <div className="h-8 w-12 flex items-center justify-center border-y">
                {quantity}
              </div>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-l-none"
                onClick={increaseQuantity}
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>
          </div>

          <Button
            className="mt-6 w-full sm:w-auto"
            size="lg"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart
          </Button>

          <div className="mt-6">
            <span className="text-sm text-muted-foreground">
              Category: <span className="capitalize">{product.category}</span>
            </span>
          </div>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <div className="my-16">
          <h2 className="text-2xl font-bold mb-8">You might also like</h2>
          <ProductGrid products={relatedProducts} />
        </div>
      )}
    </div>
  );
};

export default ProductDetailPage;
