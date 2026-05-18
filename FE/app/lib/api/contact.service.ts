import apiClient from './apiClient';

export interface ContactSubmission {
  contactId: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  read: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateContactSubmissionDto {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

export interface UpdateContactSubmissionDto {
  read?: boolean;
}

export const contactService = {
  // Public: Submit contact form
  async submit(data: CreateContactSubmissionDto): Promise<ContactSubmission> {
    const response = await apiClient.post('/contact', data);
    return response.data;
  },

  // Admin: Get all contact submissions
  async getAll(): Promise<ContactSubmission[]> {
    const response = await apiClient.get('/contact');
    return response.data;
  },

  // Admin: Update contact submission
  async update(contactId: string, data: UpdateContactSubmissionDto): Promise<ContactSubmission> {
    const response = await apiClient.put(`/contact/${contactId}`, data);
    return response.data;
  },

  // Admin: Mark as read
  async markAsRead(contactId: string): Promise<ContactSubmission> {
    return this.update(contactId, { read: true });
  },

  // Admin: Delete contact submission
  async delete(contactId: string): Promise<void> {
    await apiClient.delete(`/contact/${contactId}`);
  },
};