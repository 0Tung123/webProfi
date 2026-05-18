import { Request, Response } from 'express';
import { clientService } from './client.service';
import { authenticate, AuthRequest } from '../../middleware/auth';
import type { CreateClientInput, UpdateClientInput } from './client.types';
import { createClientSchema, updateClientSchema } from './client.validation';
import { isZodError, getErrorMessage } from '../../utils/error';

export const clientController = {
  async getAll(_req: Request, res: Response): Promise<void> {
    try {
      const clients = await clientService.getAll();
      res.json({ success: true, data: clients });
    } catch (_error: unknown) {
      res.status(500).json({ success: false, error: 'Failed to fetch clients' });
    }
  },

  async create(req: AuthRequest, res: Response): Promise<void> {
    try {
      const data = createClientSchema.parse(req.body);
      const client = await clientService.create(data);
      res.status(201).json({ success: true, data: client });
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
      const { clientId } = req.params;
      const data = updateClientSchema.parse(req.body);
      const client = await clientService.update(String(clientId), data);
      res.json({ success: true, data: client });
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
      const { clientId } = req.params;
      await clientService.delete(String(clientId));
      res.json({ success: true, data: null });
    } catch (_error: unknown) {
      res.status(500).json({ success: false, error: 'Failed to delete client' });
    }
  }
};