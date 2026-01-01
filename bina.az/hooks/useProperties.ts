import { useQuery } from '@tanstack/react-query';
import type { Property } from '@/types/homepage';
export function useProperties() {
  const { data, isLoading, isError, error } = useQuery<Property[]>({
    queryKey: ['properties'],
    queryFn: async () => {
      const response = await fetch('/api/properties');
      if (!response.ok) {
        throw new Error('Məlumatlar yüklənmədi');
      }
      return response.json();
    },
  });
  return {
    properties: data || [],
    isLoading,
    isError,
    error,
  };
}