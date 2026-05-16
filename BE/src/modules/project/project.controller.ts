import { Request, Response } from 'express';
import { projectService } from './project.service';
import { authenticate, AuthRequest } from '../../middleware/auth';
import type { CreateProjectInput, UpdateProjectInput } from './project.types';
import { createProjectSchema, updateProjectSchema } from './project.validation';
import { isZodError, getErrorMessage } from '../../utils/error';

export const projectController = {
  async getAll(_req: Request, res: Response): Promise<void> {
    try {
      const projects = await projectService.getAll();
      res.json({ success: true, data: projects });
    } catch (_error: unknown) {
      res.status(500).json({ success: false, error: 'Failed to fetch projects' });
    }
  },

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const { projectId } = req.params;
      const project = await projectService.getById(String(projectId));

      if (!project) {
        res.status(404).json({ success: false, error: 'Project not found' });
        return;
      }

      res.json({ success: true, data: project });
    } catch (_error: unknown) {
      res.status(500).json({ success: false, error: 'Failed to fetch project' });
    }
  },

  async create(req: AuthRequest, res: Response): Promise<void> {
    try {
      const data = createProjectSchema.parse(req.body);
      const project = await projectService.create(data);

      res.status(201).json({ success: true, data: project });
    } catch (error: unknown) {
      if (isZodError(error as Error)) {
        res.status(400).json({
          success: false,
          error: 'Invalid input',
          details: (error as Error & { errors: unknown }).errors
        });
        return;
      }
      res.status(500).json({ success: false, error: getErrorMessage(error as Error) });
    }
  },

  async update(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { projectId } = req.params;
      const data = updateProjectSchema.parse(req.body);
      const project = await projectService.update(String(projectId), data);

      res.json({ success: true, data: project });
    } catch (error: unknown) {
      if (isZodError(error as Error)) {
        res.status(400).json({
          success: false,
          error: 'Invalid input',
          details: (error as Error & { errors: unknown }).errors
        });
        return;
      }
      res.status(500).json({ success: false, error: getErrorMessage(error as Error) });
    }
  },

  async delete(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { projectId } = req.params;
      await projectService.delete(String(projectId));

      res.json({ success: true, data: null });
    } catch (_error: unknown) {
      res.status(500).json({ success: false, error: 'Failed to delete project' });
    }
  }
};