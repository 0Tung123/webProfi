import prisma from '../../lib/prisma';
import type { Client, CreateClientInput, UpdateClientInput } from './client.types';

export const clientService = {
  async getAll(): Promise<Client[]> {
    return prisma.client.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' }
    });
  },

  async create(data: CreateClientInput): Promise<Client> {
    return prisma.client.create({ data: { ...data, order: data.order ?? 0 } });
  },

  async update(clientId: string, data: UpdateClientInput): Promise<Client> {
    return prisma.client.update({ where: { clientId }, data });
  },

  async delete(clientId: string): Promise<void> {
    await prisma.client.delete({ where: { clientId } });
  }
};