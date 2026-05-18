'use client';

import { useState, useEffect } from 'react';
import { clientsService, Client } from '@/app/lib/api/clients.service';
import { getApiErrorMessage } from '@/app/lib/types/errors';

interface UseClientsReturn {
  clients: Client[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useClients(): UseClientsReturn {
  const [clients, setClients] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchClients = async () => {
    try {
      setIsLoading(true);
      const data = await clientsService.getAll();
      setClients(data);
      setError(null);
    } catch (err: unknown) {
      console.error('Failed to fetch clients:', err);
      setError(getApiErrorMessage(err as Error));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  return { clients, isLoading, error, refetch: fetchClients };
}