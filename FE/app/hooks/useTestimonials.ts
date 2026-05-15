'use client';

import { useState, useEffect } from 'react';
import { testimonialsService, Testimonial } from '@/app/lib/api/testimonials.service';

interface UseTestimonialsReturn {
  testimonials: Testimonial[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useTestimonials(): UseTestimonialsReturn {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTestimonials = async () => {
    try {
      setIsLoading(true);
      const data = await testimonialsService.getAll();
      setTestimonials(data);
      setError(null);
    } catch (err: any) {
      console.error('Failed to fetch testimonials:', err);
      setError(err.response?.data?.error || 'Failed to fetch testimonials');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  return { testimonials, isLoading, error, refetch: fetchTestimonials };
}