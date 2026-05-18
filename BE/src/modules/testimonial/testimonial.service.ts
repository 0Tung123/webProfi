import prisma from '../../lib/prisma';
import type { Testimonial, CreateTestimonialInput, UpdateTestimonialInput } from './testimonial.types';

export const testimonialService = {
  async getAll(): Promise<Testimonial[]> {
    return prisma.testimonial.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' }
    });
  },

  async create(data: CreateTestimonialInput): Promise<Testimonial> {
    return prisma.testimonial.create({ data });
  },

  async update(testimonialId: string, data: UpdateTestimonialInput): Promise<Testimonial> {
    return prisma.testimonial.update({ where: { testimonialId }, data });
  },

  async delete(testimonialId: string): Promise<void> {
    await prisma.testimonial.delete({ where: { testimonialId } });
  }
};