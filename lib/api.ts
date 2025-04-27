import { env } from '@/lib/env';

const BASE_URL = `${env.NEXTAUTH_URL}/api`;

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  ratings?: {
    id: number;
    rate: number;
    createdAt: string;
  }[];
  featured?: boolean;
  sold?: number;
}

export interface DashboardStats {
  totalSales: number;
  salesGrowth: number;
  activeUsers: number;
  userGrowth: number;
  totalProducts: number;
  newProducts: number;
  newOrders: number;
  orderCompletion: number;
}

export async function getDashboardStats(): Promise<DashboardStats> {
  try {
    const response = await fetch(`${BASE_URL}/dashboard/stats`);
    if (!response.ok) {
      throw new Error('Failed to fetch dashboard stats');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    throw error;
  }
}

// Products API
export async function getProducts(): Promise<Product[]> {
  try {
    const response = await fetch(`${BASE_URL}/products`);
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}

export const getProduct = async (id: number): Promise<Product> => {
  try {
    const response = await fetch(`${BASE_URL}/products/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch product');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
};

export const getCategories = async (): Promise<string[]> => {
  try {
    const response = await fetch(`${BASE_URL}/products/categories`);
    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

export const getProductsByCategory = async (category: string): Promise<Product[]> => {
  try {
    const response = await fetch(`${BASE_URL}/products/category/${category}`);
    if (!response.ok) {
      throw new Error('Failed to fetch products by category');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching products by category:', error);
    throw error;
  }
};

// Cart API
export interface CartItem {
  productId: number;
  quantity: number;
}

export const addToCart = async (userId: number, products: CartItem[]): Promise<any> => {
  try {
    const response = await fetch(`${BASE_URL}/carts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
        date: new Date(),
        products,
      }),
    });
    if (!response.ok) {
      throw new Error('Failed to add to cart');
    }
    return response.json();
  } catch (error) {
    console.error('Error adding to cart:', error);
    throw error;
  }
};

// User API
export interface User {
  id: number;
  email: string;
  username: string;
  password: string;
  createdAt: string;
  updatedAt: string;
}

export async function getUsers(): Promise<User[]> {
  try {
    const response = await fetch(`${BASE_URL}/users`);
    if (!response.ok) {
      throw new Error('فشل في تحميل المستخدمين');
    }
    return response.json();
  } catch (error) {
    console.error('خطأ في تحميل المستخدمين:', error);
    throw error;
  }
}

export async function getUser(id: number): Promise<User> {
  try {
    const response = await fetch(`${BASE_URL}/users/${id}`);
    if (!response.ok) {
      throw new Error('فشل في تحميل المستخدم');
    }
    return response.json();
  } catch (error) {
    console.error('خطأ في تحميل المستخدم:', error);
    throw error;
  }
}

export async function createUser(user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
  try {
    const response = await fetch(`${BASE_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    if (!response.ok) {
      throw new Error('فشل في إنشاء المستخدم');
    }
    return response.json();
  } catch (error) {
    console.error('خطأ في إنشاء المستخدم:', error);
    throw error;
  }
}

export async function updateUser(id: number, user: Partial<User>): Promise<User> {
  try {
    const response = await fetch(`${BASE_URL}/users/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    if (!response.ok) {
      throw new Error('فشل في تحديث المستخدم');
    }
    return response.json();
  } catch (error) {
    console.error('خطأ في تحديث المستخدم:', error);
    throw error;
  }
}

export async function deleteUser(id: number): Promise<void> {
  try {
    const response = await fetch(`${BASE_URL}/users/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('فشل في حذف المستخدم');
    }
  } catch (error) {
    console.error('خطأ في حذف المستخدم:', error);
    throw error;
  }
}

// Dashboard API functions
export const addProduct = async (product: Omit<Product, 'id'>): Promise<Product> => {
  try {
    const response = await fetch(`${BASE_URL}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });
    if (!response.ok) {
      throw new Error('Failed to add product');
    }
    return response.json();
  } catch (error) {
    console.error('Error adding product:', error);
    throw error;
  }
};

