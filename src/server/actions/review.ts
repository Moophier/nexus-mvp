'use server'

import { prisma } from '@/lib/db';
import { submitReviewSchema } from '@/lib/validation';
import { extractFragments } from '@/lib/fragment-extractor';
import { revalidatePath } from 'next/cache';

export async function submitReviewAction(userId: string, data: any) {
  try {
    const result = submitReviewSchema.safeParse(data);
    if (!result.success) {
      return { error: 'Invalid review data' };
    }

    const { purchaseId, rating, body } = result.data;

    // 1. Verify purchase is PAID and belongs to user
    const purchase = await prisma.purchase.findUnique({
      where: { id: purchaseId },
    });

    if (!purchase || purchase.userId !== userId || purchase.status !== 'PAID') {
      throw new Error('You must have a paid purchase to leave a review');
    }

    // 2. Check if already reviewed
    const existing = await prisma.review.findUnique({
      where: { purchaseId },
    });
    if (existing) throw new Error('Review already submitted for this purchase');

    const mod = await prisma.module.findUnique({
      where: { id: purchase.moduleId },
    });
    if (!mod) throw new Error('Module not found');

    // 3. Save Review and Extract Fragments (Synchronous for MVP)
    const review = await prisma.review.create({
      data: {
        purchaseId,
        userId,
        moduleId: mod.id,
        rating,
        body,
      },
    });

    const quotes = extractFragments(body);
    const fragments = await Promise.all(
      quotes.map(quote => 
        prisma.fragment.create({
          data: {
            reviewId: review.id,
            moduleId: mod.id,
            quote,
            link: `/modules/${mod.slug}?via=frag_${Math.random().toString(36).substr(2, 5)}`,
          }
        })
      )
    );

    revalidatePath(`/modules/${mod.slug}`);
    revalidatePath('/dashboard');

    return { success: true, review, fragments };
  } catch (e: any) {
    return { error: e.message };
  }
}
