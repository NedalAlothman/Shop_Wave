import { z } from 'zod';

const envSchema = z.object({
  NEXTAUTH_URL: z.string(),
  DATABASE_URL: z.string(),
  NEXTAUTH_SECRET: z.string(),
  NEXTAUTH_URL_INTERNAL: z.string().optional(),
});

export const env = envSchema.parse({
  NEXTAUTH_URL: process.env.NEXTAUTH_URL || 'http://localhost:3000',
  DATABASE_URL: process.env.DATABASE_URL || 'postgresql://user:password@localhost:5432/shopwave',
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET || 'your-secret-key',
  NEXTAUTH_URL_INTERNAL: process.env.NEXTAUTH_URL_INTERNAL,
});
