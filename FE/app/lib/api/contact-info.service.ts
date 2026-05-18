import apiClient from './apiClient';

export interface ContactInfo {
  contactInfoId: string;
  type: 'phone' | 'email' | 'office' | 'social';
  label: string;
  value: string;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateContactInfoInput {
  type: 'phone' | 'email' | 'office' | 'social';
  label: string;
  value: string;
  order?: number;
}

export interface UpdateContactInfoInput {
  type?: 'phone' | 'email' | 'office' | 'social';
  label?: string;
  value?: string;
  order?: number;
  isActive?: boolean;
}

export const contactInfoService = {
  // Public: Get all active contact info
  async getAll(): Promise<ContactInfo[]> {
    const response = await apiClient.get('/contact-info');
    return response.data;
  },

  // Public: Get contact info by type
  async getByType(type: 'phone' | 'email' | 'office' | 'social'): Promise<ContactInfo[]> {
    const response = await apiClient.get(`/contact-info/type/${type}`);
    return response.data;
  },

  // Public: Get contact info by ID
  async getById(contactInfoId: string): Promise<ContactInfo> {
    const response = await apiClient.get(`/contact-info/${contactInfoId}`);
    return response.data;
  },

  // Admin: Create contact info
  async create(data: CreateContactInfoInput): Promise<ContactInfo> {
    const response = await apiClient.post('/contact-info', data);
    return response.data;
  },

  // Admin: Update contact info
  async update(contactInfoId: string, data: UpdateContactInfoInput): Promise<ContactInfo> {
    const response = await apiClient.put(`/contact-info/${contactInfoId}`, data);
    return response.data;
  },

  // Admin: Delete contact info
  async delete(contactInfoId: string): Promise<void> {
    await apiClient.delete(`/contact-info/${contactInfoId}`);
  }
};