
export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  featured?: boolean;
  sold?: number;
  rating?: {
    rate: number;
    count: number;
  };
  createdAt?: string;
  updatedAt?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  totalAmount: number;
  date: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
}
