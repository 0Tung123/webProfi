import { z } from 'zod';

// Social links schema
const socialLinksSchema = z.object({
  facebook: z.string().url().optional(),
  linkedin: z.string().url().optional(),
  github: z.string().url().optional(),
  instagram: z.string().url().optional(),
  behance: z.string().url().optional(),
  dribbble: z.string().url().optional()
});

export type SocialLinks = z.infer<typeof socialLinksSchema>;

// Team member type from Prisma
export interface TeamMember {
  teamMemberId: string;
  name: string;
  role: string;
  image: string | null;
  socials: SocialLinks | null;
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Input types for CRUD operations
export interface CreateTeamMemberInput {
  name: string;
  role: string;
  image?: string | null;
  socials?: SocialLinks | null;
  order?: number;
}

export interface UpdateTeamMemberInput {
  name?: string;
  role?: string;
  image?: string | null;
  socials?: SocialLinks | null;
  order?: number;
  isActive?: boolean;
}

// Validation schemas
export const createTeamMemberSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  role: z.string().min(1, 'Role is required'),
  image: z.string().optional().nullable(),
  socials: socialLinksSchema.optional().nullable(),
  order: z.number().optional().default(0)
});

export const updateTeamMemberSchema = z.object({
  name: z.string().min(1).optional(),
  role: z.string().min(1).optional(),
  image: z.string().optional().nullable(),
  socials: socialLinksSchema.optional().nullable(),
  order: z.number().optional(),
  isActive: z.boolean().optional()
});

export type CreateTeamMemberInputValidated = z.infer<typeof createTeamMemberSchema>;
export type UpdateTeamMemberInputValidated = z.infer<typeof updateTeamMemberSchema>;