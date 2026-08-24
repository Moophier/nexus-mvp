import React from 'react';

export default async function FragmentsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">知识碎片流</h1>
      <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
        {/* Mock Masonry-style fragments */}
        {[1,2,3,4,5,6].map(i => (
          <div key={i} className="break-inside-avoid p-6 bg-white border border-gray-200 rounded-2xl shadow-sm hover:border-gold-400 transition-colors cursor-pointer">
            <p className="text-lg italic text-gray-800 mb-4">
              "这部分关于 {i % 2 === 0 ? '数据库' : '前端'} 的见解彻底改变了我之前的认知，原来核心点在于..."
            </p>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-400">来自 《模块 {i}》</span>
              <span className="text-xs font-bold text-gold-600">阅读全文 →</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
