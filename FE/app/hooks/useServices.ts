'use client';

import { useState, useEffect } from 'react';
import { servicesService, Service } from '@/app/lib/api/services.service';

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
    } catch (err: any) {
      console.error('Failed to fetch services:', err);
      setError(err.response?.data?.error || 'Failed to fetch services');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return { services, isLoading, error, refetch: fetchServices };
}