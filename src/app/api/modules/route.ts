import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { redis } from '@/lib/redis';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get('limit') || '20');
    const cursor = searchParams.get('cursor');

    // Try cache first
    const cacheKey = `modules:list:limit:${limit}:cursor:${cursor}`;
    const cachedData = await redis.get(cacheKey);
    if (cachedData) return NextResponse.json(cachedData);

    const modules = await prisma.module.findMany({
      where: { status: 'PUBLISHED' },
      take: limit,
      skip: cursor ? 1 : 0,
      cursor: cursor ? { id: cursor } : undefined,
      orderBy: { createdAt: 'desc' },
      include: {
        _count: {
          select: { reviews: true, fragments: true }
        }
      }
    });

    const result = {
      data: modules,
      nextCursor: modules.length === limit ? modules[modules.length - 1].id : null,
    };

    await redis.set(cacheKey, result, { ex: 3600 }); // Cache for 1 hour
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