export const updateProduct = async (id: number, product: Partial<Product>): Promise<Product> => {
  try {
    const response = await fetch(`${BASE_URL}/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });
    if (!response.ok) {
      throw new Error('Failed to update product');
    }
    return response.json();
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};

export const deleteProduct = async (id: number): Promise<void> => {
  try {
    const response = await fetch(`${BASE_URL}/products/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete product');
    }
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};

// User Management API
export interface UserManagement {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  joinDate: string;
}

export async function getUsersManagement(): Promise<UserManagement[]> {
  try {
    const response = await fetch(`${BASE_URL}/users-management`);
    if (!response.ok) throw new Error('فشل في تحميل المستخدمين');
    return await response.json();
  } catch (error) {
    console.error('خطأ في تحميل المستخدمين:', error);
    throw error;
  }
}

export async function getUserManagement(id: number): Promise<UserManagement> {
  try {
    const response = await fetch(`${BASE_URL}/users-management/${id}`);
    if (!response.ok) throw new Error('فشل في تحميل المستخدم');
    return await response.json();
  } catch (error) {
    console.error('خطأ في تحميل المستخدم:', error);
    throw error;
  }
}

export async function createUserManagement(user: Omit<UserManagement, 'id'>): Promise<UserManagement> {
  try {
    const response = await fetch(`${BASE_URL}/users-management`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    if (!response.ok) throw new Error('فشل في إنشاء المستخدم');
    return await response.json();
  } catch (error) {
    console.error('خطأ في إنشاء المستخدم:', error);
    throw error;
  }
}

export async function updateUserManagement(id: number, user: Partial<UserManagement>): Promise<UserManagement> {
  try {
    const response = await fetch(`${BASE_URL}/users-management/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    if (!response.ok) throw new Error('فشل في تحديث المستخدم');
    return await response.json();
  } catch (error) {
    console.error('خطأ في تحديث المستخدم:', error);
    throw error;
  }
}

export async function deleteUserManagement(id: number): Promise<void> {
  try {
    const response = await fetch(`${BASE_URL}/users-management/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('فشل في حذف المستخدم');
  } catch (error) {
    console.error('خطأ في حذف المستخدم:', error);
    throw error;
  }
}

// Order Management API
export interface Order {
  id: number;
  customerName: string;
  date: string;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  total: number;
  items: number;
  products: {
    id: number;
    name: string;
    price: number;
    quantity: number;
  }[];
}

export async function getOrders(): Promise<Order[]> {
  try {
    const response = await fetch(`${BASE_URL}/orders`);
    if (!response.ok) throw new Error('فشل في تحميل الطلبات');
    return await response.json();
  } catch (error) {
    console.error('خطأ في تحميل الطلبات:', error);
    throw error;
  }
}

export async function getOrder(id: number): Promise<Order> {
  try {
    const response = await fetch(`${BASE_URL}/orders/${id}`);
    if (!response.ok) throw new Error('فشل في تحميل الطلب');
    return await response.json();
  } catch (error) {
    console.error('خطأ في تحميل الطلب:', error);
    throw error;
  }
}

export async function createOrder(order: Omit<Order, 'id'>): Promise<Order> {
  try {
    const response = await fetch(`${BASE_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(order),
    });
    if (!response.ok) throw new Error('فشل في إنشاء الطلب');
    return await response.json();
  } catch (error) {
    console.error('خطأ في إنشاء الطلب:', error);
    throw error;
  }
}

export async function updateOrder(id: number, order: Partial<Order>): Promise<Order> {
  try {
    const response = await fetch(`${BASE_URL}/orders/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(order),
    });
    if (!response.ok) throw new Error('فشل في تحديث الطلب');
    return await response.json();
  } catch (error) {
    console.error('خطأ في تحديث الطلب:', error);
    throw error;
  }
}

export async function updateOrderStatus(id: number, status: Order['status']): Promise<Order> {
  try {
    const response = await fetch(`${BASE_URL}/orders/${id}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    });
    if (!response.ok) throw new Error('فشل في تحديث حالة الطلب');
    return await response.json();
  } catch (error) {
    console.error('خطأ في تحديث حالة الطلب:', error);
    throw error;
  }
}

export async function deleteOrder(id: number): Promise<void> {
  try {
    const response = await fetch(`${BASE_URL}/orders/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('فشل في حذف الطلب');
  } catch (error) {
    console.error('خطأ في حذف الطلب:', error);
    throw error;
  }
}
