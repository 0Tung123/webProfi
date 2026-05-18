import { z } from 'zod';
import { createTeamMemberSchema, updateTeamMemberSchema } from './team.types';

export { createTeamMemberSchema, updateTeamMemberSchema };

export const teamValidation = {
  create: createTeamMemberSchema,
  update: updateTeamMemberSchema,

  validateCreate(data: unknown): z.infer<typeof createTeamMemberSchema> {
    return createTeamMemberSchema.parse(data);
  },

  validateUpdate(data: unknown): z.infer<typeof updateTeamMemberSchema> {
    return updateTeamMemberSchema.parse(data);
  }
};