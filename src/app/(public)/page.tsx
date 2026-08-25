import Link from 'next/link';
import { Card } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Reveal } from '../../components/reveal';

export default function HomePage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-16">
      <header className="mb-14 text-center">
        <p className="mb-3 text-xs uppercase tracking-[0.3em] text-gold">Nexus · 知识资产循环</p>
        <h1 className="font-display text-4xl font-bold tracking-tight text-ink sm:text-6xl">
          知识库架构 <span className="text-gold">Knowledge Base</span>
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-ink-muted">
          探索由评价驱动的知识资产循环。购买模块，留下真诚评价，将你的领悟转化为可传播的知识碎片。
        </p>
      </header>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <Reveal>
          <Card className="card-lift h-full">
            <h2 className="mb-4 text-2xl font-bold text-ink">最新模块</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between rounded-lg bg-surface-overlay p-4">
                <span className="text-ink">Next.js 14 核心指南</span>
                <Link href="/modules/nextjs-14-guide" className="font-medium text-gold hover:underline">
                  查看 →
                </Link>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-surface-overlay p-4">
                <span className="text-ink">Prisma + Neon Serverless 实践</span>
                <Link href="/modules/prisma-neon-mastery" className="font-medium text-gold hover:underline">
                  查看 →
                </Link>
              </div>
            </div>
            <Link href="/modules" className="mt-6 block text-center text-sm text-ink-faint hover:text-gold">
              浏览所有模块
            </Link>
          </Card>
        </Reveal>

        <Reveal>
          <Card className="card-lift h-full">
            <h2 className="mb-4 text-2xl font-bold text-ink">精选碎片</h2>
            <div className="space-y-3">
              <div className="rounded-r-lg border-l-4 border-gold bg-surface-overlay p-4">
                <p className="italic text-ink">“特别是关于 Serverless 的部分，让我领悟到了很多关键点…”</p>
                <p className="mt-2 text-xs text-ink-faint">来自 《Next.js 14 核心指南》</p>
              </div>
              <div className="rounded-r-lg border-l-4 border-gold bg-surface-overlay p-4">
                <p className="italic text-ink">“原来数据库分支功能可以这么用，极大地提升了开发效率。”</p>
                <p className="mt-2 text-xs text-ink-faint">来自 《Prisma + Neon Serverless 实践》</p>
              </div>
            </div>
            <Link href="/fragments" className="mt-6 block text-center text-sm text-ink-faint hover:text-gold">
              进入碎片流
            </Link>
          </Card>
        </Reveal>
      </div>

      <div className="mt-12 flex justify-center">
        <Badge>知识资产四步循环 · 搬运 → 上架 → 评价 → 传播</Badge>
      </div>
    </main>
  );
}
