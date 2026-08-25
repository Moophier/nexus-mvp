import Link from 'next/link';
import { Card } from '../../../components/ui/card';
import { Input } from '../../../components/ui/input';
import { Button } from '../../../components/ui/button';
import { Reveal } from '../../../components/reveal';

export default function VerifyPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <Reveal className="w-full max-w-md">
        <Card>
          <h1 className="font-display text-2xl font-bold text-ink">注册 / 验证</h1>
          <p className="mt-2 text-sm text-ink-muted">输入验证码完成身份校验。</p>
          <form className="mt-6 space-y-4">
            <Input placeholder="手机号 / 邮箱" aria-label="账号" />
            <Input placeholder="验证码" aria-label="验证码" />
            <Button type="submit" className="w-full">验证并继续</Button>
          </form>
          <p className="mt-4 text-center text-sm text-ink-faint">
            已有账号？<Link href="/login" className="text-gold hover:underline">登录</Link>
          </p>
        </Card>
      </Reveal>
    </main>
  );
}
