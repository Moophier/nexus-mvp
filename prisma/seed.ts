import { PrismaClient } from '@prisma/client'
import { prisma } from './src/lib/db'

async function main() {
  console.log('🌱 Seeding database...')

  // 1. Create Users
  const provider = await prisma.user.create({
    data: {
      name: 'Provider Alpha',
      email: 'alpha@nexus.app',
      role: 'PROVIDER',
    },
  })

  const seeker = await prisma.user.create({
    data: {
      name: 'Seeker Beta',
      email: 'beta@nexus.app',
      role: 'SEEKER',
    },
  })

  // Create asset accounts
  await prisma.assetAccount.create({ data: { userId: provider.id, balanceCents: 10000 } })
  await prisma.assetAccount.create({ data: { userId: seeker.id, balanceCents: 5000 } })

  // 2. Create Modules
  const modules = await Promise.all([
    prisma.module.create({
      data: {
        slug: 'nextjs-14-guide',
        title: 'Next.js 14 核心指南',
        summary: '从 App Router 到 Server Actions 的全方位指南',
        content: 'Full content about Next.js 14...',
        priceCents: 2900,
        status: 'PUBLISHED',
        authorId: provider.id,
      },
    }),
    prisma.module.create({
      data: {
        slug: 'prisma-neon-mastery',
        title: 'Prisma + Neon Serverless 实践',
        summary: '构建高性能 Serverless 数据库层',
        content: 'Full content about Prisma and Neon...',
        priceCents: 4900,
        status: 'PUBLISHED',
        authorId: provider.id,
      },
    }),
  ])

  // 3. Create Purchases & Reviews
  for (const module of modules) {
    const purchase = await prisma.purchase.create({
      data: {
        userId: seeker.id,
        moduleId: module.id,
        priceCents: module.priceCents,
        status: 'PAID',
        paidAt: new Date(),
        paymentRef: 'mock_tx_' + Math.random().toString(36).substr(2, 9),
      },
    })

    const review = await prisma.review.create({
      data: {
        purchaseId: purchase.id,
        userId: seeker.id,
        moduleId: module.id,
        rating: 5,
        body: '这篇文章太棒了！特别是关于 Serverless 的部分，让我领悟到了很多关键点，非常值得推荐给所有开发者。',
        createdAt: new Date(),
      },
    })

    // 4. Create Fragments (Manually seeding some)
    await prisma.fragment.create({
      data: {
        reviewId: review.id,
        moduleId: module.id,
        quote: '特别是关于 Serverless 的部分，让我领悟到了很多关键点',
        link: `/modules/${module.slug}?via=frag_${Math.random().toString(36).substr(2, 5)}`,
        createdAt: new Date(),
      },
    })
  }

  console.log('✅ Seed completed successfully')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
