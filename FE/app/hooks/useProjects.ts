'use client';

import { useState, useEffect } from 'react';
import { projectsService, Project } from '@/app/lib/api/projects.service';

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
    } catch (err: any) {
      console.error('Failed to fetch projects:', err);
      setError(err.response?.data?.error || 'Failed to fetch projects');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return { projects, isLoading, error, refetch: fetchProjects };
}