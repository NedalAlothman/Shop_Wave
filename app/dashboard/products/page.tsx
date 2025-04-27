'use client';

import { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import { getProducts, deleteProduct, Product } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Sidebar } from '../components/sidebar';
import AddProductForm from '../add-product-form';
import { EditProductForm } from '../components/edit-product-form';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function ProductsPage() {
  const { toast } = useToast();
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);

  const loadProducts = useCallback(async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      toast({
        title: 'خطأ',
        description: 'فشل في تحميل المنتجات',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const handleDelete = async (id: number) => {
    if (!confirm('هل أنت متأكد من حذف هذا المنتج؟')) return;

    try {
      await deleteProduct(id);
      setProducts(prev => prev.filter(p => p.id !== id));
      toast({
        title: 'تم الحذف',
        description: 'تم حذف المنتج بنجاح',
      });
    } catch (error) {
      toast({
        title: 'خطأ',
        description: 'فشل في حذف المنتج',
        variant: 'destructive',
      });
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setShowEditForm(true);
  };

  const handleEditSuccess = () => {
    setShowEditForm(false);
    loadProducts();
  };

  const handleEditCancel = () => {
    setShowEditForm(false);
  };

  if (loading) {
    return <div className="text-center p-8">جاري التحميل...</div>;
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="container p-6 space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">إدارة المنتجات</h1>
              <p className="text-muted-foreground">إدارة وتنظيم منتجات المتجر</p>
            </div>
            <Button onClick={() => setShowAddForm(true)}>إضافة منتج جديد</Button>
          </div>

          {showAddForm && (
            <div className="bg-background p-6 rounded-lg border">
              <AddProductForm
                onSuccess={() => {
                  setShowAddForm(false);
                  loadProducts();
                }}
                onCancel={() => setShowAddForm(false)}
              />
            </div>
          )}

          {showEditForm && editingProduct && (
            <div className="bg-background p-6 rounded-lg border">
              <EditProductForm
                product={editingProduct}
                onSuccess={handleEditSuccess}
                onCancel={handleEditCancel}
              />
            </div>
          )}

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>صورة</TableHead>
                  <TableHead>اسم المنتج</TableHead>
                  <TableHead>السعر</TableHead>
                  <TableHead>الفئة</TableHead>
                  <TableHead>التقييم</TableHead>
                  <TableHead className="text-left">إجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <Image
                        src={product.image}
                        alt={product.title}
                        width={64}
                        height={64}
                        className="object-contain"
                      />
                    </TableCell>
                    <TableCell className="font-medium">{product.title}</TableCell>
                    <TableCell>${product.price}</TableCell>
                    <TableCell className="capitalize">{product.category}</TableCell>
                    <TableCell>⭐ {product.ratings?.[0]?.rate || 0}</TableCell>
                    <TableCell className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleEdit(product)}>
                        تعديل
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(product.id)}
                      >
                        حذف
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
