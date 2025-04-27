'use client';

import { useEffect, useState } from 'react';
import { Sidebar } from '../components/sidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from '@/hooks/use-toast';
import { getUsers, deleteUser, User } from '@/lib/api';
import { AddUserModal } from '@/components/dashboard/AddUserModal';

export default function UsersPage() {
  const { toast } = useToast();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const loadUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (error) {
      toast({
        title: 'خطأ',
        description: 'فشل في تحميل المستخدمين',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('هل أنت متأكد من حذف هذا المستخدم؟')) return;

    try {
      await deleteUser(id);
      setUsers(prev => prev.filter(u => u.id !== id));
      toast({
        title: 'تم الحذف',
        description: 'تم حذف المستخدم بنجاح',
      });
    } catch (error) {
      toast({
        title: 'خطأ',
        description: 'فشل في حذف المستخدم',
        variant: 'destructive',
      });
    }
  };

  const handleAdd = () => {
    loadUsers();
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const filteredUsers = users.filter(user =>
    user.username.includes(searchQuery) ||
    user.email.includes(searchQuery)
  );

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="container p-6 space-y-6">
          <div className="flex items-center gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold">إدارة المستخدمين</h1>
              <p className="text-muted-foreground">إدارة حسابات المستخدمين والصلاحيات</p>
            </div>
            <div className="flex-1">
              <Input
                placeholder="بحث عن مستخدم..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <AddUserModal onAdd={handleAdd} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-card p-4 rounded-lg border">
              <h3 className="text-sm font-medium text-muted-foreground">المستخدمين</h3>
              <p className="text-2xl font-bold">{users.length}</p>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>اسم المستخدم</TableHead>
                  <TableHead>البريد الإلكتروني</TableHead>
                  <TableHead>تاريخ الانضمام</TableHead>
                  <TableHead className="text-left">إجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.username}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.createdAt}</TableCell>
                    <TableCell className="flex gap-2">
                      <Button variant="outline" size="sm">
                        تعديل
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => handleDelete(user.id)}>
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
