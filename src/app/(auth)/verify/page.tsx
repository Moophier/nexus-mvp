import React from 'react';

export default async function VerifyPage() {
  return (
    <div className="container mx-auto px-4 py-24 max-w-md">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-2">身份验证</h1>
        <p className="text-gray-500">请输入您收到的 6 位验证码</p>
      </div>
      
      <form className="space-y-6" action="/api/auth/callback">
        <div className="flex justify-center gap-3">
          {[1,2,3,4,5,6].map(i => (
            <input 
              key={i}
              type="text" 
              maxLength={1}
              className="w-12 h-12 text-center text-xl font-bold border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 outline-none" 
            />
          ))}
        </div>
        <button className="w-full py-3 bg-black text-white rounded-lg font-bold hover:bg-gray-800 transition-colors">
          立即验证
        </button>
        <div className="text-center">
          <button type="button" className="text-sm text-blue-600 hover:underline">
            未收到验证码？重新发送
          </button>
        </div>
      </form>
    </div>
  );
}
