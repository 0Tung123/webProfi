import { z } from 'zod';
import { createContactInfoSchema, updateContactInfoSchema } from './contact-info.types';

export { createContactInfoSchema, updateContactInfoSchema };

export const contactInfoValidation = {
  create: createContactInfoSchema,
  update: updateContactInfoSchema,

  validateCreate(data: unknown): z.infer<typeof createContactInfoSchema> {
    return createContactInfoSchema.parse(data);
  },

  validateUpdate(data: unknown): z.infer<typeof updateContactInfoSchema> {
    return updateContactInfoSchema.parse(data);
  }
};