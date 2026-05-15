import { Router } from 'express';
import prisma from '../lib/prisma';
import { authenticate, AuthRequest } from '../middleware/auth';
import { z } from 'zod';

const router = Router();

// Public: Get all active services
router.get('/', async (_req, res) => {
  try {
    const services = await prisma.service.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' }
    });

    res.json({
      success: true,
      data: services
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch services'
    });
  }
});

// Admin: Create service
router.post('/', authenticate, async (req: AuthRequest, res) => {
  try {
    const createSchema = z.object({
      title: z.string(),
      description: z.string(),
      image: z.string(),
      order: z.number().optional()
    });

    const data = createSchema.parse(req.body);

    const service = await prisma.service.create({
      data
    });

    res.status(201).json({
      success: true,
      data: service
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
      error: 'Failed to create service'
    });
  }
});

// Admin: Update service
router.put('/:serviceId', authenticate, async (req: AuthRequest, res) => {
  try {
    const { serviceId } = req.params;
    const updateSchema = z.object({
      title: z.string().optional(),
      description: z.string().optional(),
      image: z.string().optional(),
      order: z.number().optional(),
      isActive: z.boolean().optional()
    });

    const data = updateSchema.parse(req.body);

    const service = await prisma.service.update({
      where: { serviceId },
      data
    });

    res.json({
      success: true,
      data: service
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
      error: 'Failed to update service'
    });
  }
});

// Admin: Delete service
router.delete('/:serviceId', authenticate, async (req: AuthRequest, res) => {
  try {
    const { serviceId } = req.params;

    await prisma.service.delete({
      where: { serviceId }
    });

    res.json({
      success: true,
      data: null
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to delete service'
    });
  }
});

export default router;