import apiClient from './apiClient';

export interface SocialLinks {
  facebook?: string;
  linkedin?: string;
  github?: string;
  instagram?: string;
  behance?: string;
  dribbble?: string;
}

export interface TeamMember {
  teamMemberId: string;
  name: string;
  role: string;
  image: string | null;
  socials: SocialLinks | null;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTeamMemberInput {
  name: string;
  role: string;
  image?: string | null;
  socials?: SocialLinks | null;
  order?: number;
}

export interface UpdateTeamMemberInput {
  name?: string;
  role?: string;
  image?: string | null;
  socials?: SocialLinks | null;
  order?: number;
  isActive?: boolean;
}

export const teamService = {
  // Public: Get all active team members
  async getAll(): Promise<TeamMember[]> {
    const response = await apiClient.get('/team');
    return response.data;
  },

  // Public: Get team member by ID
  async getById(teamMemberId: string): Promise<TeamMember> {
    const response = await apiClient.get(`/team/${teamMemberId}`);
    return response.data;
  },

  // Admin: Create team member
  async create(data: CreateTeamMemberInput): Promise<TeamMember> {
    const response = await apiClient.post('/team', data);
    return response.data;
  },

  // Admin: Update team member
  async update(teamMemberId: string, data: UpdateTeamMemberInput): Promise<TeamMember> {
    const response = await apiClient.put(`/team/${teamMemberId}`, data);
    return response.data;
  },

  // Admin: Delete team member
  async delete(teamMemberId: string): Promise<void> {
    await apiClient.delete(`/team/${teamMemberId}`);
  }
};