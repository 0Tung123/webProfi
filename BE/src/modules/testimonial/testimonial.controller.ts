import { Request, Response } from 'express';
import { testimonialService } from './testimonial.service';
import { authenticate, AuthRequest } from '../../middleware/auth';
import type { CreateTestimonialInput, UpdateTestimonialInput } from './testimonial.types';
import { createTestimonialSchema, updateTestimonialSchema } from './testimonial.validation';
import { isZodError, getErrorMessage } from '../../utils/error';

export const testimonialController = {
  async getAll(_req: Request, res: Response): Promise<void> {
    try {
      const testimonials = await testimonialService.getAll();
      res.json({ success: true, data: testimonials });
    } catch (_error: unknown) {
      res.status(500).json({ success: false, error: 'Failed to fetch testimonials' });
    }
  },

  async create(req: AuthRequest, res: Response): Promise<void> {
    try {
      const data = createTestimonialSchema.parse(req.body);
      const testimonial = await testimonialService.create(data);
      res.status(201).json({ success: true, data: testimonial });
    } catch (error: unknown) {
      if (isZodError(error as Error)) {
        res.status(400).json({ success: false, error: 'Invalid input', details: (error as Error & { errors: unknown }).errors });
        return;
      }
      res.status(500).json({ success: false, error: getErrorMessage(error as Error) });
    }
  },

  async update(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { testimonialId } = req.params;
      const data = updateTestimonialSchema.parse(req.body);
      const testimonial = await testimonialService.update(String(testimonialId), data);
      res.json({ success: true, data: testimonial });
    } catch (error: unknown) {
      if (isZodError(error as Error)) {
        res.status(400).json({ success: false, error: 'Invalid input', details: (error as Error & { errors: unknown }).errors });
        return;
      }
      res.status(500).json({ success: false, error: getErrorMessage(error as Error) });
    }
  },

  async delete(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { testimonialId } = req.params;
      await testimonialService.delete(String(testimonialId));
      res.json({ success: true, data: null });
    } catch (_error: unknown) {
      res.status(500).json({ success: false, error: 'Failed to delete testimonial' });
    }
  }
};