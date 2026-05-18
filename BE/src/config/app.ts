import { Application, Request, Response } from 'express';
import cors from 'cors';

export function setupMiddleware(app: Application, express: typeof import('express')): void {
  // CORS
  const allowedOrigins = process.env.CORS_ORIGINS?.split(',') || [
    'http://localhost:3000',
    'https://web-profi-jmlo.vercel.app'
  ];
  app.use(cors({
    origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
      // Allow requests with no origin (mobile apps, curl, etc.)
      if (!origin) return callback(null, true);
      // Allow exact match
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      // Allow any Vercel preview deployment
      if (origin.endsWith('.vercel.app')) {
        return callback(null, true);
      }
      callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }));

  // Body parser
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Health check
  app.get('/health', (_req: Request, res: Response) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });
}

export function setupRoutes(app: Application): void {
  // Import all routes
  const authRoutes = require('../modules/auth/auth.routes').default;
  const projectRoutes = require('../modules/project/project.routes').default;
  const serviceRoutes = require('../modules/service/service.routes').default;
  const testimonialRoutes = require('../modules/testimonial/testimonial.routes').default;
  const clientRoutes = require('../modules/client/client.routes').default;
  const contactRoutes = require('../modules/contact/contact.routes').default;
  const processRoutes = require('../modules/process/process.routes').default;
  const uploadRoutes = require('../modules/upload/upload.routes').default;
  const heroRoutes = require('../modules/hero/hero.routes').default;
  const teamRoutes = require('../modules/team/team.routes').default;
  const contactInfoRoutes = require('../modules/contact-info/contact-info.routes').default;

  // Register routes
  app.use('/api/auth', authRoutes);
  app.use('/api/projects', projectRoutes);
  app.use('/api/services', serviceRoutes);
  app.use('/api/testimonials', testimonialRoutes);
  app.use('/api/clients', clientRoutes);
  app.use('/api/contact', contactRoutes);
  app.use('/api/process', processRoutes);
  app.use('/api/upload', uploadRoutes);
  app.use('/api/hero', heroRoutes);
  app.use('/api/team', teamRoutes);
  app.use('/api/contact-info', contactInfoRoutes);
}

export function setupErrorHandler(app: Application): void {
  const { errorHandler } = require('../middleware/errorHandler');
  app.use(errorHandler);
}