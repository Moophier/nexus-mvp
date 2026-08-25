import Link from 'next/link';
import { Card } from '../../../../components/ui/card';
import { Badge } from '../../../../components/ui/badge';
import { Button } from '../../../../components/ui/button';
import { Reveal } from '../../../../components/reveal';

export default function ModuleDetailPage({ params }: { params: { slug: string } }) {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16">
      <Link href="/modules" className="text-sm text-ink-faint hover:text-gold">← 返回模块列表</Link>
      <Reveal className="mt-6">
        <Card>
          <Badge>已上架</Badge>
          <h1 className="mt-4 font-display text-3xl font-bold text-ink">模块详情</h1>
          <p className="mt-3 text-ink-muted">模块标识：<span className="text-gold">{params.slug}</span></p>
          <p className="mt-4 text-ink-muted">
            这是模块的详细描述区域。购买后可解锁完整内容与评价营销素材。
          </p>
          <div className="mt-8">
            <Button>购买模块 · ¥29.00</Button>
          </div>
        </Card>
      </Reveal>
    </main>
  );
}
