import React from 'react';
import Link from 'next/link';

export default async function PurchasePage({ params }: { params: { id: string } }) {
  const { id } = params;
  // Mock data
  const purchase = {
    id,
    module: { title: 'Next.js 14 核心指南', price: '¥29' },
    status: 'PENDING'
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-md">
      <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
        <h1 className="text-2xl font-bold mb-6 text-center">确认购买</h1>
        
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold mb-2">{purchase.module.title}</h3>
          <p className="text-2xl font-bold text-black">{purchase.module.price}</p>
        </div>

        <form action="/server/actions/purchase/confirmPurchaseAction" className="space-y-4">
          <input type="hidden" name="purchaseId" value={id} />
          <input type="hidden" name="userId" value="current-user-id" />
          
          <button 
            type="submit"
            className="w-full py-4 bg-gold-500 text-white rounded-lg font-bold text-lg hover:bg-gold-600 transition-colors"
          >
            确认支付 (Mock)
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          这是演示环境，点击即可完成支付
        </p>
      </div>
    </div>
  );
}