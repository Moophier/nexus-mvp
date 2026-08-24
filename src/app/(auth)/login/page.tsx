import React from 'react';
import Link from 'next/link';

export default async function LoginPage() {
  return (
    <div className="container mx-auto px-4 py-24 max-w-md">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-2">欢迎回归 Nexus</h1>
        <p className="text-gray-500">使用手机号或邮箱快速登录</p>
      </div>
      
      <div className="space-y-8">
        <form className="space-y-4" action="/server/actions/auth/requestPhoneCodeAction">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">手机号</label>
            <input 
              name="phone"
              type="tel" 
              placeholder="138..." 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 outline-none" 
            />
          </div>
          <button className="w-full py-3 bg-black text-white rounded-lg font-bold hover:bg-gray-800 transition-colors">
            发送验证码
          </button>
        </form>

        <div className="relative flex items-center py-4">
          <div className="flex-grow border-t border-gray-200"></div>
          <span className="flex-shrink mx-4 text-gray-400 text-xs uppercase tracking-widest">或者</span>
          <div className="flex-grow border-t border-gray-200"></div>
        </div>

        <form className="space-y-4" action="/server/actions/auth/requestEmailLinkAction">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">电子邮箱</label>
            <input 
              name="email"
              type="email" 
              placeholder="name@example.com" 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 outline-none" 
            />
          </div>
          <button className="w-full py-3 bg-gray-100 text-gray-900 rounded-lg font-bold hover:bg-gray-200 transition-colors">
            发送登录链接
          </button>
        </form>
      </div>
    </div>
  );
}
