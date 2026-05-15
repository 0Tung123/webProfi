import { Router } from 'express';
import prisma from '../lib/prisma';
import { z } from 'zod';

const router = Router();

// Public: Submit contact form
router.post('/', async (req, res) => {
  try {
    const createSchema = z.object({
      name: z.string().min(2),
      email: z.string().email(),
      phone: z.string().optional(),
      message: z.string().min(10)
    });

    const data = createSchema.parse(req.body);

    const submission = await prisma.contactSubmission.create({
      data
    });

    res.status(201).json({
      success: true,
      data: submission
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
      error: 'Failed to submit contact form'
    });
  }
});

// Public: Get all contact submissions (admin only - should add auth)
router.get('/', async (_req, res) => {
  try {
    const submissions = await prisma.contactSubmission.findMany({
      orderBy: { createdAt: 'desc' }
    });

    res.json({
      success: true,
      data: submissions
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch contact submissions'
    });
  }
});

export default router;