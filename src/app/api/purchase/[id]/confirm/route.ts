import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { mockPayment } from '@/lib/payment';

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { userId } = await req.json();
    const purchase = await prisma.purchase.findUnique({ where: { id: params.id } });
    if (!purchase || purchase.userId !== userId || purchase.status !== 'PENDING') {
      return NextResponse.json({ error: 'Invalid purchase' }, { status: 400 });
    }

    const mod = await prisma.module.findUnique({ where: { id: purchase.moduleId } });
    if (!mod) return NextResponse.json({ error: 'Module missing' }, { status: 404 });

    const payResult = await mockPayment.charge(purchase.paymentRef!, mod.priceCents);
    if (!payResult.ok) return NextResponse.json({ error: payResult.error }, { status: 402 });

    await prisma.$transaction([
      prisma.purchase.update({ where: { id: params.id }, data: { status: 'PAID', paidAt: new Date(), paymentRef: payResult.txId } }),
      prisma.assetAccount.upsert({
        where: { userId },
        update: { balanceCents: { decrement: mod.priceCents } },
        create: { userId, balanceCents: 0 - mod.priceCents },
      }),
      prisma.transaction.create({
        data: { userId, amountCents: -mod.priceCents, reason: 'module_purchase', refType: 'Module', refId: mod.id }
      }),
    ]);

    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
