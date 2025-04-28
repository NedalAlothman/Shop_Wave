import { Product } from "../types/store";

export const products: Product[] = [
  {
    id: "1",
    name: "Premium Wireless Headphones",
    price: 249.99,
    description:
      "Experience crystal-clear sound with our premium wireless headphones. Featuring active noise cancellation, 30-hour battery life, and comfortable over-ear design.",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "electronics",
    featured: true,
  },
  {
    id: "2",
    name: "Smart Fitness Watch",
    price: 199.99,
    description:
      "Track your fitness goals with this state-of-the-art smartwatch. Features heart rate monitoring, GPS tracking, and water resistance up to 50m.",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "electronics",
    featured: true,
  },
  {
    id: "3",
    name: "Portable Bluetooth Speaker",
    price: 89.99,
    description:
      "This portable speaker delivers powerful sound in a compact design. With 12 hours of playtime and waterproof construction, it's perfect for any outdoor adventure.",
    image:
      "https://images.unsplash.com/photo-1564424224827-cd24b8915874?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "electronics",
  },
  {
    id: "4",
    name: "Leather Laptop Bag",
    price: 149.99,
    description:
      "Crafted from genuine leather, this laptop bag combines style and functionality. Features multiple compartments and padded protection for laptops up to 15 inches.",
    image:
      "https://images.unsplash.com/photo-1491637639811-60e2756cc1c7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "accessories",
    featured: true,
  },
  {
    id: "5",
    name: "Professional Camera Drone",
    price: 799.99,
    description:
      "Capture stunning aerial footage with this professional-grade camera drone. Features 4K video recording, 30-minute flight time, and obstacle avoidance technology.",
    image:
      "https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "electronics",
  },
  {
    id: "6",
    name: "Minimalist Wall Clock",
    price: 59.99,
    description:
      "Add a touch of elegance to your home with this minimalist wall clock. Features a silent quartz movement and sleek design that complements any decor.",
    image:
      "https://images.unsplash.com/photo-1507646227500-4d389b0012be?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "home",
  },
  {
    id: "7",
    name: "Organic Cotton T-Shirt",
    price: 29.99,
    description:
      "Stay comfortable and stylish with this organic cotton t-shirt. Made from 100% sustainably sourced materials and available in multiple colors.",
    image:
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "clothing",
  },
  {
    id: "8",
    name: "Smart Home Hub",
    price: 129.99,
    description:
      "Control your entire smart home with this intuitive hub. Compatible with most smart devices and features voice control capabilities.",
    image:
      "https://images.unsplash.com/photo-1558002038-1055907df827?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "electronics",
    featured: true,
  },
  {
    id: "9",
    name: "Stainless Steel Water Bottle",
    price: 34.99,
    description:
      "Keep your drinks hot or cold for hours with this premium stainless steel water bottle. Features vacuum insulation and a leak-proof design.",
    image:
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "accessories",
  },
  {
    id: "10",
    name: "Wireless Charging Pad",
    price: 49.99,
    description:
      "Charge your devices wirelessly with this sleek charging pad. Compatible with all Qi-enabled devices and features fast charging technology.",
    image:
      "https://images.unsplash.com/photo-1585772502579-f8c0143ee8f7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "electronics",
  },
  {
    id: "11",
    name: "Mechanical Keyboard",
    price: 129.99,
    description:
      "Enhance your typing experience with this mechanical keyboard. Features customizable RGB lighting and responsive mechanical switches.",
    image:
      "https://images.unsplash.com/photo-1595225476474-87563907a212?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "electronics",
  },
  {
    id: "12",
    name: "Premium Coffee Maker",
    price: 179.99,
    description:
      "Brew the perfect cup of coffee with this premium coffee maker. Features customizable brewing options and a built-in grinder.",
    image:
      "https://images.unsplash.com/photo-1544098485-2a2ed6da40ba?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "home",
  },
];

export const getProductById = (id: string): Product | undefined => {
  return products.find((product) => product.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter((product) => product.category === category);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter((product) => product.featured);
};

export const getAllCategories = (): string[] => {
  return Array.from(new Set(products.map((product) => product.category)));
};
