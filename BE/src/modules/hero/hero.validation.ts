import { z } from 'zod';

export const updateHeroSchema = z.object({
  title1: z.string().min(1).optional(),
  title2: z.string().min(1).optional(),
  subtext: z.string().min(1).optional(),
  mediaUrl: z.string().url().optional(),
  mediaType: z.enum(['image', 'video']).optional(),
});

export type UpdateHeroInput = z.infer<typeof updateHeroSchema>;
