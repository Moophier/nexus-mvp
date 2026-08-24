import React from 'react';
import Link from 'next/link';

export default async function ModulesPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">知识模块库</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Mock Module Cards */}
        {[
          { slug: 'nextjs-14-guide', title: 'Next.js 14 核心指南', price: '¥29', rating: 4.9 },
          { slug: 'prisma-neon-mastery', title: 'Prisma + Neon Serverless 实践', price: '¥49', rating: 4.8 },
          { slug: 'auth-mastery', title: 'NextAuth 全方位实战', price: '¥39', rating: 4.7 },
        ].map(m => (
          <div key={m.slug} className="p-6 bg-white rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
            <h3 className="text-xl font-bold mb-2">{m.title}</h3>
            <div className="flex justify-between items-center mt-4">
              <span className="text-lg font-semibold">{m.price}</span>
              <span className="text-sm text-gray-500">⭐ {m.rating}</span>
            </div>
            <Link href={`/modules/${m.slug}`} className="block text-center mt-6 py-2 bg-black text-white rounded-lg font-medium">
              详情与购买
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
