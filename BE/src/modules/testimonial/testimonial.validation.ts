import { z } from 'zod';

export const createTestimonialSchema = z.object({
  quote: z.string().min(1),
  author: z.string().min(1),
  role: z.string().min(1),
  company: z.string().optional()
});

export const updateTestimonialSchema = z.object({
  quote: z.string().min(1).optional(),
  author: z.string().optional(),
  role: z.string().optional(),
  company: z.string().optional(),
  isActive: z.boolean().optional()
});

export type CreateTestimonialInput = z.infer<typeof createTestimonialSchema>;
export type UpdateTestimonialInput = z.infer<typeof updateTestimonialSchema>;