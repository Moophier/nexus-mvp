import Link from 'next/link';
import { Card } from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';
import { Reveal } from '../../../components/reveal';

const stats = [
  { label: '资产余额', value: '¥50.00', accent: 'text-gold' },
  { label: '已购模块', value: '2', accent: 'text-ink' },
  { label: '已写评价', value: '2', accent: 'text-ink' },
];

const purchases = [
  { title: 'Next.js 14 核心指南', date: '2024-01-15', status: '已完成', slug: 'nextjs-14-guide' },
  { title: 'Prisma + Neon Serverless 实践', date: '2024-01-10', status: '已评价', slug: 'prisma-neon-mastery' },
];

const fragments = [
  { quote: '特别是关于 Serverless 的部分，让我领悟到了很多关键点', module: 'Next.js 14 核心指南' },
  { quote: '原来数据库分支功能可以这么用，极大地提升了开发效率', module: 'Prisma + Neon Serverless 实践' },
];

export default function DashboardPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-16">
      <header className="mb-10">
        <h1 className="font-display text-3xl font-bold text-ink">我的仪表盘</h1>
        <p className="mt-2 text-ink-muted">管理你的知识资产与购买记录</p>
      </header>

      <div className="mb-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
        {stats.map((s) => (
          <Reveal key={s.label}>
            <Card className="card-lift">
              <p className="text-sm text-ink-muted">{s.label}</p>
              <p className={`mt-2 text-3xl font-extrabold ${s.accent}`}>{s.value}</p>
            </Card>
          </Reveal>
        ))}
      </div>

      <section className="mb-12">
        <h2 className="mb-4 text-xl font-bold text-ink">最近购买</h2>
        <div className="space-y-4">
          {purchases.map((item) => (
            <Reveal key={item.title}>
              <Card className="flex items-center justify-between">
                <div>
                  <Link href={`/modules/${item.slug}`} className="font-medium text-ink hover:text-gold">
                    {item.title}
                  </Link>
                  <p className="text-sm text-ink-faint">{item.date} · {item.status}</p>
                </div>
                {item.status === '已完成' && (
                  <Link href="/review/some-purchase-id" className="rounded bg-gold/15 px-3 py-1 text-sm font-medium text-gold hover:bg-gold/25">
                    去评价
                  </Link>
                )}
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-bold text-ink">我的评价碎片</h2>
        <div className="space-y-4">
          {fragments.map((f, i) => (
            <Reveal key={i}>
              <Card className="rounded-r-lg border-l-4 border-gold">
                <p className="mb-2 italic text-ink">“{f.quote}”</p>
                <p className="text-sm text-ink-faint">来自 《{f.module}》</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  );
}
