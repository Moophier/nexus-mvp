import Link from 'next/link';
import { Card } from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';
import { Reveal } from '../../../components/reveal';

const modules = [
  { slug: 'nextjs-14-guide', title: 'Next.js 14 核心指南', price: '¥29.00' },
  { slug: 'prisma-neon-mastery', title: 'Prisma + Neon Serverless 实践', price: '¥39.00' },
];

export default function ModulesPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-16">
      <header className="mb-12">
        <p className="mb-2 text-xs uppercase tracking-[0.3em] text-gold">Modules</p>
        <h1 className="font-display text-4xl font-bold text-ink">所有模块</h1>
      </header>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {modules.map((m) => (
          <Reveal key={m.slug}>
            <Card className="card-lift h-full">
              <div className="flex items-start justify-between">
                <h2 className="text-xl font-bold text-ink">{m.title}</h2>
                <Badge>{m.price}</Badge>
              </div>
              <Link href={`/modules/${m.slug}`} className="mt-6 inline-block font-medium text-gold hover:underline">
                查看模块 →
              </Link>
            </Card>
          </Reveal>
        ))}
      </div>
    </main>
  );
}
