import React from 'react';
import Link from 'next/link';

export default async function HomePage() {
  // In a real app, we'd fetch this from our API/DB
  // For the skeleton, we'll use a simple client-side fetch or Server Component fetch
  return (
    <div className="container mx-auto px-4 py-12">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-6xl">
          Nexus <span className="text-gold-500">Knowledge Base</span>
        </h1>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          探索由评价驱动的知识资产循环。购买模块，留下真诚评价，将你的领悟转化为可传播的知识碎片。
        </p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold mb-4">最新模块</h2>
          <div className="space-y-4">
            {/* Mock List */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <span>Next.js 14 核心指南</span>
              <Link href="/modules/nextjs-14-guide" className="text-blue-600 font-medium">查看 →</Link>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <span>Prisma + Neon Serverless 实践</span>
              <Link href="/modules/prisma-neon-mastery" className="text-blue-600 font-medium">查看 →</Link>
            </div>
          </div>
          <Link href="/modules" className="block text-center mt-6 text-sm text-gray-500 hover:underline">
            浏览所有模块
          </Link>
        </div>

        <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold mb-4">精选碎片</h2>
          <div className="space-y-4">
            {/* Mock Fragments */}
            <div className="p-4 bg-gold-50 border-l-4 border-gold-500 italic text-gray-700">
              "特别是关于 Serverless 的部分，让我领悟到了很多关键点..."
              <div className="mt-2 text-xs text-gray-500 not-italic">来自 《Next.js 14 核心指南》</div>
            </div>
            <div className="p-4 bg-gold-50 border-l-4 border-gold-500 italic text-gray-700">
              "原来数据库分支功能可以这么用，极大地提升了开发效率。"
              <div className="mt-2 text-xs text-gray-500 not-italic">来自 《Prisma + Neon Serverless 实践》</div>
            </div>
          </div>
          <Link href="/fragments" className="block text-center mt-6 text-sm text-gray-500 hover:underline">
            进入碎片流
          </Link>
        </div>
      </section>
    </div>
  );
}
