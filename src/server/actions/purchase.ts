'use server'

import { prisma } from '@/lib/db';
import { mockPayment } from '@/lib/payment';
import { nanoid } from 'nanoid';
import { revalidatePath } from 'next/cache';

export async function purchaseModuleAction(userId: string, moduleId: string) {
  try {
    // 1. Check if module exists and is published
    const mod = await prisma.module.findUnique({
      where: { id: moduleId },
    });

    if (!mod || mod.status !== 'PUBLISHED') {
      throw new Error('Module not found or not published');
    }

    // 2. Check if already purchased
    const existing = await prisma.purchase.findUnique({
      where: {
        userId_moduleId: { userId, moduleId },
      },
    });

    if (existing) {
      throw new Error('You have already purchased this module');
    }

    // 3. Create PENDING purchase
    const purchase = await prisma.purchase.create({
      data: {
        userId,
        moduleId,
        priceCents: mod.priceCents,
        status: 'PENDING',
        paymentRef: `pay_${nanoid()}`,
      },
    });

    return { success: true, purchaseId: purchase.id, paymentRef: purchase.paymentRef };
  } catch (e: any) {
    return { error: e.message };
  }
}

export async function confirmPurchaseAction(userId: string, purchaseId: string) {
  try {
    const purchase = await prisma.purchase.findUnique({
      where: { id: purchaseId },
    });

    if (!purchase || purchase.userId !== userId || purchase.status !== 'PENDING') {
      throw new Error('Invalid or already processed purchase');
    }

    const mod = await prisma.module.findUnique({
      where: { id: purchase.moduleId },
    });

    if (!mod) throw new Error('Module not found');

    // 1. Process Mock Payment
    const payResult = await mockPayment.charge(purchase.paymentRef!, mod.priceCents);
    if (!payResult.ok) throw new Error(payResult.error || 'Payment failed');

    // 2. Transactional update: Purchase status + AssetAccount balance + Transaction log
    await prisma.$transaction([
      prisma.purchase.update({
        where: { id: purchaseId },
        data: { status: 'PAID', paidAt: new Date(), paymentRef: payResult.txId },
      }),
      prisma.assetAccount.upsert({
        where: { userId },
        update: { balanceCents: { decrement: mod.priceCents } },
        create: { userId, balanceCents: 0 - mod.priceCents }, // Allow negative for MVP
      }),
      prisma.transaction.create({
        data: {
          userId,
          amountCents: -mod.priceCents,
          reason: 'module_purchase',
          refType: 'Module',
          refId: mod.id,
        },
      }),
    ]);

    revalidatePath('/dashboard');
    return { success: true };
  } catch (e: any) {
    return { error: e.message };
  }
}
