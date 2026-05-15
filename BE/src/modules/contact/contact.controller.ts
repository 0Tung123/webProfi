import { Request, Response } from 'express';
import { contactService } from './contact.service';
import { authenticate, AuthRequest } from '../../middleware/auth';
import type { CreateContactInput, UpdateContactInput } from './contact.types';
import { createContactSchema, updateContactSchema } from './contact.validation';
import { isZodError, getErrorMessage } from '../../utils/error';

export const contactController = {
  async submit(req: Request, res: Response): Promise<void> {
    try {
      const data = createContactSchema.parse(req.body);
      const submission = await contactService.create(data);
      res.status(201).json({ success: true, data: submission });
    } catch (error) {
      if (isZodError(error)) {
        res.status(400).json({ success: false, error: 'Invalid input', details: error.errors });
        return;
      }
      res.status(500).json({ success: false, error: 'Failed to submit contact form' });
    }
  },

  async getAll(_req: Request, res: Response): Promise<void> {
    try {
      const submissions = await contactService.getAll();
      res.json({ success: true, data: submissions });
    } catch (_error) {
      res.status(500).json({ success: false, error: 'Failed to fetch submissions' });
    }
  },

  async update(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { contactId } = req.params;
      const data = updateContactSchema.parse(req.body);
      const submission = await contactService.update(String(contactId), data);
      res.json({ success: true, data: submission });
    } catch (error) {
      if (isZodError(error)) {
        res.status(400).json({ success: false, error: 'Invalid input', details: error.errors });
        return;
      }
      res.status(500).json({ success: false, error: 'Failed to update submission' });
    }
  },

  async delete(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { contactId } = req.params;
      await contactService.delete(String(contactId));
      res.json({ success: true, data: null });
    } catch (_error) {
      res.status(500).json({ success: false, error: 'Failed to delete submission' });
    }
  }
};