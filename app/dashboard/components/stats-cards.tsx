'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Users, Package, ShoppingCart } from "lucide-react";
import { useEffect, useState } from 'react';
import { DashboardStats, getDashboardStats } from '@/lib/api';



export function StatsCards() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const dashboardStats = await getDashboardStats();
        setStats(dashboardStats);
      } catch (error) {
        console.error('Error loading stats:', error);
      } finally {
        setLoading(false);
      }
    }

    loadStats();
  }, []);

  const getGrowthColor = (growth: number) => {
    if (growth > 0) return 'text-green-600';
    if (growth < 0) return 'text-red-600';
    return 'text-yellow-600';
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 w-4 bg-gray-200 rounded animate-pulse"></div>
            </CardHeader>
            <CardContent>
              <div className="h-8 w-32 bg-gray-200 rounded animate-pulse mb-2"></div>
              <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="hover:shadow-lg transition-shadow duration-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">إجمالي المبيعات</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(stats.totalSales)}</div>
          <div className="flex items-center gap-1 mt-2">
            <span className={`text-sm ${getGrowthColor(stats.salesGrowth)}`}>
              {stats.salesGrowth > 0 ? '↑' : stats.salesGrowth < 0 ? '↓' : '→'} {Math.abs(stats.salesGrowth).toFixed(1)}%
            </span>
            <span className="text-xs text-muted-foreground">عن الشهر الماضي</span>
          </div>
        </CardContent>
      </Card>

      <Card className="hover:shadow-lg transition-shadow duration-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">المستخدمين النشطين</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {stats.activeUsers.toLocaleString('en-US')}
          </div>
          <div className="flex items-center gap-1 mt-2">
            <span className={`text-sm ${getGrowthColor(stats.userGrowth)}`}>
              {stats.userGrowth > 0 ? '↑' : stats.userGrowth < 0 ? '↓' : '→'} {Math.abs(stats.userGrowth).toFixed(1)}%
            </span>
            <span className="text-xs text-muted-foreground">عن الأسبوع الماضي</span>
          </div>
        </CardContent>
      </Card>

      <Card className="hover:shadow-lg transition-shadow duration-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">المنتجات</CardTitle>
          <Package className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalProducts.toLocaleString('en-US')}</div>
          <div className="flex items-center gap-1 mt-2">
            <span className="text-sm text-green-600">
              +{stats.newProducts.toLocaleString('en-US')}
            </span>
            <span className="text-xs text-muted-foreground">منتج جديد هذا الشهر</span>
          </div>
        </CardContent>
      </Card>

      <Card className="hover:shadow-lg transition-shadow duration-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">الطلبات الجديدة</CardTitle>
          <ShoppingCart className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.newOrders.toLocaleString('en-US')}</div>
          <div className="flex flex-col gap-1 mt-2">
            <div className="text-xs text-muted-foreground">طلبات بانتظار المعالجة</div>
            <div className="w-full bg-gray-100 rounded-full h-1.5">
              <div
                className="bg-primary h-1.5 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(stats.orderCompletion, 100)}%` }}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
