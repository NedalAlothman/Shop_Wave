'use client';

import { useState } from 'react';
import { addProduct } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

interface AddProductFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export default function AddProductForm({ onSuccess, onCancel }: AddProductFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    image: '',
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Transform form data to match API expectations
      const productData = {
        title: formData.name,
        price: Number(formData.price),
        description: formData.description,
        category: formData.category,
        image: formData.image,
      };

      await addProduct(productData);

      toast({
        title: 'تم الإضافة',
        description: 'تم إضافة المنتج بنجاح',
      });
      onSuccess();
    } catch (error) {
      console.error('Error adding product:', error);
      toast({
        title: 'خطأ',
        description: 'فشل في إضافة المنتج. تأكد من ملء جميع الحقول بشكل صحيح.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-card p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">إضافة منتج جديد</h2>
      
      <div className="space-y-2">
        <label htmlFor="name">اسم المنتج</label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="price">السعر</label>
        <Input
          id="price"
          name="price"
          type="number"
          step="0.01"
          value={formData.price}
          onChange={handleChange}
          required
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="category">الفئة</label>
        <Input
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="description">الوصف</label>
        <Input
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="image">رابط الصورة</label>
        <Input
          id="image"
          name="image"
          type="url"
          value={formData.image}
          onChange={handleChange}
          required
        />
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          إلغاء
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? 'جاري الإضافة...' : 'إضافة المنتج'}
        </Button>
      </div>
    </form>
  );
}
