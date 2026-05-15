import { Router } from 'express';
import prisma from '../lib/prisma';
import { authenticate, AuthRequest } from '../middleware/auth';
import { z } from 'zod';

const router = Router();

// Public: Get all active clients
router.get('/', async (_req, res) => {
  try {
    const clients = await prisma.client.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' }
    });

    res.json({
      success: true,
      data: clients
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch clients'
    });
  }
});

// Admin: Create client
router.post('/', authenticate, async (req: AuthRequest, res) => {
  try {
    const createSchema = z.object({
      name: z.string(),
      logo: z.string().optional(),
      website: z.string().optional(),
      order: z.number().optional()
    });

    const data = createSchema.parse(req.body);

    const client = await prisma.client.create({
      data
    });

    res.status(201).json({
      success: true,
      data: client
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
      error: 'Failed to create client'
    });
  }
});

// Admin: Update client
router.put('/:clientId', authenticate, async (req: AuthRequest, res) => {
  try {
    const { clientId } = req.params;
    const updateSchema = z.object({
      name: z.string().optional(),
      logo: z.string().optional(),
      website: z.string().optional(),
      order: z.number().optional(),
      isActive: z.boolean().optional()
    });

    const data = updateSchema.parse(req.body);

    const client = await prisma.client.update({
      where: { clientId },
      data
    });

    res.json({
      success: true,
      data: client
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
      error: 'Failed to update client'
    });
  }
});

// Admin: Delete client
router.delete('/:clientId', authenticate, async (req: AuthRequest, res) => {
  try {
    const { clientId } = req.params;

    await prisma.client.delete({
      where: { clientId }
    });

    res.json({
      success: true,
      data: null
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to delete client'
    });
  }
});

export default router;