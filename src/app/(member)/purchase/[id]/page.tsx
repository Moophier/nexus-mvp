import Link from 'next/link';
import { Card } from '../../../../components/ui/card';
import { Badge } from '../../../../components/ui/badge';
import { Button } from '../../../../components/ui/button';
import { Reveal } from '../../../../components/reveal';

export default function PurchasePage({ params }: { params: { id: string } }) {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16">
      <Link href="/dashboard" className="text-sm text-ink-faint hover:text-gold">← 返回仪表盘</Link>
      <Reveal className="mt-6">
        <Card>
          <Badge>订单</Badge>
          <h1 className="mt-4 font-display text-3xl font-bold text-ink">购买详情</h1>
          <p className="mt-3 text-ink-muted">订单标识：<span className="text-gold">{params.id}</span></p>
          <p className="mt-4 text-ink-muted">确认购买后，模块将解锁并计入你的知识资产。</p>
          <div className="mt-8 flex gap-3">
            <Button>确认购买 · ¥29.00</Button>
            <Button variant="ghost">取消</Button>
          </div>
        </Card>
      </Reveal>
    </main>
  );
}
