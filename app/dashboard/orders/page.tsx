'use client';

import { useEffect, useState } from 'react';
import { Sidebar } from '../components/sidebar';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from '@/hooks/use-toast';
import { getOrders, updateOrderStatus, Order } from '@/lib/api';

export default function OrdersPage() {
  const { toast } = useToast();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const loadOrders = async () => {
    try {
      const data = await getOrders();
      setOrders(data);
    } catch (error) {
      toast({
        title: 'خطأ',
        description: 'فشل في تحميل الطلبات',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadgeClass = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'قيد الانتظار';
      case 'processing':
        return 'قيد المعالجة';
      case 'completed':
        return 'مكتمل';
      case 'cancelled':
        return 'ملغي';
      default:
        return status;
    }
  };

  const handleStatusChange = async (id: number, newStatus: Order['status']) => {
    try {
      await updateOrderStatus(id, newStatus);
      setOrders(prev => prev.map(order =>
        order.id === id ? { ...order, status: newStatus } : order
      ));
      toast({
        title: 'تم التحديث',
        description: 'تم تحديث حالة الطلب بنجاح',
      });
    } catch (error) {
      toast({
        title: 'خطأ',
        description: 'فشل في تحديث حالة الطلب',
        variant: 'destructive',
      });
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const orderStats = {
    pending: orders.filter(o => o.status === 'pending').length,
    processing: orders.filter(o => o.status === 'processing').length,
    completed: orders.filter(o => o.status === 'completed').length,
    cancelled: orders.filter(o => o.status === 'cancelled').length,
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="container p-6 space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">إدارة الطلبات</h1>
              <p className="text-muted-foreground">متابعة وإدارة طلبات العملاء</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-card p-4 rounded-lg border">
              <h3 className="text-sm font-medium text-muted-foreground">قيد الانتظار</h3>
              <p className="text-2xl font-bold">{orderStats.pending}</p>
            </div>
            <div className="bg-card p-4 rounded-lg border">
              <h3 className="text-sm font-medium text-muted-foreground">قيد المعالجة</h3>
              <p className="text-2xl font-bold">{orderStats.processing}</p>
            </div>
            <div className="bg-card p-4 rounded-lg border">
              <h3 className="text-sm font-medium text-muted-foreground">مكتملة</h3>
              <p className="text-2xl font-bold">{orderStats.completed}</p>
            </div>
            <div className="bg-card p-4 rounded-lg border">
              <h3 className="text-sm font-medium text-muted-foreground">ملغاة</h3>
              <p className="text-2xl font-bold">{orderStats.cancelled}</p>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>رقم الطلب</TableHead>
                  <TableHead>اسم العميل</TableHead>
                  <TableHead>التاريخ</TableHead>
                  <TableHead>الحالة</TableHead>
                  <TableHead>عدد المنتجات</TableHead>
                  <TableHead>الإجمالي</TableHead>
                  <TableHead className="text-left">إجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>#{order.id}</TableCell>
                    <TableCell className="font-medium">{order.customerName}</TableCell>
                    <TableCell>{order.date}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${getStatusBadgeClass(order.status)}`}>
                        {getStatusText(order.status)}
                      </span>
                    </TableCell>
                    <TableCell>{order.items}</TableCell>
                    <TableCell>${order.total}</TableCell>
                    <TableCell className="flex gap-2">
                      <Button variant="outline" size="sm">
                        عرض التفاصيل
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleStatusChange(order.id, 'completed')}
                      >
                        تحديث الحالة
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </main>
    </div>
  );
}
