import prisma from '../../lib/prisma';
import type { Project, CreateProjectInput, UpdateProjectInput } from './project.types';

export const projectService = {
  async getAll(): Promise<Project[]> {
    return prisma.project.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' }
    });
  },

  async getAllByCategory(categorySlug: string): Promise<Project[]> {
    return prisma.project.findMany({
      where: {
        isActive: true,
        categorySlug: categorySlug
      },
      orderBy: { order: 'asc' }
    });
  },

  async getAllCategories(): Promise<string[]> {
    const projects = await prisma.project.findMany({
      where: { isActive: true },
      distinct: ['categorySlug'],
      orderBy: { order: 'asc' }
    });
    return projects.map(p => p.categorySlug).filter(Boolean);
  },

  async getById(projectId: string): Promise<Project | null> {
    return prisma.project.findUnique({
      where: { projectId }
    });
  },

  async create(data: CreateProjectInput): Promise<Project> {
    return prisma.project.create({
      data: {
        title: data.title,
        category: data.category,
        categorySlug: data.categorySlug ?? '',
        description: data.description ?? null,
        image: data.image,
        order: data.order ?? 0
      }
    });
  },

  async update(projectId: string, data: UpdateProjectInput): Promise<Project> {
    return prisma.project.update({
      where: { projectId },
      data: {
        ...(data.title !== undefined && { title: data.title }),
        ...(data.category !== undefined && { category: data.category }),
        ...(data.categorySlug !== undefined && { categorySlug: data.categorySlug }),
        ...(data.description !== undefined && { description: data.description }),
        ...(data.image !== undefined && { image: data.image }),
        ...(data.order !== undefined && { order: data.order }),
        ...(data.isActive !== undefined && { isActive: data.isActive })
      }
    });
  },

  async delete(projectId: string): Promise<void> {
    await prisma.project.delete({
      where: { projectId }
    });
  }
};