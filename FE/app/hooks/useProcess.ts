'use client';

import { useState, useEffect } from 'react';
import { processService, ProcessSection } from '@/app/lib/api/process.service';
import { getApiErrorMessage } from '@/app/lib/types/errors';

interface UseProcessReturn {
  sections: ProcessSection[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useProcess(): UseProcessReturn {
  const [sections, setSections] = useState<ProcessSection[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProcess = async () => {
    try {
      setIsLoading(true);
      const data = await processService.getAll();
      setSections(data);
      setError(null);
    } catch (err: unknown) {
      console.error('Failed to fetch process sections:', err);
      setError(getApiErrorMessage(err as Error));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProcess();
  }, []);

  return { sections, isLoading, error, refetch: fetchProcess };
}