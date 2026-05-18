import { Request, Response, NextFunction } from 'express';
import { getStatusCode } from '../utils/error';
import type { AppError } from '../utils/error';

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error('Error:', err);

  const statusCode = getStatusCode(err);
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    success: false,
    error: message
  });
};