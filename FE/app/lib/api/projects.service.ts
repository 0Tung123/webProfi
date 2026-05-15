import apiClient from './apiClient';

export interface Project {
  projectId: string;
  title: string;
  category: string;
  description?: string;
  image: string;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProjectDto {
  title: string;
  category: string;
  description?: string;
  image: string;
  order?: number;
}

export interface UpdateProjectDto {
  title?: string;
  category?: string;
  description?: string;
  image?: string;
  order?: number;
  isActive?: boolean;
}

export const projectsService = {
  // Public: Get all active projects
  async getAll(): Promise<Project[]> {
    const response = await apiClient.get('/projects');
    return response.data;
  },

  // Public: Get project by ID
  async getById(projectId: string): Promise<Project> {
    const response = await apiClient.get(`/projects/${projectId}`);
    return response.data;
  },

  // Admin: Create project
  async create(data: CreateProjectDto): Promise<Project> {
    const response = await apiClient.post('/projects', data);
    return response.data;
  },

  // Admin: Update project
  async update(projectId: string, data: UpdateProjectDto): Promise<Project> {
    const response = await apiClient.put(`/projects/${projectId}`, data);
    return response.data;
  },

  // Admin: Delete project
  async delete(projectId: string): Promise<void> {
    await apiClient.delete(`/projects/${projectId}`);
  },
};