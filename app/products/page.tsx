"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ProductGrid } from "@/components/product/ProductGrid";
import { products, getAllCategories } from "@/data/products";
import { Search, SlidersHorizontal, X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const ProductsPage = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const categories = getAllCategories();

  const categoryParam = searchParams.get("category");
  const searchParam = searchParams.get("search");

  const [filteredProducts, setFilteredProducts] = useState(products);
  const [searchQuery, setSearchQuery] = useState(searchParam || "");
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    categoryParam ? [categoryParam] : []
  );
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams();
    if (searchQuery) params.set("search", searchQuery);
    if (selectedCategories.length === 1)
      params.set("category", selectedCategories[0]);
    router.replace(`${pathname}?${params.toString()}`);
  }, [searchQuery, selectedCategories, pathname, router]);

  useEffect(() => {
    let result = [...products];
    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(lowerQuery) ||
          product.description.toLowerCase().includes(lowerQuery)
      );
    }
    if (selectedCategories.length > 0) {
      result = result.filter((product) =>
        selectedCategories.includes(product.category)
      );
    }
    setFilteredProducts(result);
  }, [searchQuery, selectedCategories]);

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategories([]);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="page-container animate-fade-in">
      <h1 className="text-3xl font-bold mb-6">All Products</h1>

      {/* Search and Filter Controls */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center mb-8">
        <div className="relative w-full md:w-1/2">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 w-full"
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
              onClick={() => setSearchQuery("")}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Mobile Filter Button */}
        <div className="flex md:hidden w-full gap-2">
          <Sheet
            open={isMobileFiltersOpen}
            onOpenChange={setIsMobileFiltersOpen}
          >
            <SheetTrigger asChild>
              <Button variant="outline" className="w-full flex gap-2">
                <SlidersHorizontal className="h-4 w-4" />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
              </SheetHeader>
              <div className="mt-6 space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Categories</h3>
                  <div className="space-y-3">
                    {categories.map((category) => (
                      <div key={category} className="flex items-center gap-2">
                        <Checkbox
                          id={`mobile-${category}`}
                          checked={selectedCategories.includes(category)}
                          onCheckedChange={() => handleCategoryToggle(category)}
                        />
                        <Label
                          htmlFor={`mobile-${category}`}
                          className="capitalize cursor-pointer"
                        >
                          {category}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
                <Button
                  variant="outline"
                  onClick={() => {
                    clearFilters();
                    setIsMobileFiltersOpen(false);
                  }}
                  className="w-full mt-4"
                >
                  Clear Filters
                </Button>
              </div>
            </SheetContent>
          </Sheet>

          {(searchQuery || selectedCategories.length > 0) && (
            <Button
              variant="ghost"
              className="whitespace-nowrap"
              onClick={clearFilters}
            >
              Clear
            </Button>
          )}
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Desktop Sidebar */}
        <div className="hidden md:block w-1/4 min-w-[200px]">
          <div className="sticky top-24 space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Categories</h3>
              <div className="space-y-3">
                {categories.map((category) => (
                  <div key={category} className="flex items-center gap-2">
                    <Checkbox
                      id={category}
                      checked={selectedCategories.includes(category)}
                      onCheckedChange={() => handleCategoryToggle(category)}
                    />
                    <Label
                      htmlFor={category}
                      className="capitalize cursor-pointer"
                    >
                      {category}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {(searchQuery || selectedCategories.length > 0) && (
              <Button
                variant="outline"
                onClick={clearFilters}
                className="w-full"
              >
                Clear Filters
              </Button>
            )}
          </div>
        </div>

        {/* Products */}
        <div className="flex-1">
          <div className="mb-6">
            <p className="text-muted-foreground">
              {filteredProducts.length}{" "}
              {filteredProducts.length === 1 ? "product" : "products"} found
            </p>
          </div>
          <ProductGrid products={filteredProducts} />
        </div>
      </div>
    </div>
  );
};

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductsPage />
    </Suspense>
  );
}
