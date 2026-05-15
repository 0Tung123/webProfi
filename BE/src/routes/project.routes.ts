import { Router } from 'express';
import prisma from '../lib/prisma';
import { authenticate, AuthRequest } from '../middleware/auth';
import { z } from 'zod';

const router = Router();

// Public: Get all active projects
router.get('/', async (_req, res) => {
  try {
    const projects = await prisma.project.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' }
    });

    res.json({
      success: true,
      data: projects
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch projects'
    });
  }
});

// Public: Get project by ID
router.get('/:projectId', async (req, res) => {
  try {
    const { projectId } = req.params;

    const project = await prisma.project.findUnique({
      where: { projectId }
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        error: 'Project not found'
      });
    }

    res.json({
      success: true,
      data: project
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch project'
    });
  }
});

// Admin: Create project
router.post('/', authenticate, async (req: AuthRequest, res) => {
  try {
    const createSchema = z.object({
      title: z.string(),
      category: z.string(),
      description: z.string().optional(),
      image: z.string(),
      order: z.number().optional()
    });

    const data = createSchema.parse(req.body);

    const project = await prisma.project.create({
      data
    });

    res.status(201).json({
      success: true,
      data: project
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
      error: 'Failed to create project'
    });
  }
});

// Admin: Update project
router.put('/:projectId', authenticate, async (req: AuthRequest, res) => {
  try {
    const { projectId } = req.params;
    const updateSchema = z.object({
      title: z.string().optional(),
      category: z.string().optional(),
      description: z.string().optional(),
      image: z.string().optional(),
      order: z.number().optional(),
      isActive: z.boolean().optional()
    });

    const data = updateSchema.parse(req.body);

    const project = await prisma.project.update({
      where: { projectId },
      data
    });

    res.json({
      success: true,
      data: project
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
      error: 'Failed to update project'
    });
  }
});

// Admin: Delete project
router.delete('/:projectId', authenticate, async (req: AuthRequest, res) => {
  try {
    const { projectId } = req.params;

    await prisma.project.delete({
      where: { projectId }
    });

    res.json({
      success: true,
      data: null
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to delete project'
    });
  }
});

export default router;