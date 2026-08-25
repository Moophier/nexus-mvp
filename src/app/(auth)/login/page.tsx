import Link from 'next/link';
import { Card } from '../../../components/ui/card';
import { Input } from '../../../components/ui/input';
import { Button } from '../../../components/ui/button';
import { Reveal } from '../../../components/reveal';

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <Reveal className="w-full max-w-md">
        <Card>
          <h1 className="font-display text-2xl font-bold text-ink">登录 Nexus</h1>
          <p className="mt-2 text-sm text-ink-muted">使用手机号或邮箱继续。</p>
          <form className="mt-6 space-y-4">
            <Input placeholder="手机号 / 邮箱" aria-label="账号" />
            <Input type="password" placeholder="密码" aria-label="密码" />
            <Button type="submit" className="w-full">登录</Button>
          </form>
          <p className="mt-4 text-center text-sm text-ink-faint">
            还没有账号？<Link href="/verify" className="text-gold hover:underline">注册</Link>
          </p>
        </Card>
      </Reveal>
    </main>
  );
}
