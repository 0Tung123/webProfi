export const corsConfig = {
  origin: (origin: string | undefined, callback: (err: Error | null, origin?: boolean) => void) => {
    const allowedOrigins = process.env.CORS_ORIGINS?.split(',') || [
      'http://localhost:3000',
      'https://web-profi-jmlo.vercel.app'
    ];

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
  credentials: true
};