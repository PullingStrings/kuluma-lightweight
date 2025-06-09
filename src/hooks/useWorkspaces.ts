import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';

export interface WorkspaceDto {
  id: string;
  name: string;
  avatarUrl?: string | null;
}

export const useWorkspaces = () =>
  useQuery<WorkspaceDto[]>({
    queryKey: ['workspaces'],
    queryFn: () => api.get('/api/workspaces').then((r) => r.data.workspaces ?? r.data),
  });


