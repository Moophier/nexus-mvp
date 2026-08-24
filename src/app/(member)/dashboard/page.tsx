import React from 'react';
import Link from 'next/link';

export default async function DashboardPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">我的仪表盘</h1>
        <p className="text-gray-500">管理你的知识资产与购买记录</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="p-6 bg-gold-50 border border-gold-200 rounded-xl">
          <p className="text-sm text-gray-500">资产余额</p>
          <p className="text-3xl font-extrabold text-gold-700">¥50.00</p>
        </div>
        <div className="p-6 bg-blue-50 border border-blue-200 rounded-xl">
          <p className="text-sm text-gray-500">已购模块</p>
          <p className="text-3xl font-extrabold text-blue-700">2</p>
        </div>
        <div className="p-6 bg-green-50 border border-green-200 rounded-xl">
          <p className="text-sm text-gray-500">已写评价</p>
          <p className="text-3xl font-extrabold text-green-700">2</p>
        </div>
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-bold mb-4">最近购买</h2>
        <div className="space-y-4">
          {[
            { title: 'Next.js 14 核心指南', date: '2024-01-15', status: '已完成', slug: 'nextjs-14-guide' },
            { title: 'Prisma + Neon Serverless 实践', date: '2024-01-10', status: '已评价', slug: 'prisma-neon-mastery' },
          ].map(item => (
            <div key={item.title} className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg">
              <div>
                <Link href={`/modules/${item.slug}`} className="font-medium hover:text-blue-600">{item.title}</Link>
                <p className="text-sm text-gray-500">{item.date} · {item.status}</p>
              </div>
              {item.status === '已完成' && (
                <Link href={`/review/some-purchase-id`} className="px-3 py-1 bg-gold-100 text-gold-700 text-sm rounded font-medium">
                  去评价
                </Link>
              )}
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-4">我的评价碎片</h2>
        <div className="space-y-4">
          {[
            { quote: '特别是关于 Serverless 的部分，让我领悟到了很多关键点', module: 'Next.js 14 核心指南' },
            { quote: '原来数据库分支功能可以这么用，极大地提升了开发效率', module: 'Prisma + Neon Serverless 实践' },
          ].map((f, i) => (
            <div key={i} className="p-4 bg-gray-50 border-l-4 border-gold-500 rounded-r-lg">
              <p className="italic text-gray-700 mb-2">"{f.quote}"</p>
              <p className="text-sm text-gray-500">来自 《{f.module}》</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}