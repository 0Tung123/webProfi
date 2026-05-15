import { Request, Response } from 'express';
import { processService } from './process.service';
import { authenticate, AuthRequest } from '../../middleware/auth';
import type { CreateProcessInput, UpdateProcessInput } from './process.types';
import { createProcessSchema, updateProcessSchema } from './process.validation';
import { isZodError, getErrorMessage } from '../../utils/error';

export const processController = {
  async getAll(_req: Request, res: Response): Promise<void> {
    try {
      const sections = await processService.getAll();
      res.json({ success: true, data: sections });
    } catch (_error) {
      res.status(500).json({ success: false, error: 'Failed to fetch process sections' });
    }
  },

  async getByCategory(req: Request, res: Response): Promise<void> {
    try {
      const { category } = req.params;
      const section = await processService.getByCategory(String(category));

      if (!section) {
        res.status(404).json({ success: false, error: 'Process section not found' });
        return;
      }

      res.json({ success: true, data: section });
    } catch (_error) {
      res.status(500).json({ success: false, error: 'Failed to fetch process section' });
    }
  },

  async create(req: AuthRequest, res: Response): Promise<void> {
    try {
      const data = createProcessSchema.parse(req.body);
      const section = await processService.create(data);
      res.status(201).json({ success: true, data: section });
    } catch (error) {
      if (isZodError(error)) {
        res.status(400).json({ success: false, error: 'Invalid input', details: error.errors });
        return;
      }
      res.status(500).json({ success: false, error: 'Failed to create process section' });
    }
  },

  async update(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { processId } = req.params;
      const data = updateProcessSchema.parse(req.body);
      const section = await processService.update(String(processId), data);
      res.json({ success: true, data: section });
    } catch (error) {
      if (isZodError(error)) {
        res.status(400).json({ success: false, error: 'Invalid input', details: error.errors });
        return;
      }
      res.status(500).json({ success: false, error: 'Failed to update process section' });
    }
  },

  async delete(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { processId } = req.params;
      await processService.delete(String(processId));
      res.json({ success: true, data: null });
    } catch (_error) {
      res.status(500).json({ success: false, error: 'Failed to delete process section' });
    }
  }
};