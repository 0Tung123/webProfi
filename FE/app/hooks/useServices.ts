'use client';

import { useState, useEffect } from 'react';
import { servicesService, Service } from '@/app/lib/api/services.service';
import { getApiErrorMessage } from '@/app/lib/types/errors';

interface UseServicesReturn {
  services: Service[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useServices(): UseServicesReturn {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchServices = async () => {
    try {
      setIsLoading(true);
      const data = await servicesService.getAll();
      setServices(data);
      setError(null);
    } catch (err: unknown) {
      console.error('Failed to fetch services:', err);
      setError(getApiErrorMessage(err as Error));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return { services, isLoading, error, refetch: fetchServices };
}