import { z } from 'zod';

export const submitReviewSchema = z.object({
  userId: z.string().min(1, 'User ID is required'),
  purchaseId: z.string().min(1, 'Purchase ID is required'),
  rating: z.number().int().min(1).max(5),
  body: z.string().min(20, 'Review must be at least 20 characters').max(500, 'Review must be under 500 characters'),
});

export const createModuleSchema = z.object({
  title: z.string().min(5, 'Title too short').max(100, 'Title too long'),
  summary: z.string().min(10, 'Summary too short').max(500, 'Summary too long'),
  content: z.string().min(100, 'Content must be at least 100 characters'),
  priceCents: z.number().int().min(100, 'Price must be at least ¥1').max(1000000), // Max ¥10,000
});

export const phoneSchema = z.object({
  phone: z.string().regex(/^1[3-9]\d{9}$/, 'Invalid phone number format'),
});
