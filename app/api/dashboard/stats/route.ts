import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    // Get current date and 30 days ago
    const now = new Date()
    const thirtyDaysAgo = new Date(now)
    thirtyDaysAgo.setDate(now.getDate() - 30)
    
    // Get all products with their ratings
    const products = await prisma.product.findMany({
      include: {
        ratings: true,
      },
    })

    // Get orders from last 30 days
    const recentOrders = await prisma.order.findMany({
      where: {
        createdAt: {
          gte: thirtyDaysAgo,
        },
      },
      include: {
        items: true,
      },
    })

    // Get orders from previous 30 days for comparison
    const previousOrders = await prisma.order.findMany({
      where: {
        createdAt: {
          gte: new Date(thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)),
          lt: thirtyDaysAgo,
        },
      },
      include: {
        items: true,
      },
    })

    // Calculate total sales
    const totalSales = recentOrders.reduce((sum: number, order: { total: number }) => sum + order.total, 0)
    const previousSales = previousOrders.reduce((sum: number, order: { total: number }) => sum + order.total, 0)
    const salesGrowth = previousSales > 0 
      ? ((totalSales - previousSales) / previousSales) * 100 
      : 0

    // Get active users (users who placed orders in last 30 days)
    const activeUsers = await prisma.user.count({
      where: {
        orders: {
          some: {
            createdAt: {
              gte: thirtyDaysAgo,
            },
          },
        },
      },
    })

    // Get previous period active users
    const previousActiveUsers = await prisma.user.count({
      where: {
        orders: {
          some: {
            createdAt: {
              gte: new Date(thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)),
              lt: thirtyDaysAgo,
            },
          },
        },
      },
    })

    const userGrowth = previousActiveUsers > 0 
      ? ((activeUsers - previousActiveUsers) / previousActiveUsers) * 100 
      : 0

    // Get new products added in last 30 days
    const newProducts = await prisma.product.count({
      where: {
        createdAt: {
          gte: thirtyDaysAgo,
        },
      },
    })

    // Get pending orders
    const pendingOrders = await prisma.order.count({
      where: {
        status: 'PENDING',
      },
    })

    // Calculate order completion rate
    const totalOrders = await prisma.order.count()
    const completedOrders = await prisma.order.count({
      where: {
        status: 'DELIVERED',
      },
    })
    const orderCompletion = totalOrders > 0 
      ? (completedOrders / totalOrders) * 100 
      : 0

    return NextResponse.json({
      totalSales,
      salesGrowth,
      activeUsers,
      userGrowth,
      totalProducts: products.length,
      newProducts,
      newOrders: pendingOrders,
      orderCompletion,
    })
  } catch (error) {
    console.error('Error fetching dashboard stats:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
