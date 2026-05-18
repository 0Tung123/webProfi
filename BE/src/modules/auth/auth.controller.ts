import { Request, Response } from 'express';
import { authService } from './auth.service';
import type { LoginInput } from './auth.types';
import { loginSchema } from './auth.validation';
import { isZodError, getErrorMessage } from '../../utils/error';

export const authController = {
  async login(req: Request, res: Response): Promise<void> {
    try {
      const data = loginSchema.parse(req.body);
      const result = await authService.login(data);

      res.json({
        success: true,
        data: result
      });
    } catch (error: unknown) {
      if (isZodError(error as Error)) {
        res.status(400).json({
          success: false,
          error: 'Invalid input',
          details: (error as Error & { errors: unknown }).errors
        });
        return;
      }
      res.status(401).json({
        success: false,
        error: getErrorMessage(error as Error)
      });
    }
  }
};