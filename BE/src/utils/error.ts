// Error types - strictly typed error interface
export interface AppError {
  message: string;
  statusCode: number;
  details?: unknown;
}

// Type guard to check if error is a ZodError
export function isZodError(error: unknown): error is { errors: unknown; name: string } {
  return typeof error === 'object' && error !== null && 'name' in error && (error as { name: unknown }).name === 'ZodError';
}

// Helper to get error message
export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  return 'An unexpected error occurred';
}

// Helper to get status code from error
export function getStatusCode(error: unknown): number {
  if (error && typeof error === 'object' && 'statusCode' in error) {
    return (error as { statusCode: number }).statusCode;
  }
  return 500;
}