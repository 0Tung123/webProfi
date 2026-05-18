'use client';

import { useState, useEffect } from 'react';
import { projectsService, Project } from '@/app/lib/api/projects.service';
import { getApiErrorMessage } from '@/app/lib/types/errors';

interface UseProjectsReturn {
  projects: Project[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useProjects(): UseProjectsReturn {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = async () => {
    try {
      setIsLoading(true);
      const data = await projectsService.getAll();
      setProjects(data);
      setError(null);
    } catch (err: unknown) {
      console.error('Failed to fetch projects:', err);
      setError(getApiErrorMessage(err as Error));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return { projects, isLoading, error, refetch: fetchProjects };
}

export type { Project };