'use client';

import { useState, useEffect } from 'react';
import { clientsService, Client } from '@/app/lib/api/clients.service';

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
    } catch (err: any) {
      console.error('Failed to fetch clients:', err);
      setError(err.response?.data?.error || 'Failed to fetch clients');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  return { clients, isLoading, error, refetch: fetchClients };
}