import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { nanoid } from 'nanoid';

export async function POST(req: NextRequest) {
  try {
    const { userId, moduleId } = await req.json();
    const mod = await prisma.module.findUnique({ where: { id: moduleId } });
    if (!mod || mod.status !== 'PUBLISHED') return NextResponse.json({ error: 'Not found' }, { status: 404 });

    const purchase = await prisma.purchase.create({
      data: { userId, moduleId, priceCents: mod.priceCents, status: 'PENDING', paymentRef: `pay_${nanoid()}` }
    });
    return NextResponse.json({ purchaseId: purchase.id, paymentRef: purchase.paymentRef });
  } catch (e) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
