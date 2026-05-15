import { Request, Response } from 'express';
import { heroService } from './hero.service';
import { updateHeroSchema } from './hero.validation';

export const heroController = {
  async get(req: Request, res: Response) {
    try {
      const config = await heroService.getConfig();
      res.json({ success: true, data: config });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  async update(req: Request, res: Response) {
    try {
      const data = updateHeroSchema.parse(req.body);
      const config = await heroService.updateConfig(data);
      res.json({ success: true, data: config });
    } catch (error: any) {
      res.status(400).json({ success: false, error: error.message });
    }
  },
};
