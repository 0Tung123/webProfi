import prisma from '../../lib/prisma';
import type { Project, CreateProjectInput, UpdateProjectInput } from './project.types';

export const projectService = {
  async getAll(): Promise<Project[]> {
    return prisma.project.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' }
    });
  },

  async getById(projectId: string): Promise<Project | null> {
    return prisma.project.findUnique({
      where: { projectId }
    });
  },

  async create(data: CreateProjectInput): Promise<Project> {
    return prisma.project.create({
      data: {
        ...data,
        order: data.order ?? 0
      }
    });
  },

  async update(projectId: string, data: UpdateProjectInput): Promise<Project> {
    return prisma.project.update({
      where: { projectId },
      data
    });
  },

  async delete(projectId: string): Promise<void> {
    await prisma.project.delete({
      where: { projectId }
    });
  }
};