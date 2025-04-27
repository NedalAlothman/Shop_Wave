'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Product, getProducts } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Sidebar } from './components/sidebar';
import { StatsCards } from './components/stats-cards';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const generateSalesData = (products: Product[]) => {
  const months = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو'];
  return months.map(month => ({
    month,
    sales: products.reduce((sum, product) => sum + (product.sold || 0), 0)
  }));
};

const getTopProducts = (products: Product[]) => {
  return products
    .map(product => ({
      name: product.name,
      sales: product.sold || 0,
      revenue: product.price * (product.sold || 0)
    }))
    .sort((a, b) => b.sales - a.sales)
    .slice(0, 4);
};

export default function DashboardPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const loadProducts = useCallback(async () => {
    try {
      const data = await getProducts();
      setProducts(data);
      setLoading(false);
    } catch (error) {
      toast({
        title: 'خطأ',
        description: 'حدث خطأ أثناء تحميل المنتجات',
        variant: 'destructive',
      });
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    const isAdmin = localStorage.getItem('is_admin');
    if (!isAdmin) {
      router.push('/login');
      return;
    }
    loadProducts();
  }, [router, loadProducts]);

  if (loading) return <div className="text-center p-8">جاري التحميل...</div>;

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="container p-6 space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">لوحة التحكم</h1>
              <p className="text-muted-foreground">مرحباً بك في لوحة تحكم ShopWave</p>
            </div>
          </div>

          <StatsCards />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* نظرة عامة على المبيعات */}
            <Card>
              <CardHeader>
                <CardTitle>نظرة عامة على المبيعات</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={generateSalesData(products)}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="sales"
                        stroke="#8884d8"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* المنتجات الأكثر مبيعاً */}
            <Card>
              <CardHeader>
                <CardTitle>المنتجات الأكثر مبيعاً</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {getTopProducts(products).map((product) => (
                    <div
                      key={product.name}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {product.sales} مبيعات
                        </p>
                      </div>
                      <p className="font-bold">${product.revenue.toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* إحصائيات المنتجات */}
          <Card>
            <CardHeader>
              <CardTitle>إحصائيات المنتجات</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg">
                  <p className="text-lg font-bold">
                    {products.length}
                  </p>
                  <p className="text-sm text-muted-foreground">إجمالي المنتجات</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <p className="text-lg font-bold">
                    ${products.reduce((sum, product) => sum + (product.price * (product.sold || 0)), 0).toFixed(2)}
                  </p>
                  <p className="text-sm text-muted-foreground">إجمالي المبيعات</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <p className="text-lg font-bold">
                    {products.reduce((sum, product) => sum + (product.rating?.count || 0), 0)}
                  </p>
                  <p className="text-sm text-muted-foreground">إجمالي التقييمات</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* تصنيفات المنتجات */}
          <Card>
            <CardHeader>
              <CardTitle>تصنيفات المنتجات</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Array.from(new Set(products.map(p => p.category))).map((category) => {
                  const count = products.filter(p => p.category === category).length;
                  return (
                    <div key={category} className="p-4 border rounded-lg">
                      <p className="text-lg font-bold capitalize">{category}</p>
                      <p className="text-sm text-muted-foreground">{count} منتج</p>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
