import React from 'react';
import Link from 'next/link';

export default async function ModuleDetail({ params }: { params: { slug: string } }) {
  const { slug } = params;
  // Mock data
  const module = {
    title: slug === 'nextjs-14-guide' ? 'Next.js 14 核心指南' : '知识模块',
    summary: '这是一个关于 ' + slug + ' 的深度指南，涵盖了从基础到高级的所有实战技巧。',
    price: '¥29',
    author: 'Provider Alpha',
    reviews: [
      { user: 'User A', rating: 5, body: '非常值得推荐！尤其是 Serverless 部分。', fragments: ['非常值得推荐', 'Serverless 部分'] },
      { user: 'User B', rating: 4, body: '干货很多，但部分章节稍微有点深。', fragments: ['干货很多'] },
    ]
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <Link href="/modules" className="text-sm text-gray-500 hover:underline mb-8 block">← 返回列表</Link>
      
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">{module.title}</h1>
        <div className="flex items-center gap-4 mb-6 text-sm text-gray-500">
          <span>作者: {module.author}</span>
          <span>•</span>
          <span>价格: {module.price}</span>
        </div>
        <p className="text-lg text-gray-600 mb-8">{module.summary}</p>
        <Link href={`/purchase/${slug}`} className="inline-block px-8 py-3 bg-black text-white rounded-full font-bold hover:bg-gray-800 transition-colors">
          立即购买
        </Link>
      </div>

      <section>
        <h2 className="text-2xl font-bold mb-6">购买者评价</h2>
        <div className="space-y-6">
          {module.reviews.map((r, i) => (
            <div key={i} className="p-6 bg-gray-50 rounded-xl border border-gray-100">
              <div className="flex justify-between mb-2">
                <span className="font-medium">{r.user}</span>
                <span className="text-gold-600">{'⭐'.repeat(r.rating)}</span>
              </div>
              <p className="text-gray-700">{r.body}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
