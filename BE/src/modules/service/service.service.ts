import prisma from '../../lib/prisma';
import type { Service, CreateServiceInput, UpdateServiceInput } from './service.types';

export const serviceService = {
  async getAll(): Promise<Service[]> {
    return prisma.service.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' }
    });
  },

  async create(data: CreateServiceInput): Promise<Service> {
    return prisma.service.create({
      data: { ...data, order: data.order ?? 0 }
    });
  },

  async update(serviceId: string, data: UpdateServiceInput): Promise<Service> {
    return prisma.service.update({
      where: { serviceId },
      data
    });
  },

  async delete(serviceId: string): Promise<void> {
    await prisma.service.delete({ where: { serviceId } });
  }
};