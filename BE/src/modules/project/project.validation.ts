import { z } from 'zod';

export const createProjectSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  category: z.string().min(1, 'Category is required'),
  description: z.string().optional(),
  image: z.string().min(1, 'Image is required'),
  order: z.number().optional().default(0)
});

export const updateProjectSchema = z.object({
  title: z.string().min(1).optional(),
  category: z.string().min(1).optional(),
  description: z.string().optional(),
  image: z.string().min(1).optional(),
  order: z.number().optional(),
  isActive: z.boolean().optional()
});

export type CreateProjectInput = z.infer<typeof createProjectSchema>;
export type UpdateProjectInput = z.infer<typeof updateProjectSchema>;