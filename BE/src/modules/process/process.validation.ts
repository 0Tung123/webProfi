import { z } from 'zod';

const stepSchema = z.object({
  step: z.string(),
  title: z.string(),
  description: z.string(),
  order: z.number().optional()
});

export const createProcessSchema = z.object({
  category: z.string(),
  title: z.string(),
  description: z.string(),
  steps: z.array(stepSchema).optional(),
  order: z.number().optional()
});

export const updateProcessSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  order: z.number().optional(),
  isActive: z.boolean().optional(),
  steps: z.array(stepSchema.extend({ stepId: z.string().optional() })).optional()
});

export type CreateProcessInput = z.infer<typeof createProcessSchema>;
export type UpdateProcessInput = z.infer<typeof updateProcessSchema>;
export type ProcessStepInput = z.infer<typeof stepSchema>;