require('dotenv').config();
const axios = require('axios');

const NEXTAUTH_URL = process.env.NEXTAUTH_URL || 'http://localhost:3000';
const BASE_URL = `${NEXTAUTH_URL}/api`;

const products = [
  {
    title: "Premium Wireless Headphones",
    price: 249.99,
    description: "Experience crystal-clear sound with our premium wireless headphones. Featuring active noise cancellation, 30-hour battery life, and comfortable over-ear design.",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    featured: true,
    rating: {
      rate: 0
    }
  },
  {
    title: "Smart Fitness Watch",
    price: 199.99,
    description: "Track your fitness goals with this state-of-the-art smartwatch. Features heart rate monitoring, GPS tracking, and water resistance up to 50m.",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1523275335684-9a35b7d455d9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    featured: true,
    rating: {
      rate: 0
    }
  },
  {
    title: "Portable Bluetooth Speaker",
    price: 89.99,
    description: "This portable speaker delivers powerful sound in a compact design. With 12 hours of playtime and waterproof construction, it's perfect for any outdoor adventure.",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1564424224827-cd24b8915874?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    rating: {
      rate: 0
    }
  },
  {
    title: "Leather Laptop Bag",
    price: 149.99,
    description: "Crafted from genuine leather, this laptop bag combines style and functionality. Features multiple compartments and padded protection for laptops up to 15 inches.",
    category: "accessories",
    image: "https://images.unsplash.com/photo-1491637639811-60e2756cc1c7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    featured: true,
    rating: {
      rate: 0
    }
  },
  {
    title: "Professional Camera Drone",
    price: 799.99,
    description: "Capture stunning aerial footage with this professional-grade camera drone. Features 4K video recording, 30-minute flight time, and obstacle avoidance technology.",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    rating: {
      rate: 0
    }
  },
  {
    title: "Minimalist Wall Clock",
    price: 59.99,
    description: "Add a touch of elegance to your home with this minimalist wall clock. Features a silent quartz movement and sleek design that complements any decor.",
    category: "home",
    image: "https://images.unsplash.com/photo-1507646227500-4d389b0012be?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    rating: {
      rate: 0
    }
  },
  {
    title: "Organic Cotton T-Shirt",
    price: 29.99,
    description: "Stay comfortable and stylish with this organic cotton t-shirt. Made from 100% sustainably sourced materials and available in multiple colors.",
    category: "clothing",
    image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    rating: {
      rate: 0
    }
  },
  {
    title: "Smart Home Hub",
    price: 129.99,
    description: "Control your entire smart home with this intuitive hub. Compatible with most smart devices and features voice control capabilities.",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    featured: true,
    rating: {
      rate: 0
    }
  },
  {
    title: "Stainless Steel Water Bottle",
    price: 34.99,
    description: "Keep your drinks hot or cold for hours with this premium stainless steel water bottle. Features vacuum insulation and a leak-proof design.",
    category: "accessories",
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    rating: {
      rate: 0
    }
  },
  {
    title: "Wireless Charging Pad",
    price: 49.99,
    description: "Charge your devices wirelessly with this high-quality charging pad. Compatible with most wireless charging devices and features fast charging technology.",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    rating: {
      rate: 0
    }
  }
];

async function addProductsToDashboard() {
  try {
    console.log('Starting to add products to dashboard...');
    
    for (const product of products) {
      try {
        const response = await axios.post(`${BASE_URL}/products`, product);
        console.log(`Successfully added product: ${product.title} with ID: ${response.data.id}`);
      } catch (error) {
        console.error(`Failed to add product ${product.title}:`, error.response?.data || error);
      }
    }

    console.log('Finished adding products to dashboard');
  } catch (error) {
    console.error('Error in addProductsToDashboard:', error);
  }
}

// Run the script
addProductsToDashboard();
