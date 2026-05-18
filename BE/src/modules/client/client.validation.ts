import { z } from 'zod';

export const createClientSchema = z.object({
  name: z.string().min(1),
  logo: z.string().optional(),
  website: z.string().optional(),
  order: z.number().optional().default(0)
});

export const updateClientSchema = z.object({
  name: z.string().min(1).optional(),
  logo: z.string().optional(),
  website: z.string().optional(),
  order: z.number().optional(),
  isActive: z.boolean().optional()
});

export type CreateClientInput = z.infer<typeof createClientSchema>;
export type UpdateClientInput = z.infer<typeof updateClientSchema>;