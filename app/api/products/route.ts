import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      include: {
        ratings: true,
      },
    })
    return NextResponse.json(products)
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    
    // Transform the data to match the Prisma schema
    const product = await prisma.product.create({
      data: {
        title: data.title,
        price: Number(data.price),
        description: data.description,
        category: data.category,
        image: data.image,
        ratings: {
          create: {
            rate: data.rating?.rate || 0
          }
        }
      },
    })
    return NextResponse.json(product)
  } catch (error) {
    console.error('Error creating product:', error)
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
