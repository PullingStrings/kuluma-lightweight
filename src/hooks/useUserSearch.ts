import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
export const useUserSearch = (query: string) =>
  useQuery({
    enabled: query.length >= 2,
    queryKey: ['user-search', query],
    queryFn: () => api.get('/api/users', { params: { query } }).then(r => r.data),
  });