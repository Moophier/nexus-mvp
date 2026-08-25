import Link from 'next/link';
import { Card } from '../../../../components/ui/card';
import { Input } from '../../../../components/ui/input';
import { Button } from '../../../../components/ui/button';
import { Reveal } from '../../../../components/reveal';

export default function ReviewPage({ params }: { params: { purchaseId: string } }) {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16">
      <Link href="/dashboard" className="text-sm text-ink-faint hover:text-gold">← 返回仪表盘</Link>
      <Reveal className="mt-6">
        <Card>
          <h1 className="font-display text-3xl font-bold text-ink">写评价</h1>
          <p className="mt-2 text-sm text-ink-muted">评价将提炼为知识碎片，并为你带来返现与创作权。</p>
          <form className="mt-6 space-y-4">
            <Input placeholder="一句话感悟" aria-label="评价标题" />
            <textarea
              aria-label="评价正文"
              rows={5}
              placeholder="分享你的真实领悟…"
              className="w-full rounded-lg border border-line bg-surface-overlay px-3 py-2 text-sm text-ink placeholder:text-ink-faint gold-glow"
            />
            <Button type="submit">提交评价</Button>
          </form>
        </Card>
      </Reveal>
    </main>
  );
}
