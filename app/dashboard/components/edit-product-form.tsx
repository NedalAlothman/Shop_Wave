'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Product, updateProduct } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';

interface EditProductFormProps {
  product: Product;
  onSuccess: () => void;
  onCancel: () => void;
}

export function EditProductForm({ product, onSuccess, onCancel }: EditProductFormProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState<Product>(product);

  useEffect(() => {
    setFormData(product);
  }, [product]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const updatedProduct = await updateProduct(product.id, formData);
      onSuccess();
      toast({
        title: 'تم الحفظ',
        description: 'تم تحديث المنتج بنجاح',
      });
    } catch (error) {
      toast({
        title: 'خطأ',
        description: 'حدث خطأ أثناء تحديث المنتج',
        variant: 'destructive',
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' ? parseFloat(value) : value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">اسم المنتج</label>
        <Input
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">السعر</label>
        <Input
          name="price"
          type="number"
          value={formData.price}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">الوصف</label>
        <Textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">الفئة</label>
        <Input
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        />
      </div>

      <div className="flex gap-2">
        <Button type="submit">حفظ التغييرات</Button>
        <Button variant="outline" onClick={onCancel}>إلغاء</Button>
      </div>
    </form>
  );
}
