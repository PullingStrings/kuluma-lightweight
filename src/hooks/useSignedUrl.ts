import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';

export const useSignedUrl = (id: string) => useQuery({
 enabled: !!id,
 staleTime: 10 * 60 * 1000, // 10 minutes
 queryKey: ['signed', id],
 queryFn: () => api.get(`/api/files/${id}/signed`).then(r => r.data.url),
});