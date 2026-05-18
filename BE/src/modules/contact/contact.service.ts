import prisma from '../../lib/prisma';
import type { ContactSubmission, CreateContactInput, UpdateContactInput } from './contact.types';

export const contactService = {
  async getAll(): Promise<ContactSubmission[]> {
    return prisma.contactSubmission.findMany({
      orderBy: { createdAt: 'desc' }
    });
  },

  async create(data: CreateContactInput): Promise<ContactSubmission> {
    return prisma.contactSubmission.create({
      data: { ...data, read: false }
    });
  },

  async update(contactId: string, data: UpdateContactInput): Promise<ContactSubmission> {
    return prisma.contactSubmission.update({
      where: { contactId },
      data
    });
  },

  async delete(contactId: string): Promise<void> {
    await prisma.contactSubmission.delete({ where: { contactId } });
  }
};