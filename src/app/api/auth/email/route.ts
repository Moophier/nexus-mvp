import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/db';

const emailSchema = z.object({
  email: z.string().email(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = emailSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    const { email } = result.data;
    
    // Mock Magic Link
    const token = Math.random().toString(36).substring(2, 15);
    const magicLink = `http://localhost:3000/api/auth/callback/email?token=${token}`;
    
    console.log(`[Email] Sending magic link to ${email}: ${magicLink}`);
    
    await prisma.verificationToken.create({
      data: {
        identifier: email,
        token: token,
        expires: new Date(Date.now() + 15 * 60 * 1000), // 15 mins
      },
    });

    return NextResponse.json({ success: true, message: 'Magic link sent to email' });
  } catch (error) {
    console.error('Email error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
