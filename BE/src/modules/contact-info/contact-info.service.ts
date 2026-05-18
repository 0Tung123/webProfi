import prisma from '../../lib/prisma';
import type { ContactInfo, CreateContactInfoInput, UpdateContactInfoInput } from './contact-info.types';

export const contactInfoService = {
  async getAll(): Promise<ContactInfo[]> {
    return prisma.contactInfo.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' }
    });
  },

  async getAllByType(type: string): Promise<ContactInfo[]> {
    return prisma.contactInfo.findMany({
      where: {
        type,
        isActive: true
      },
      orderBy: { order: 'asc' }
    });
  },

  async getAllIncludingInactive(): Promise<ContactInfo[]> {
    return prisma.contactInfo.findMany({
      orderBy: { order: 'asc' }
    });
  },

  async getById(contactInfoId: string): Promise<ContactInfo | null> {
    return prisma.contactInfo.findUnique({
      where: { contactInfoId }
    });
  },

  async create(data: CreateContactInfoInput): Promise<ContactInfo> {
    return prisma.contactInfo.create({
      data: {
        type: data.type,
        label: data.label,
        value: data.value,
        order: data.order ?? 0
      }
    });
  },

  async update(contactInfoId: string, data: UpdateContactInfoInput): Promise<ContactInfo> {
    return prisma.contactInfo.update({
      where: { contactInfoId },
      data: {
        ...(data.type !== undefined && { type: data.type }),
        ...(data.label !== undefined && { label: data.label }),
        ...(data.value !== undefined && { value: data.value }),
        ...(data.order !== undefined && { order: data.order }),
        ...(data.isActive !== undefined && { isActive: data.isActive })
      }
    });
  },

  async delete(contactInfoId: string): Promise<void> {
    await prisma.contactInfo.delete({
      where: { contactInfoId }
    });
  }
};