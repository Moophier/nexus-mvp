import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(
  req: NextRequest, 
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;
    const mod = await prisma.module.findUnique({
      where: { slug },
      include: {
        author: { select: { name: true, role: true } },
        reviews: {
          orderBy: { createdAt: 'desc' },
          include: {
            user: { select: { name: true } },
            fragments: true,
          }
        }
      }
    });

    if (!mod) return NextResponse.json({ error: 'Module not found' }, { status: 404 });

    return NextResponse.json(mod);
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
