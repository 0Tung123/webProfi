import apiClient from './apiClient';

export interface ProcessStep {
  stepId: string;
  step: string;
  title: string;
  description: string;
  order: number;
}

export interface ProcessSection {
  processId: string;
  category: string;
  title: string;
  description: string;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  steps: ProcessStep[];
}

export interface CreateProcessStepDto {
  step: string;
  title: string;
  description: string;
  order?: number;
}

export interface CreateProcessSectionDto {
  category: string;
  title: string;
  description: string;
  steps?: CreateProcessStepDto[];
  order?: number;
}

export interface UpdateProcessStepDto {
  step?: string;
  title?: string;
  description?: string;
  order?: number;
}

export interface UpdateProcessSectionDto {
  title?: string;
  description?: string;
  order?: number;
  isActive?: boolean;
  steps?: (UpdateProcessStepDto & { stepId?: string })[];
}

export const processService = {
  // Public: Get all process sections
  async getAll(): Promise<ProcessSection[]> {
    const response = await apiClient.get('/process');
    return response.data;
  },

  // Public: Get process section by category
  async getByCategory(category: string): Promise<ProcessSection> {
    const response = await apiClient.get(`/process/${category}`);
    return response.data;
  },

  // Admin: Create process section
  async create(data: CreateProcessSectionDto): Promise<ProcessSection> {
    const response = await apiClient.post('/process', data);
    return response.data;
  },

  // Admin: Update process section
  async update(processId: string, data: UpdateProcessSectionDto): Promise<ProcessSection> {
    const response = await apiClient.put(`/process/${processId}`, data);
    return response.data;
  },

  // Admin: Delete process section
  async delete(processId: string): Promise<void> {
    await apiClient.delete(`/process/${processId}`);
  },
};