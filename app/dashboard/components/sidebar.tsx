'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from "../../../components/ui/button";
import { 
  Home,
  Package,
  Users,
  ShoppingCart,
  Settings,
  LogOut
} from 'lucide-react';

const menuItems = [
  { title: 'الرئيسية', icon: Home, path: '/dashboard' },
  { title: 'المنتجات', icon: Package, path: '/dashboard/products' },
  { title: 'المستخدمين', icon: Users, path: '/dashboard/users' },
  { title: 'الطلبات', icon: ShoppingCart, path: '/dashboard/orders' },
  { title: 'الإعدادات', icon: Settings, path: '/dashboard/settings' },
];

export function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    localStorage.removeItem('is_admin');
    router.push('/login');
  };

  return (
    <div className="min-h-screen w-64 bg-card border-l">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-primary">ShopWave</h2>
        <p className="text-sm text-muted-foreground">لوحة التحكم</p>
      </div>
      
      <nav className="space-y-1 px-3">
        {menuItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link
              key={item.path}
              href={item.path}
              className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                isActive 
                  ? 'bg-primary text-primary-foreground' 
                  : 'hover:bg-accent'
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.title}</span>
            </Link>
          );
        })}
      </nav>

      <div className="absolute bottom-4 w-64 px-3">
        <Button
          variant="destructive"
          className="w-full flex items-center justify-center gap-2"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4" />
          تسجيل الخروج
        </Button>
      </div>
    </div>
  );
}
