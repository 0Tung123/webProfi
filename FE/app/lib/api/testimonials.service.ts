import apiClient from './apiClient';

export interface Testimonial {
  testimonialId: string;
  quote: string;
  author: string;
  role: string;
  company?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTestimonialDto {
  quote: string;
  author: string;
  role: string;
  company?: string;
}

export interface UpdateTestimonialDto {
  quote?: string;
  author?: string;
  role?: string;
  company?: string;
  isActive?: boolean;
}

export const testimonialsService = {
  // Public: Get all active testimonials
  async getAll(): Promise<Testimonial[]> {
    const response = await apiClient.get('/testimonials');
    return response.data;
  },

  // Admin: Create testimonial
  async create(data: CreateTestimonialDto): Promise<Testimonial> {
    const response = await apiClient.post('/testimonials', data);
    return response.data;
  },

  // Admin: Update testimonial
  async update(testimonialId: string, data: UpdateTestimonialDto): Promise<Testimonial> {
    const response = await apiClient.put(`/testimonials/${testimonialId}`, data);
    return response.data;
  },

  // Admin: Delete testimonial
  async delete(testimonialId: string): Promise<void> {
    await apiClient.delete(`/testimonials/${testimonialId}`);
  },
};