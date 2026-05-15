import { Router } from 'express';
import prisma from '../lib/prisma';
import { authenticate, AuthRequest } from '../middleware/auth';
import { z } from 'zod';

const router = Router();

// Public: Get all active testimonials
router.get('/', async (_req, res) => {
  try {
    const testimonials = await prisma.testimonial.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' }
    });

    res.json({
      success: true,
      data: testimonials
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch testimonials'
    });
  }
});

// Admin: Create testimonial
router.post('/', authenticate, async (req: AuthRequest, res) => {
  try {
    const createSchema = z.object({
      quote: z.string(),
      author: z.string(),
      role: z.string(),
      company: z.string().optional()
    });

    const data = createSchema.parse(req.body);

    const testimonial = await prisma.testimonial.create({
      data
    });

    res.status(201).json({
      success: true,
      data: testimonial
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        error: 'Invalid input',
        details: error.errors
      });
    }
    res.status(500).json({
      success: false,
      error: 'Failed to create testimonial'
    });
  }
});

// Admin: Update testimonial
router.put('/:testimonialId', authenticate, async (req: AuthRequest, res) => {
  try {
    const { testimonialId } = req.params;
    const updateSchema = z.object({
      quote: z.string().optional(),
      author: z.string().optional(),
      role: z.string().optional(),
      company: z.string().optional(),
      isActive: z.boolean().optional()
    });

    const data = updateSchema.parse(req.body);

    const testimonial = await prisma.testimonial.update({
      where: { testimonialId },
      data
    });

    res.json({
      success: true,
      data: testimonial
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        error: 'Invalid input',
        details: error.errors
      });
    }
    res.status(500).json({
      success: false,
      error: 'Failed to update testimonial'
    });
  }
});

// Admin: Delete testimonial
router.delete('/:testimonialId', authenticate, async (req: AuthRequest, res) => {
  try {
    const { testimonialId } = req.params;

    await prisma.testimonial.delete({
      where: { testimonialId }
    });

    res.json({
      success: true,
      data: null
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to delete testimonial'
    });
  }
});

export default router;