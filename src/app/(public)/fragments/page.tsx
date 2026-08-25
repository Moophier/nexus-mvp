import { Card } from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';
import { Reveal } from '../../../components/reveal';

const fragments = [
  { quote: '特别是关于 Serverless 的部分，让我领悟到了很多关键点', module: 'Next.js 14 核心指南' },
  { quote: '原来数据库分支功能可以这么用，极大地提升了开发效率', module: 'Prisma + Neon Serverless 实践' },
];

export default function FragmentsPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-16">
      <header className="mb-12">
        <p className="mb-2 text-xs uppercase tracking-[0.3em] text-gold">Fragments</p>
        <h1 className="font-display text-4xl font-bold text-ink">评价碎片流</h1>
        <p className="mt-3 text-ink-muted">由购买者真诚评价提炼的可传播知识碎片。</p>
      </header>
      <div className="space-y-5">
        {fragments.map((f, i) => (
          <Reveal key={i}>
            <Card className="card-lift">
              <Badge>碎片 #{i + 1}</Badge>
              <p className="mt-3 italic text-ink">“{f.quote}”</p>
              <p className="mt-2 text-sm text-ink-faint">来自 《{f.module}》</p>
            </Card>
          </Reveal>
        ))}
      </div>
    </main>
  );
}
