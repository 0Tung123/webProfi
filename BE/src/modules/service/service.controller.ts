import { Request, Response } from 'express';
import { serviceService } from './service.service';
import { authenticate, AuthRequest } from '../../middleware/auth';
import type { CreateServiceInput, UpdateServiceInput } from './service.types';
import { createServiceSchema, updateServiceSchema } from './service.validation';
import { isZodError, getErrorMessage } from '../../utils/error';

export const serviceController = {
  async getAll(_req: Request, res: Response): Promise<void> {
    try {
      const services = await serviceService.getAll();
      res.json({ success: true, data: services });
    } catch (_error: unknown) {
      res.status(500).json({ success: false, error: 'Failed to fetch services' });
    }
  },

  async create(req: AuthRequest, res: Response): Promise<void> {
    try {
      const data = createServiceSchema.parse(req.body);
      const service = await serviceService.create(data);
      res.status(201).json({ success: true, data: service });
    } catch (error: unknown) {
      if (isZodError(error as Error)) {
        res.status(400).json({ success: false, error: 'Invalid input', details: (error as Error & { errors: unknown }).errors });
        return;
      }
      res.status(500).json({ success: false, error: getErrorMessage(error as Error) });
    }
  },

  async update(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { serviceId } = req.params;
      const data = updateServiceSchema.parse(req.body);
      const service = await serviceService.update(String(serviceId), data);
      res.json({ success: true, data: service });
    } catch (error: unknown) {
      if (isZodError(error as Error)) {
        res.status(400).json({ success: false, error: 'Invalid input', details: (error as Error & { errors: unknown }).errors });
        return;
      }
      res.status(500).json({ success: false, error: getErrorMessage(error as Error) });
    }
  },

  async delete(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { serviceId } = req.params;
      await serviceService.delete(String(serviceId));
      res.json({ success: true, data: null });
    } catch (_error: unknown) {
      res.status(500).json({ success: false, error: 'Failed to delete service' });
    }
  }
};