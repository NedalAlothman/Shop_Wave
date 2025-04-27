import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        username: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json(users);
  } catch (error) {
    console.error('خطأ في تحميل المستخدمين:', error);
    return NextResponse.json(
      { error: 'فشل في تحميل المستخدمين' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { email, username, password } = await request.json();

    const user = await prisma.user.create({
      data: {
        email,
        username,
        password,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error('خطأ في إنشاء المستخدم:', error);
    return NextResponse.json(
      { error: 'فشل في إنشاء المستخدم' },
      { status: 500 }
    );
  }
}
