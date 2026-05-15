import express, { Application } from 'express';
import dotenv from 'dotenv';
import { setupMiddleware } from './config/app';
import { setupRoutes } from './config/app';
import { setupErrorHandler } from './config/app';
dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 8080;

// Setup middleware
setupMiddleware(app, express);

// Setup routes
setupRoutes(app);

// Setup error handler
setupErrorHandler(app);

app.listen(PORT, () => {
  console.log(`🚀 Backend server running on http://localhost:${PORT}`);
  console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
});