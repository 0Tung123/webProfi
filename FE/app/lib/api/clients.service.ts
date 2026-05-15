import apiClient from './apiClient';

export interface Client {
  clientId: string;
  name: string;
  logo?: string;
  website?: string;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateClientDto {
  name: string;
  logo?: string;
  website?: string;
  order?: number;
}

export interface UpdateClientDto {
  name?: string;
  logo?: string;
  website?: string;
  order?: number;
  isActive?: boolean;
}

export const clientsService = {
  // Public: Get all active clients
  async getAll(): Promise<Client[]> {
    const response = await apiClient.get('/clients');
    return response.data;
  },

  // Admin: Create client
  async create(data: CreateClientDto): Promise<Client> {
    const response = await apiClient.post('/clients', data);
    return response.data;
  },

  // Admin: Update client
  async update(clientId: string, data: UpdateClientDto): Promise<Client> {
    const response = await apiClient.put(`/clients/${clientId}`, data);
    return response.data;
  },

  // Admin: Delete client
  async delete(clientId: string): Promise<void> {
    await apiClient.delete(`/clients/${clientId}`);
  },
};