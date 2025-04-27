const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  // Create users
  const user1 = await prisma.user.create({
    data: {
      email: 'user1@example.com',
      username: 'user1',
      password: 'password123', // In production, this should be hashed
    },
  })

  // Create products
  const products = await Promise.all([
    prisma.product.create({
      data: {
        title: 'Laptop Pro X1',
        price: 1299.99,
        description: 'High-performance laptop with latest specs',
        category: 'Electronics',
        image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
        ratings: {
          create: [
            { rate: 4.5 },
            { rate: 5.0 },
            { rate: 4.8 },
          ],
        },
      },
    }),
    prisma.product.create({
      data: {
        title: 'Smartphone Y2',
        price: 699.99,
        description: 'Latest smartphone with amazing camera',
        category: 'Electronics',
        image: 'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg',
        ratings: {
          create: [
            { rate: 4.2 },
            { rate: 4.5 },
          ],
        },
      },
    }),
    prisma.product.create({
      data: {
        title: 'Designer Watch Z3',
        price: 299.99,
        description: 'Elegant watch with smart features',
        category: 'Accessories',
        image: 'https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg',
        ratings: {
          create: [
            { rate: 4.8 },
            { rate: 4.9 },
            { rate: 5.0 },
          ],
        },
      },
    }),
  ])

  // Create orders
  await prisma.order.create({
    data: {
      userId: user1.id,
      total: 1999.97,
      status: 'DELIVERED',
      items: {
        create: [
          {
            productId: products[0].id,
            quantity: 1,
            price: products[0].price,
          },
          {
            productId: products[1].id,
            quantity: 1,
            price: products[1].price,
          },
        ],
      },
    },
  })

  await prisma.order.create({
    data: {
      userId: user1.id,
      total: 299.99,
      status: 'PENDING',
      items: {
        create: [
          {
            productId: products[2].id,
            quantity: 1,
            price: products[2].price,
          },
        ],
      },
    },
  })

  console.log('Seed data created successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
