import { Router } from 'express';
import prisma from '../lib/prisma';
import { authenticate, AuthRequest } from '../middleware/auth';
import { z } from 'zod';

const router = Router();

// Public: Get all process sections
router.get('/', async (_req, res) => {
  try {
    const sections = await prisma.processSection.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
      include: {
        steps: {
          orderBy: { order: 'asc' }
        }
      }
    });

    res.json({
      success: true,
      data: sections
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch process sections'
    });
  }
});

// Public: Get process section by category
router.get('/:category', async (req, res) => {
  try {
    const { category } = req.params;

    const section = await prisma.processSection.findUnique({
      where: { category },
      include: {
        steps: {
          orderBy: { order: 'asc' }
        }
      }
    });

    if (!section) {
      return res.status(404).json({
        success: false,
        error: 'Process section not found'
      });
    }

    res.json({
      success: true,
      data: section
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch process section'
    });
  }
});

// Admin: Create process section
router.post('/', authenticate, async (req: AuthRequest, res) => {
  try {
    const createSchema = z.object({
      category: z.string(),
      title: z.string(),
      description: z.string(),
      steps: z.array(z.object({
        step: z.string(),
        title: z.string(),
        description: z.string(),
        order: z.number().optional()
      })).optional(),
      order: z.number().optional()
    });

    const data = createSchema.parse(req.body);

    const { steps, ...sectionData } = data;

    const section = await prisma.processSection.create({
      data: {
        ...sectionData,
        steps: steps ? {
          create: steps
        } : undefined
      },
      include: {
        steps: true
      }
    });

    res.status(201).json({
      success: true,
      data: section
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        error: 'Invalid input',
        details: error.issues
      });
    }
    res.status(500).json({
      success: false,
      error: 'Failed to create process section'
    });
  }
});

// Admin: Update process section
router.put('/:processId', authenticate, async (req: AuthRequest, res) => {
  try {
    const { processId } = req.params;
    const updateSchema = z.object({
      title: z.string().optional(),
      description: z.string().optional(),
      order: z.number().optional(),
      isActive: z.boolean().optional(),
      steps: z.array(z.object({
        stepId: z.string().optional(),
        step: z.string().optional(),
        title: z.string().optional(),
        description: z.string().optional(),
        order: z.number().optional()
      })).optional()
    });

    const data = updateSchema.parse(req.body);

    const section = await prisma.processSection.update({
      where: { processId },
      data: {
        ...data,
        steps: data.steps ? {
          upsert: data.steps.map(step => ({
            where: step.stepId ? { stepId: step.stepId } : { step: step.step! },
            update: step,
            create: step
          }))
        } : undefined
      },
      include: {
        steps: true
      }
    });

    res.json({
      success: true,
      data: section
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        error: 'Invalid input',
        details: error.issues
      });
    }
    res.status(500).json({
      success: false,
      error: 'Failed to update process section'
    });
  }
});

// Admin: Delete process section
router.delete('/:processId', authenticate, async (req: AuthRequest, res) => {
  try {
    const { processId } = req.params;

    await prisma.processSection.delete({
      where: { processId }
    });

    res.json({
      success: true,
      data: null
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to delete process section'
    });
  }
});

export default router;