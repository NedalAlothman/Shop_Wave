"use client";
import { Button } from "../components/ui/button";
import { ProductGrid } from "../components/product/ProductGrid";
import { getFeaturedProducts, getAllCategories } from "../data/products";
import { useEffect } from "react";
import Link from "next/link";

const HomePage = () => {
  const featuredProducts = getFeaturedProducts();
  const categories = getAllCategories();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 text-white">
        <div className="page-container flex flex-col items-center py-16 md:py-24">
          <h1 className="text-3xl md:text-5xl font-bold text-center max-w-3xl">
            Discover Amazing Products for Your Lifestyle
          </h1>
          <p className="mt-6 text-lg md:text-xl text-center max-w-2xl">
            Shop the latest trends in electronics, accessories, and more. Free
            shipping on orders over $100!
          </p>
          <div className="mt-8">
            <Button
              asChild
              // size="lg"
              className="bg-white text-indigo-600 hover:bg-gray-100"
            >
              <Link href="/products">Shop Now</Link>
            </Button>
          </div>
        </div>

        {/* <div className="absolute inset-0 bg-black opacity-30 z-0"></div> */}
      </section>

      {/* Featured Products Section */}
      <section className="page-container py-16">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">Featured Products</h2>
          <Link
            href="/products"
            className="mt-4 md:mt-0 text-primary hover:underline"
          >
            View all products
          </Link>
        </div>
        <ProductGrid products={featuredProducts} />
      </section>

      {/* Categories Section */}
      <section className="bg-muted py-16">
        <div className="page-container">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
            Shop by Category
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Link
                key={category}
                href={`/products?category=${category}`}
                className="group relative rounded-lg overflow-hidden h-48 bg-white shadow-md hover:shadow-xl transition-all"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity z-10"></div>
                <div className="absolute bottom-0 left-0 p-6 z-20">
                  <h3 className="text-xl font-semibold text-white capitalize">
                    {category}
                  </h3>
                  <p className="text-white/80 mt-1 group-hover:text-white transition-colors">
                    Explore {category}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="page-container py-16 text-center">
        <h2 className="text-2xl md:text-3xl font-bold">
          Ready to get started?
        </h2>
        <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
          Browse our collection of high-quality products curated just for you.
        </p>
        <div className="mt-8">
          <Button
            asChild
            // size="lg"
          >
            <Link href="/products">Shop All Products</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
