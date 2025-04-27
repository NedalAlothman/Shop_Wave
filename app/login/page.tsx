import { LoginForm } from '@/components/auth/login-form';

export default function LoginPage() {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <LoginForm />
    </div>
  );
}

export const runtime = 'edge';
export const revalidate = 0;
