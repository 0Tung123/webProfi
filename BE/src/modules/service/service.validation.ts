import { z } from 'zod';

export const createServiceSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  image: z.string().min(1),
  order: z.number().optional().default(0)
});

export const updateServiceSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().optional(),
  image: z.string().optional(),
  order: z.number().optional(),
  isActive: z.boolean().optional()
});

export type CreateServiceInput = z.infer<typeof createServiceSchema>;
export type UpdateServiceInput = z.infer<typeof updateServiceSchema>;