import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { redis } from '@/lib/redis';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const moduleId = searchParams.get('moduleId');
    const limit = parseInt(searchParams.get('limit') || '50');

    const cacheKey = `fragments:list:moduleId:${moduleId}:limit:${limit}`;
    const cachedData = await redis.get(cacheKey);
    if (cachedData) return NextResponse.json(cachedData);

    const fragments = await prisma.fragment.findMany({
      where: moduleId ? { moduleId } : {},
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: {
        module: { select: { title: true, slug: true } },
        review: { select: { body: true, rating: true } }
      }
    });

    await redis.set(cacheKey, fragments, { ex: 3600 });
    return NextResponse.json(fragments);
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
