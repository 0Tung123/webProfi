import apiClient from './apiClient';

export interface Service {
  serviceId: string;
  title: string;
  description: string;
  image: string;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateServiceDto {
  title: string;
  description: string;
  image: string;
  order?: number;
}

export interface UpdateServiceDto {
  title?: string;
  description?: string;
  image?: string;
  order?: number;
  isActive?: boolean;
}

export const servicesService = {
  // Public: Get all active services
  async getAll(): Promise<Service[]> {
    const response = await apiClient.get('/services');
    return response.data;
  },

  // Admin: Create service
  async create(data: CreateServiceDto): Promise<Service> {
    const response = await apiClient.post('/services', data);
    return response.data;
  },

  // Admin: Update service
  async update(serviceId: string, data: UpdateServiceDto): Promise<Service> {
    const response = await apiClient.put(`/services/${serviceId}`, data);
    return response.data;
  },

  // Admin: Delete service
  async delete(serviceId: string): Promise<void> {
    await apiClient.delete(`/services/${serviceId}`);
  },
};