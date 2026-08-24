import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { submitReviewSchema } from '@/lib/validation';
import { extractFragments } from '@/lib/fragment-extractor';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = submitReviewSchema.safeParse(body);
    if (!result.success) return NextResponse.json({ error: 'Invalid data' }, { status: 400 });

    const { purchaseId, rating, body: reviewBody, userId } = result.data;
    const purchase = await prisma.purchase.findUnique({ where: { id: purchaseId } });
    if (!purchase || purchase.userId !== userId || purchase.status !== 'PAID') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const review = await prisma.review.create({
      data: { purchaseId, userId, moduleId: purchase.moduleId, rating, body: reviewBody }
    });

    const quotes = extractFragments(reviewBody);
    await Promise.all(quotes.map(quote => 
      prisma.fragment.create({
        data: { reviewId: review.id, moduleId: purchase.moduleId, quote, link: `/modules/slug?via=frag_${Math.random().toString(36).substr(2, 5)}` }
      })
    ));

    return NextResponse.json({ success: true, reviewId: review.id });
  } catch (e) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
