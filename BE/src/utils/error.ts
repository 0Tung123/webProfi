// Error types - strictly typed error interface
export interface AppError extends Error {
  statusCode: number;
  details?: Record<string, unknown>;
}

// Type guard to check if error is a ZodError
export function isZodError(error: Error): error is Error & { errors: unknown } {
  return error.name === 'ZodError';
}

// Helper to get error message
export function getErrorMessage(error: Error): string {
  return error.message || 'An unexpected error occurred';
}

// Helper to get status code from error
export function getStatusCode(error: Error): number {
  if ('statusCode' in error) {
    return (error as { statusCode: number }).statusCode;
  }
  return 500;
}