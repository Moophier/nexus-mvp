import React from 'react';

export default async function ReviewPage({ params }: { params: { purchaseId: string } }) {
  const { purchaseId } = params;
  
  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
        <Link href="/modules" className="text-sm text-gray-500 hover:underline mb-6 block">← 返回</Link>
        
        <h1 className="text-2xl font-bold mb-6 text-center">撰写评价</h1>
        
        <form action="/server/actions/review/submitReviewAction" className="space-y-6">
          <input type="hidden" name="purchaseId" value={purchaseId} />
          <input type="hidden" name="userId" value="current-user-id" />
          
          <div>
            <label className="block text-sm font-medium mb-2">评分</label>
            <div className="flex gap-2">
              {[1,2,3,4,5].map(star => (
                <button 
                  key={star}
                  type="button"
                  name="rating"
                  value={star.toString()}
                  className="w-12 h-12 border-2 border-gray-300 rounded-lg font-bold text-lg hover:border-gold-500 hover:bg-gold-50"
                >
                  {star}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">评价内容 (20-500字)</label>
            <textarea 
              name="body"
              rows={6}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 outline-none resize-none"
              placeholder="分享你的核心收获... 你的评价将自动提取关键句生成知识碎片"
            />
          </div>

          <button 
            type="submit"
            className="w-full py-3 bg-black text-white rounded-lg font-bold hover:bg-gray-800 transition-colors"
          >
            提交评价
          </button>
        </form>
      </div>
    </div>
  );
}