import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { phoneSchema } from '@/lib/validation';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = phoneSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: 'Invalid phone number' }, { status: 400 });
    }

    const { phone } = result.data;
    
    // Mock SMS Send
    console.log(`[SMS] Sending verification code to ${phone}...`);
    
    // In production, this would call Tencent Cloud SMS API
    // Here we just simulate a 6-digit code and log it
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    console.log(`[SMS] CODE FOR ${phone}: ${code}`);

    // Save to VerificationToken table (simplified for MVP)
    await prisma.verificationToken.create({
      data: {
        identifier: phone,
        token: code,
        expires: new Date(Date.now() + 5 * 60 * 1000), // 5 mins
      },
    });

    return NextResponse.json({ success: true, message: 'Code sent successfully' });
  } catch (error) {
    console.error('SMS error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
