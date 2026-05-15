export interface Testimonial {
  testimonialId: string;
  quote: string;
  author: string;
  role: string;
  company?: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateTestimonialInput {
  quote: string;
  author: string;
  role: string;
  company?: string;
}

export interface UpdateTestimonialInput {
  quote?: string;
  author?: string;
  role?: string;
  company?: string;
  isActive?: boolean;
}