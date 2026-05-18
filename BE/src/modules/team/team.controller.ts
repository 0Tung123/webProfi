import { Request, Response } from 'express';
import { teamService } from './team.service';
import type { AuthRequest } from '../../middleware/auth';
import { teamValidation } from './team.validation';
import { isZodError, getErrorMessage } from '../../utils/error';

export const teamController = {
  async getAll(_req: Request, res: Response): Promise<void> {
    try {
      const teamMembers = await teamService.getAll();
      res.json({ success: true, data: teamMembers });
    } catch (_error: unknown) {
      res.status(500).json({ success: false, error: 'Failed to fetch team members' });
    }
  },

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const { teamMemberId } = req.params;
      const teamMember = await teamService.getById(String(teamMemberId));

      if (!teamMember) {
        res.status(404).json({ success: false, error: 'Team member not found' });
        return;
      }

      res.json({ success: true, data: teamMember });
    } catch (_error: unknown) {
      res.status(500).json({ success: false, error: 'Failed to fetch team member' });
    }
  },

  async create(req: AuthRequest, res: Response): Promise<void> {
    try {
      const data = teamValidation.validateCreate(req.body);
      const teamMember = await teamService.create(data);

      res.status(201).json({ success: true, data: teamMember });
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
      const { teamMemberId } = req.params;
      const data = teamValidation.validateUpdate(req.body);
      const teamMember = await teamService.update(String(teamMemberId), data);

      res.json({ success: true, data: teamMember });
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
      const { teamMemberId } = req.params;
      await teamService.delete(String(teamMemberId));

      res.json({ success: true, data: null });
    } catch (_error: unknown) {
      res.status(500).json({ success: false, error: 'Failed to delete team member' });
    }
  }
};