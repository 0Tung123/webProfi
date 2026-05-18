import prisma from '../../lib/prisma';
import type { ProcessSection, CreateProcessInput, UpdateProcessInput } from './process.types';

export const processService = {
  async getAll(): Promise<ProcessSection[]> {
    return prisma.processSection.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
      include: {
        steps: {
          orderBy: { order: 'asc' }
        }
      }
    });
  },

  async getByCategory(category: string): Promise<ProcessSection | null> {
    return prisma.processSection.findUnique({
      where: { category },
      include: {
        steps: {
          orderBy: { order: 'asc' }
        }
      }
    });
  },

  async create(data: CreateProcessInput): Promise<ProcessSection> {
    const { steps, ...sectionData } = data;

    return prisma.processSection.create({
      data: {
        ...sectionData,
        order: sectionData.order ?? 0,
        steps: steps ? { create: steps } : undefined
      },
      include: { steps: true }
    });
  },

  async update(processId: string, data: UpdateProcessInput): Promise<ProcessSection> {
    const { steps, ...sectionData } = data;

    return prisma.processSection.update({
      where: { processId },
      data: {
        ...sectionData,
        ...(steps && {
          steps: {
            deleteMany: {},
            create: steps
          }
        })
      },
      include: { steps: true }
    });
  },

  async delete(processId: string): Promise<void> {
    await prisma.processSection.delete({ where: { processId } });
  }
};