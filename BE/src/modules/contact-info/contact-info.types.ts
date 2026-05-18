import { z } from 'zod';

// Contact info type from Prisma
export interface ContactInfo {
  contactInfoId: string;
  type: string;
  label: string;
  value: string;
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Input types for CRUD operations
export interface CreateContactInfoInput {
  type: string;
  label: string;
  value: string;
  order?: number;
}

export interface UpdateContactInfoInput {
  type?: string;
  label?: string;
  value?: string;
  order?: number;
  isActive?: boolean;
}

// Contact type constants
export const CONTACT_TYPES = {
  PHONE: 'phone',
  EMAIL: 'email',
  OFFICE: 'office',
  SOCIAL: 'social'
} as const;

export type ContactType = typeof CONTACT_TYPES[keyof typeof CONTACT_TYPES];

// Validation schemas
export const createContactInfoSchema = z.object({
  type: z.string().min(1, 'Type is required')
    .pipe(z.enum([CONTACT_TYPES.PHONE, CONTACT_TYPES.EMAIL, CONTACT_TYPES.OFFICE, CONTACT_TYPES.SOCIAL])),
  label: z.string().min(1, 'Label is required'),
  value: z.string().min(1, 'Value is required'),
  order: z.number().optional().default(0)
});

export const updateContactInfoSchema = z.object({
  type: z.string()
    .pipe(z.enum([CONTACT_TYPES.PHONE, CONTACT_TYPES.EMAIL, CONTACT_TYPES.OFFICE, CONTACT_TYPES.SOCIAL])).optional(),
  label: z.string().min(1).optional(),
  value: z.string().min(1).optional(),
  order: z.number().optional(),
  isActive: z.boolean().optional()
});

export type CreateContactInfoInputValidated = z.infer<typeof createContactInfoSchema>;
export type UpdateContactInfoInputValidated = z.infer<typeof updateContactInfoSchema>;