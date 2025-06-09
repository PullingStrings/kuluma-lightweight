import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
export const useAddWorkspaceUser = (workspaceId: string) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (userId: string) =>
      api.post(`/api/workspaces/${workspaceId}/users`, { userId }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['workspaces'] });

    },
  });
};