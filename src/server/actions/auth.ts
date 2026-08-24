'use server'

import { z } from 'zod';
import { phoneSchema } from '@/lib/validation';
import { prisma } from '@/lib/db';

export async function requestPhoneCodeAction(formData: FormData) {
  const phone = formData.get('phone') as string;
  const result = phoneSchema.safeParse({ phone });

  if (!result.success) {
    return { error: result.error.flatten().fieldErrors.phone?.[0] || 'Invalid phone' };
  }

  try {
    // Simple bridge to our API route logic
    const response = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/phone`, {
      method: 'POST',
      body: JSON.stringify({ phone }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) throw new Error('Failed to send SMS');
    return { success: true };
  } catch (e) {
    return { error: 'SMS service unavailable' };
  }
}

export async function requestEmailLinkAction(formData: FormData) {
  const email = formData.get('email') as string;
  if (!email || !email.includes('@')) return { error: 'Invalid email' };

  try {
    const response = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/email`, {
      method: 'POST',
      body: JSON.stringify({ email }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) throw new Error('Failed to send email');
    return { success: true };
  } catch (e) {
    return { error: 'Email service unavailable' };
  }
}
