// Strict error type interface
export interface ApiError extends Error {
  response?: {
    data?: {
      error?: string;
    };
  };
}

export function getErrorMessage(error: Error): string {
  return error.message || 'An unexpected error occurred';
}

export function isApiError(error: Error): error is ApiError {
  return 'response' in error;
}

export function getApiErrorMessage(error: Error): string {
  if (isApiError(error) && error.response?.data?.error) {
    return error.response.data.error;
  }
  return error.message || 'An unexpected error occurred';
}