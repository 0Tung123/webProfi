import prisma from '../../lib/prisma';
import type { Prisma } from '@prisma/client';
import type { TeamMember, CreateTeamMemberInput, UpdateTeamMemberInput } from './team.types';

export const teamService = {
  async getAll(): Promise<TeamMember[]> {
    return prisma.teamMember.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' }
    }) as Promise<TeamMember[]>;
  },

  async getAllIncludingInactive(): Promise<TeamMember[]> {
    return prisma.teamMember.findMany({
      orderBy: { order: 'asc' }
    }) as Promise<TeamMember[]>;
  },

  async getById(teamMemberId: string): Promise<TeamMember | null> {
    return prisma.teamMember.findUnique({
      where: { teamMemberId }
    }) as Promise<TeamMember | null>;
  },

  async create(data: CreateTeamMemberInput): Promise<TeamMember> {
    return prisma.teamMember.create({
      data: {
        name: data.name,
        role: data.role,
        image: data.image ?? null,
        socials: (data.socials ?? null) as Prisma.InputJsonValue,
        order: data.order ?? 0
      }
    }) as Promise<TeamMember>;
  },

  async update(teamMemberId: string, data: UpdateTeamMemberInput): Promise<TeamMember> {
    const updateData: Prisma.TeamMemberUpdateInput = {};

    if (data.name !== undefined) updateData.name = data.name;
    if (data.role !== undefined) updateData.role = data.role;
    if (data.image !== undefined) updateData.image = data.image;
    if (data.socials !== undefined) updateData.socials = data.socials as Prisma.InputJsonValue;
    if (data.order !== undefined) updateData.order = data.order;
    if (data.isActive !== undefined) updateData.isActive = data.isActive;

    return prisma.teamMember.update({
      where: { teamMemberId },
      data: updateData
    }) as Promise<TeamMember>;
  },

  async delete(teamMemberId: string): Promise<void> {
    await prisma.teamMember.delete({
      where: { teamMemberId }
    });
  }
};