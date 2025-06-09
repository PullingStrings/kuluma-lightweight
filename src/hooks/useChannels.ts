import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';

export interface ChannelDto {
  id: string;
  name: string;
  isPrivate: boolean;
}

export const useChannels = (workspaceId?: string | null) =>
  useQuery<ChannelDto[]>({
    enabled: !!workspaceId,
    queryKey: ['channels', workspaceId],
    queryFn: () => api.get(`/api/workspaces/${workspaceId}/channels`).then((r) => r.data.channels ?? r.data),
  });