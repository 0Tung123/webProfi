import { Request, Response } from 'express';
import { contactInfoService } from './contact-info.service';
import type { AuthRequest } from '../../middleware/auth';
import { contactInfoValidation } from './contact-info.validation';
import { isZodError, getErrorMessage } from '../../utils/error';

export const contactInfoController = {
  async getAll(_req: Request, res: Response): Promise<void> {
    try {
      const contactInfos = await contactInfoService.getAll();
      res.json({ success: true, data: contactInfos });
    } catch (_error: unknown) {
      res.status(500).json({ success: false, error: 'Failed to fetch contact info' });
    }
  },

  async getByType(req: Request, res: Response): Promise<void> {
    try {
      const { type } = req.params;
      const contactInfos = await contactInfoService.getAllByType(String(type));
      res.json({ success: true, data: contactInfos });
    } catch (_error: unknown) {
      res.status(500).json({ success: false, error: 'Failed to fetch contact info' });
    }
  },

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const { contactInfoId } = req.params;
      const contactInfo = await contactInfoService.getById(String(contactInfoId));

      if (!contactInfo) {
        res.status(404).json({ success: false, error: 'Contact info not found' });
        return;
      }

      res.json({ success: true, data: contactInfo });
    } catch (_error: unknown) {
      res.status(500).json({ success: false, error: 'Failed to fetch contact info' });
    }
  },

  async create(req: AuthRequest, res: Response): Promise<void> {
    try {
      const data = contactInfoValidation.validateCreate(req.body);
      const contactInfo = await contactInfoService.create(data);

      res.status(201).json({ success: true, data: contactInfo });
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
      const { contactInfoId } = req.params;
      const data = contactInfoValidation.validateUpdate(req.body);
      const contactInfo = await contactInfoService.update(String(contactInfoId), data);

      res.json({ success: true, data: contactInfo });
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
      const { contactInfoId } = req.params;
      await contactInfoService.delete(String(contactInfoId));

      res.json({ success: true, data: null });
    } catch (_error: unknown) {
      res.status(500).json({ success: false, error: 'Failed to delete contact info' });
    }
  }
};